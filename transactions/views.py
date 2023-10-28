from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.shortcuts import render, redirect

from .models import *
from .forms import *
from django.db.models import Q
from django.utils import timezone


@login_required
def loan_request_view(request):
    if request.method == 'POST':
        form = LoanRequestForm(request.POST)
        if form.is_valid():
            loan_request = form.save(commit=False)
            loan_request.user = request.user
            loan_request.save()
            messages.success(request, 'Your loan request has been submitted. You will be notified within 24 hours.')
            return redirect('transactions:loan_success')
    else:
        form = LoanRequestForm()
    context = {
        'title': 'Loan Request',
        'form': form,
    }
    return render(request, 'transactions/loan_request.html', context)


@login_required
def loan_success(request):
    payment = LoanRequest.objects.filter(user=request.user).order_by('-id').first()
    return render(request, 'transactions/loan_success.html', {'payment': payment})


@login_required()
def deposit_view(request):
    form = DepositForm(request.POST or None)

    if form.is_valid():
        deposit = form.save(commit=False)
        deposit.user = request.user
        deposit.save()
        # adds users deposit to balance.
        deposit.user.account.balance += deposit.amount
        deposit.user.account.save()
        messages.success(request, 'You Have Deposited {} $.'
                         .format(deposit.amount))
        return redirect("home")

    context = {
        "title": "Deposit",
        "form": form
    }
    return render(request, "transactions/form.html", context)


@login_required()
def withdrawal_view(request):
    if request.method == 'POST':
        form = WithdrawalForm(request.POST, user=request.user)

        if form.is_valid():
            withdrawal_international = form.save(commit=False)
            withdrawal_international.user = request.user
            withdrawal_international.target = form.cleaned_data['target_account_number']
            withdrawal_international.recipient_bank_name = form.cleaned_data['target_bank_name']
            withdrawal_international.account_number = form.cleaned_data['target_account_number']
            withdrawal_international.save()

            messages.success(request, 'Your withdrawal request has been submitted.')
            return redirect('confirm')

    else:
        form = WithdrawalForm(user=request.user)

    return render(request, 'transactions/form.html', {'form': form})


@login_required
def Withdrawal_international_view(request):
    if request.method == 'POST':
        form = WithdrawalInternationalForm(request.POST, user=request.user)

        if form.is_valid():
            withdrawal_international = form.save(commit=False)
            withdrawal_international.user = request.user
            withdrawal_international.target = form.cleaned_data['target_account_number']
            withdrawal_international.recipient_bank_name = form.cleaned_data['target_bank_name']
            withdrawal_international.account_number = form.cleaned_data['target_account_number']
            withdrawal_international.save()

            messages.success(request, 'Your international withdrawal request has been submitted.')
            return redirect('inter_confirm')

    else:
        form = WithdrawalInternationalForm(user=request.user)

    return render(request, 'transactions/inter_form.html', {'form': form})






@login_required
def payment_create(request):
    if request.method == 'POST':
        form = PaymentForm(request.POST, request.FILES)
        if form.is_valid():
            payment = form.save(commit=False)
            payment.user = request.user
            payment.save()
            return redirect('transactions:payment_success')  # add app name
    else:
        form = PaymentForm()
    return render(request, 'transactions/payment_form.html', {'form': form})


@login_required
def payment_success(request):
    payment = Payment.objects.filter(user=request.user).order_by('-id').first()
    return render(request, 'transactions/payment_success.html', {'payment': payment})



def recent_withdrawals(request):
    recent_withdrawals = Withdrawal.objects.order_by('-date', '-timestamp')[:10]
    context = {'recent_withdrawals': recent_withdrawals}
    return render(request, 'transactions/withdraw.html', context)

from django.http import HttpResponse

import os
from django.conf import settings
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Image, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO

def generate_pdf(data_list, logo_path):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    elements = []

    # Add your company logo or image
    image_path = os.path.join(os.path.abspath(os.path.join(settings.BASE_DIR, 'static')), logo_path)  # Update with your logo path
    logo = Image(image_path, width=200, height=100)
    elements.append(logo)

    styles = getSampleStyleSheet()
    style_heading = styles['Heading1']
    style_normal = styles['Normal']

    section_titles = ["Deposits History", "Local Transfers", "International Transfers"]

    for i, data in enumerate(data_list):
        # Add section heading
        section_heading = Paragraph(section_titles[i], style_heading)
        elements.append(section_heading)

        # Define style for the table
        style = TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ])

        # Configure style
        elements.append(Table(data, style=style))

    doc.build(elements)
    pdf = buffer.getvalue()
    buffer.close()
    return pdf


def recent_international_withdrawals(request):
    recent_international_withdrawals = Withdrawal_internationa.objects.order_by('-date', '-timestamp')[:10]
    recent_withdrawals = Withdrawal.objects.order_by('-date', '-timestamp')[:10]
    recent_payments = Payment.objects.order_by('-date', '-timestamp')[:10]

    context = {
        'recent_international_withdrawals': recent_international_withdrawals,
        'recent_withdrawals': recent_withdrawals,
        'recent_payments': recent_payments
    }

    if 'export' in request.GET and request.GET['export'] == 'pdf':
        # Prepare data for the PDF
        data_list = []

        # Deposit History Data
        data_payments = [['User', 'Amount', 'Method', 'Status', 'Date']]
        for payment in recent_payments:
            data_payments.append([
                str(payment.user),
                str(payment.amount),
                payment.payment_method,
                payment.status,
                str(payment.date)
            ])
        data_list.append(data_payments)

        # Local Transfers Data
        data_withdrawals = [['User', 'Amount', 'Status', 'Date', 'Target', 'Recipient Bank Name', 'Account Number']]
        for withdrawal in recent_withdrawals:
            data_withdrawals.append([
                str(withdrawal.user),
                str(withdrawal.amount),
                withdrawal.status,
                str(withdrawal.date),
                withdrawal.target,
                withdrawal.recipient_bank_name,
                withdrawal.account_number,
            ])
        data_list.append(data_withdrawals)

        # International Transfers Data
        data_international_withdrawals = [['User', 'Amount', 'Status', 'Date', 'Target', 'Recipient Bank Name', 'Account Number']]
        for withdrawal in recent_international_withdrawals:
            data_international_withdrawals.append([
                str(withdrawal.user),
                str(withdrawal.amount),
                withdrawal.status,
                str(withdrawal.date),
                withdrawal.target,
                withdrawal.recipient_bank_name,
                withdrawal.account_number,
            ])
        data_list.append(data_international_withdrawals)

        logo_path = 'ukrex.png'  # Update with your logo path
        pdf = generate_pdf(data_list, logo_path)

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="Account History.pdf"'
        response.write(pdf)
        return response
    else:
        return render(request, 'transactions/withdraw_international.html', context)


def recent_payments(request):
    recent_payments = Payment.objects.order_by('-date', '-timestamp')[:10]
    context = {'recent_payments': recent_payments}
    return render(request, 'transactions/payment.html', context)
