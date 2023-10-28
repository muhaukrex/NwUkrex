import datetime
from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import User, AccountDetails, UserAddress


class CustomSelectWidget(forms.Select):
    def render(self, name, value, attrs=None, renderer=None):
        rendered_select = super().render(name, value, attrs, renderer)
        container = f'<div class="select-container">{rendered_select}</div>'
        return container

class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "password1",
            "password2",
            "contact_no",
        ]
        labels = {
            "username": "Username",
            "first_name": "First Name",
            "last_name": "Last Name",
            "email": "Email Address",
            "password1": "Password",
            "password2": "Confirm Password",
            "contact_no": "Phone Number",
        }
        widgets = {
            "username": forms.TextInput(attrs={"class": "form-control", "placeholder": "Enter your username"}),
            "first_name": forms.TextInput(attrs={"class": "form-control", "placeholder": "Enter your first name"}),
            "last_name": forms.TextInput(attrs={"class": "form-control", "placeholder": "Enter your last name"}),
            "email": forms.EmailInput(attrs={"class": "form-control", "placeholder": "Enter your email address"}),
            "password1": forms.PasswordInput(attrs={"class": "form-control", "placeholder": "Enter your password"}),
            "password2": forms.PasswordInput(attrs={"class": "form-control", "placeholder": "Confirm your password"}),
            "contact_no": forms.TextInput(attrs={"class": "form-control", "placeholder": "Enter your phone number"}),
        }


class AccountDetailsForm(forms.ModelForm):
    
    class Meta:
        model = AccountDetails
        fields = ["gender", "account_type", "picture"]
        labels = {
            "gender": "Gender",
            "account_type": "Account Type",
            "picture": "Passport Photograph",
        }
        widgets = {
            "gender": forms.Select(attrs={"class": "form-control select-box"}),
            "account_type": forms.Select(attrs={"class": "form-control select-box"}),
            "picture": forms.ClearableFileInput(attrs={"class": "form-control"}),
        }



class UserAddressForm(forms.ModelForm):
    COUNTRY_CHOICES = [
        ('', 'Select Country'),
        ('AF', 'Afghanistan'),
        ('AL', 'Albania'),
        ('AM', 'Armenia'),
        ('AO', 'Angola'),
        ('AR', 'Argentina'),
        ('AT', 'Austria'),
        ('AZ', 'Azerbaijan'),
        ('BA', 'Bosnia and Herzegovina'),
        ('BB', 'Barbados'),
        ('BD', 'Bangladesh'),
        ('BE', 'Belgium'),
        ('BF', 'Burkina Faso'),
        ('BG', 'Bulgaria'),
        ('BH', 'Bahrain'),
        ('BI', 'Burundi'),
        ('BJ', 'Benin'),
        ('BO', 'Bolivia'),
        ('BR', 'Brazil'),
        ('BS', 'Bahamas'),
        ('BT', 'Bhutan'),
        ('BW', 'Botswana'),
        ('BY', 'Belarus'),
        ('BZ', 'Belize'),
        ('CA', 'Canada'),
        ('CF', 'Central African Republic'),
        ('CH', 'Switzerland'),
        ('CL', 'Chile'),
        ('CM', 'Cameroon'),
        ('CN', 'China'),
        ('CO', 'Colombia'),
        ('CR', 'Costa Rica'),
        ('CU', 'Cuba'),
        ('CV', 'Cape Verde'),
        ('CY', 'Cyprus'),
        ('CZ', 'Czech Republic'),
        ('DE', 'Germany'),
        ('DJ', 'Djibouti'),
        ('DM', 'Dominica'),
        ('DO', 'Dominican Republic'),
        ('DZ', 'Algeria'),
        ('EC', 'Ecuador'),
        ('EE', 'Estonia'),
        ('EG', 'Egypt'),
        ('ER', 'Eritrea'),
        ('ES', 'Spain'),
        ('ET', 'Ethiopia'),
        ('FI', 'Finland'),
        ('FR', 'France'),
        ('GA', 'Gabon'),
        ('GB', 'United Kingdom'),
        ('GD', 'Grenada'),
        ('GE', 'Georgia'),
        ('GH', 'Ghana'),
        ('GM', 'Gambia'),
        ('GN', 'Guinea'),
        ('GR', 'Greece'),
        ('GT', 'Guatemala'),
        ('GW', 'Guinea-Bissau'),
        ('GY', 'Guyana'),
        ('HN', 'Honduras'),
        ('HR', 'Croatia'),
        ('HT', 'Haiti'),
        ('HU', 'Hungary'),
        ('ID', 'Indonesia'),
        ('IE', 'Ireland'),
        ('IL', 'Israel'),
        ('IN', 'India'),
        ('IQ', 'Iraq'),
        ('IR', 'Iran'),
        ('IS', 'Iceland'),
        ('IT', 'Italy'),
        ('JM', 'Jamaica'),
        ('JO', 'Jordan'),
        ('JP', 'Japan'),
        ('KE', 'Kenya'),
        ('KG', 'Kyrgyzstan'),
        ('KH', 'Cambodia'),
        ('KM', 'Comoros'),
        ('KN', 'Saint Kitts and Nevis'),
        ('KP', 'North Korea'),
        ('KR', 'South Korea'),
        ('KW', 'Kuwait'),
        ('KZ', 'Kazakhstan'),
        ('LA', 'Laos'),
        ('LB', 'Lebanon'),
        ('LC', 'Saint Lucia'),
        ('LI', 'Liechtenstein'),
        ('LK', 'Sri Lanka'),
        ('LR', 'Liberia'),
        ('LS', 'Lesotho'),
        ('LT', 'Lithuania'),
        ('LU', 'Luxembourg'),
        ('LV', 'Latvia'),
        ('LY', 'Libya'),
        ('MA', 'Morocco'),
        ('MD', 'Moldova'),
        ('ME', 'Montenegro'),
        ('MG', 'Madagascar'),
        ('MK', 'Macedonia'),
        ('ML', 'Mali'),
        ('MM', 'Myanmar'),
        ('MN', 'Mongolia'),
        ('MR', 'Mauritania'),
        ('MU', 'Mauritius'),
        ('MV', 'Maldives'),
        ('MW', 'Malawi'),
        ('MX', 'Mexico'),
        ('MY', 'Malaysia'),
        ('MZ', 'Mozambique'),
        ('NA', 'Namibia'),
        ('NE', 'Niger'),
        ('NG', 'Nigeria'),
        ('NI', 'Nicaragua'),
        ('NL', 'Netherlands'),
        ('NO', 'Norway'),
        ('NP', 'Nepal'),
        ('OM', 'Oman'),
        ('PA', 'Panama'),
        ('PE', 'Peru'),
        ('PG', 'Papua New Guinea'),
        ('PH', 'Philippines'),
        ('PK', 'Pakistan'),
        ('PL', 'Poland'),
        ('PS', 'Palestinian Territory'),
        ('PT', 'Portugal'),
        ('PY', 'Paraguay'),
        ('QA', 'Qatar'),
        ('RO', 'Romania'),
        ('RS', 'Serbia'),
        ('RU', 'Russia'),
        ('RW', 'Rwanda'),
        ('SA', 'Saudi Arabia'),
        ('SB', 'Solomon Islands'),
        ('SC', 'Seychelles'),
        ('SD', 'Sudan'),
        ('SE', 'Sweden'),
        ('SG', 'Singapore'),
        ('SI', 'Slovenia'),
        ('SK', 'Slovakia'),
        ('SL', 'Sierra Leone'),
        ('SM', 'San Marino'),
        ('SN', 'Senegal'),
        ('SO', 'Somalia'),
        ('SR', 'Suriname'),
        ('SS', 'South Sudan'),
        ('SV', 'El Salvador'),
        ('SY', 'Syria'),
        ('SZ', 'Swaziland'),
        ('TD', 'Chad'),
        ('TG', 'Togo'),
        ('TH', 'Thailand'),
        ('TJ', 'Tajikistan'),
        ('TL', 'East Timor'),
        ('TM', 'Turkmenistan'),
        ('TN', 'Tunisia'),
        ('TO', 'Tonga'),
        ('TR', 'Turkey'),
        ('TT', 'Trinidad and Tobago'),
        ('TW', 'Taiwan'),
        ('TZ', 'Tanzania'),
        ('UA', 'Ukraine'),
        ('UG', 'Uganda'),
        ('US', 'United States'),
        ('UY', 'Uruguay'),
        ('UZ', 'Uzbekistan'),
        ('VC', 'Saint Vincent and the Grenadines'),
        ('VE', 'Venezuela'),
        ('VN', 'Vietnam'),
        ('VU', 'Vanuatu'),
        ('WS', 'Samoa'),
        ('YE', 'Yemen'),
        ('ZA', 'South Africa'),
        ('ZM', 'Zambia'),
        ('ZW', 'Zimbabwe')
    ]

    country = forms.ChoiceField(choices=COUNTRY_CHOICES, label='Country', widget=forms.Select(attrs={'class': 'form-control select-box'}))
    class Meta:
        model = UserAddress
        fields = ["postal_code", "country", "state", "street_address", "religion"]
        labels = {
            "postal_code": "Postal Code",
            "country": "Country",
            "state": "State",
            "street_address": "Street Address",
            "religion": "Religion",
        }
        widgets = {
            "postal_code": forms.TextInput(attrs={"class": "form-control", "placeholder": "Enter your postal code"}),
            "state": forms.TextInput(attrs={"class": "form-control", "placeholder": "Enter your state"}),
            "street_address": forms.TextInput(attrs={"class": "form-control", "placeholder": "Enter your street address"}),
            "religion": forms.TextInput(attrs={"class": "form-control", "placeholder": "Enter your religion"}),
        }







class UserLoginForm(forms.Form):
    username = forms.CharField(label="Username/Email")
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self, *args, **kwargs):
        username = self.cleaned_data.get("username")
        password = self.cleaned_data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise forms.ValidationError("Invalid login credentials")
            if not user.is_active:
                raise forms.ValidationError("This account is inactive.")

        return super(UserLoginForm, self).clean(*args, **kwargs)
