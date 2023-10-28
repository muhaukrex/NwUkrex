var windowW = window.matchMedia("(min-width: 1200px)");
var windowWm = window.matchMedia("(max-width: 767px)");

function blocksSizes() {
    var hH = $('header').outerHeight(),
        marketsH = 0;
    if ($('.markets').length) {
        marketsH = 59;
    }
    $('.page').css('margin-top', hH + 'px');
    $('.flexslider').css('height', ($(window).height() - hH - marketsH) + 'px');

    if (windowW.matches) {
        $('.nav-wrap').addClass('desktop-nav').fadeIn(0);
        $('.nav-wrap').removeClass('tablet-nav').css('height', 'auto');
        $('.nav-wrap li').removeClass('md-opened');
        $('.nav-item').fadeOut(0);
        $('.nav-wrap .second-level-wrap, .nav-wrap .third-level-wrap').fadeIn(0);
        $('.product-banner-trigger').removeClass('tablet-trigger');

    } else {
        $('.nav-wrap').removeClass('desktop-nav');
        $('.nav-wrap').addClass('tablet-nav').css('height', ($(window).height() - hH) + 'px');
        if (!$('.nav-wrap').hasClass('is-open')) {
            $('.nav-wrap').css('display', 'none');
            $('.nav-toggle').removeClass('to-close');
            $('html').removeClass('no-scroll');
        }
        $('.product-banner-trigger').addClass('tablet-trigger');

    }
    $('.nav-wrap').removeClass('before-loaded');


}

function dlBinAjax(link, name) {
    var x = new XMLHttpRequest();
    x.open("GET", link, true);
    x.responseType = 'blob';
    x.onload = function(e) {
        download(x.response, name, "image/jpg");
    }
    x.send();
}


$(window).on('load', function() {
    blocksSizes();

    var marketsCarousel = $('.markets-carousel');
    marketsCarousel.owlCarousel({
        loop: true,
        autoWidth: true,
        items: 4,
        autoplay: true,
        autoplayTimeout: 240000,
        autoplayHoverPause: true,
        autoplaySpeed: 850,
        navSpeed: 600,
        dragEndSpeed: 600,
        nav: true,
        dots: false,
        responsive: {
            0: {
                margin: 15
            },
            600: {
                margin: 24
            }
        }
    });
});

$(document).on('ready', function() {
    blocksSizes();
    $('select').each(function() {
        if (!$(this).closest('.form-added-wrapper').length) {
            $(this).styler();
        }
    });
    $('.styled-table:not(.clone-table)').each(function() {

        $(this).wrap('<div class="table-scroll-wrap"></div>');

    });

    $('.helper').each(function() {
        $(this).parent('.form-item').find('input,textarea').wrap('<div></div>');
    });
    var formClone = {};
    $('.add-action').each(function() {
        var name = $(this).attr('data-name');
        formClone[name] = $('.form-added-wrapper[data-name="' + name + '"]').eq(0).clone().addClass('new-added-wrapper').removeClass('with-hidden-field');
        formClone[name].find('.required').removeClass('error').removeClass('required');
        formClone[name].find('.init-hidden').removeClass('init-hidden');
        formClone[name].find('.require-icon').remove();
        $(formClone[name]).find('select,input').each(function() {
            if ($(this).attr('data-validation')) {
                var attr = $(this).attr('data-validation').replace('required', '').replace('length', '');
                $(this).attr('data-validation', attr);
            }
        });
        if (formClone[name].find('.change-clone_text')) {
            formClone[name].find('.change-clone_text').each(function() {
                $(this).text($(this).attr('data-added-text')).removeClass('change-clone_text');
            });
        }
        formClone[name].find('.error-text').remove();
        formClone[name] = formClone[name][0].outerHTML;
        $('.form-added-wrapper[data-name="' + name + '"]').addClass('last-added-wrapper').find('select').styler();
    });

    $('body').on('click', '.add-action', function() {
        var name = $(this).attr('data-name'),
            item = formClone[name];
        $('body').find('.form-added-wrapper[data-name="' + name + '"].last-added-wrapper').find('.add-item').remove();
        $('body').find('.form-added-wrapper[data-name="' + name + '"].last-added-wrapper').after(item);
        $('body').find('.form-added-wrapper[data-name="' + name + '"].last-added-wrapper').removeClass('last-added-wrapper');
        $('body').find('.form-added-wrapper.new-added-wrapper').find('select').styler();
        $('body').find('.form-added-wrapper.new-added-wrapper').removeClass('new-added-wrapper').addClass('last-added-wrapper');
        validateResumeForm('vacancyForm');
    });

    $(window).on('resize', function() {
        windowWm = window.matchMedia("(max-width: 767px)");
        setTimeout(function() {
            blocksSizes();
        }, 200);
    });
    var countCat = 1;
    $('.carousel-with-title .counter-title').each(function() {
        if (countCat < 10) {
            $(this).prepend('<span>0' + countCat + '</span>');
        } else {
            $(this).prepend('<span>' + countCat + '</span>');
        }
        countCat += 1;
    });
    if ($('.flexslider li.item').length > 1) {
        $('.flexslider li.item').each(function() {
            $('.flex-control-nav').append('<li><span></span></li>');
        });
    }
    $(".flexslider").each(function() {
        var targetShow = $(this);
        targetShow.flexslider({
            animation: "fade",
            slideshow: true,
            manualControls: $(".flex-control-nav li"),
            customDirectionNav: $(".custom-navigation a"),
            pauseOnAction: true,
            pauseOnHover: true,
            animationLoop: (targetShow.find('.item').length > 1) ? true : false,
            animationSpeed: 800,
            start: function(slider) {
                var thisSlide = slider.slides.eq(slider.currentSlide),
                    color = $(thisSlide).find('.colored-panel').attr('data-color');
                $(".custom-navigation a").css('background', color);
            },
            before: function(slider) {
                var animateSlide = slider.slides.eq(slider.animatingTo),
                    color = $(animateSlide).find('.colored-panel').attr('data-color');
                $(".custom-navigation a").css('background', color);
            }
        });
    });


    $(".owl-carousel.arrow-nav").each(function() {
        var targetCarousel = $(this);
        targetCarousel.owlCarousel({
            navSpeed: 600,
            dragEndSpeed: 600,
            autoplaySpeed: 850,
            autoplayHoverPause: true,
            margin: 30,
            dotsSpeed: 600,
            responsive: {
                0: {
                    items: 1,
                    autoplay: (targetCarousel.find('.item').length > 1) ? true : false,
                    loop: (targetCarousel.find('.item').length > 1) ? true : false,
                    nav: false,
                    dots: true
                },
                600: {
                    items: 2,
                    autoplay: (targetCarousel.find('.item').length > 2) ? true : false,
                    loop: (targetCarousel.find('.item').length > 2) ? true : false,
                    nav: true,
                    dots: false
                },
                992: {
                    items: 3,
                    autoplay: (targetCarousel.find('.item').length > 3) ? true : false,
                    loop: (targetCarousel.find('.item').length > 3) ? true : false,
                    nav: true,
                    dots: false
                }
            }
        });
    });
    $(".owl-carousel.arrow-dots:not(.documents-carousel)").each(function() {
        var targetCarousel = $(this);
        targetCarousel.owlCarousel({
            navSpeed: 600,
            dragEndSpeed: 600,
            autoplaySpeed: 850,
            autoplayHoverPause: true,
            margin: 30,
            dotsSpeed: 600,
            responsive: {
                0: {
                    items: 1,
                    autoplay: (targetCarousel.find('.item').length > 1) ? true : false,
                    loop: (targetCarousel.find('.item').length > 1) ? true : false,
                    nav: false,
                    dots: true
                },
                600: {
                    items: 2,
                    autoplay: (targetCarousel.find('.item').length > 2) ? true : false,
                    loop: (targetCarousel.find('.item').length > 2) ? true : false,
                    nav: true,
                    dots: false
                },
                992: {
                    items: 3,
                    autoplay: (targetCarousel.find('.item').length > 3) ? true : false,
                    loop: (targetCarousel.find('.item').length > 3) ? true : false,
                    nav: true,
                    dots: false
                }
            }
        });
    });
    $(".owl-carousel.documents-carousel").each(function() {
        var targetCarousel = $(this);
        targetCarousel.owlCarousel({
            navSpeed: 600,
            dragEndSpeed: 600,
            autoplaySpeed: 850,
            autoplayHoverPause: true,
            margin: 30,
            dotsSpeed: 600,
            responsive: {
                0: {
                    items: 1,
                    autoplay: (targetCarousel.find('.item').length > 1) ? true : false,
                    loop: (targetCarousel.find('.item').length > 1) ? true : false,
                    nav: false,
                    dots: true
                },

                600: {
                    items: 1,
                    autoplay: (targetCarousel.find('.item').length > 1) ? true : false,
                    loop: (targetCarousel.find('.item').length > 1) ? true : false,
                    nav: true,
                    dots: false
                },
                768: {
                    items: 2,
                    autoplay: (targetCarousel.find('.item').length > 2) ? true : false,
                    loop: (targetCarousel.find('.item').length > 2) ? true : false,
                    nav: true,
                    dots: false
                },
                992: {
                    items: 3,
                    autoplay: (targetCarousel.find('.item').length > 3) ? true : false,
                    loop: (targetCarousel.find('.item').length > 3) ? true : false,
                    nav: true,
                    dots: false
                }
            }
        });
    });
    $(".carousel-partners").each(function() {
        var targetCarousel = $(this);
        targetCarousel.owlCarousel({
            dotsSpeed: 600,
            dragEndSpeed: 600,
            autoplaySpeed: 850,
            autoplayHoverPause: true,
            margin: 0,
            nav: false,
            dots: true,
            items: 1,
            autoplay: (targetCarousel.find('.item').length > 1) ? true : false,
            loop: (targetCarousel.find('.item').length > 1) ? true : false,
            onChanged: partnersCallback
        });
    });

    function partnersCallback(property) {
        var current = property.item.index;
        var isHide = $(property.target).find(".owl-item").eq(current).find(".item").attr('class');
        if (isHide) {
            if (isHide.indexOf('hide-title') > -1) {
                $('.partners-title').addClass('mobile-hidden');
            } else {
                $('.partners-title').removeClass('mobile-hidden');
            }
        }
    }

    $('.site-map-col').each(function() {
        if ($(this).find('.site-map-item').length < 2) {
            $(this).addClass('single-col');
        }
    });
    var isFirstMap = 0;
    $('.site-map-item').each(function() {
        if ($(this).find('ul').length) {
            $(this).find('h6').append('<i></i>');
            $(this).find('h6').addClass('map-toggle-button');
            if (isFirstMap == 0) {
                $(this).find('h6 i').addClass('map-to-close');
            }
            isFirstMap += 1;
        }
    });

    $('.site-map').on('click', 'h6 i', function() {
        if ($(this).hasClass('map-to-close')) {
            $(this).closest('.site-map-item').find('ul').slideUp(300);
            $(this).removeClass('map-to-close');
        } else {
            $('.site-map').find('i.map-to-close').closest('.site-map-item').find('ul').slideUp(300);
            $(this).closest('.site-map-item').find('ul').slideDown(300);
            $('.site-map h6 i').removeClass('map-to-close');
            $(this).addClass('map-to-close');
        }

    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest(".search-wrap").length) {
            if (!$(event.target).closest(".search-wrap").length) {
                $('.search-action').addClass('disabled');
            }

        } else {
            return;
        }
        event.stopPropagation();
    });

    $(document).on('click', '.search-action', function(e) {
        if ($(this).hasClass('disabled')) {
            e.preventDefault();
            $(this).removeClass('disabled');
            $('.search-wrap input').trigger('focus');
        }
    });


    $(document).on('mouseenter', '.desktop-nav .nav-button', function() {
        if (!$(this).closest('li').hasClass('opened')) {
            $('.nav-wrap').addClass('is-open');
            if ($('nav > li.opened').length) {
                $('.nav-item').fadeOut(400);
                $(this).next('.nav-item').fadeIn(200);
            } else {
                $(this).next('.nav-item').slideDown(300);
            }
            $('nav > li').removeClass('opened');
            $(this).closest('li').addClass('opened');
        }
    });
    $(document).on('mouseleave', '.desktop-nav', function() {
        $('.desktop-nav nav > li').removeClass('opened');
        $('.desktop-nav .nav-item').slideUp(300);
        $('.desktop-nav.nav-wrap').removeClass('is-open');
    });

    $('.nav-toggle').on('click', function() {

        $('.nav-wrap').slideToggle('300');
        $('.nav-wrap').toggleClass('is-open');
        $('html').toggleClass('no-scroll');
        if ($(this).hasClass('to-close')) {
            setTimeout(function() {
                $('nav li.md-opened .third-level-wrap,nav li.md-opened .second-level-wrap,nav li.md-opened .nav-item').slideUp(300);
                $('nav li.md-opened').removeClass('md-opened');
            }, 200);
        }
        $(this).toggleClass('to-close');
    });
    $(document).on('click', '.tablet-nav', function(e) {
        if ($(e.target).hasClass('tablet-nav')) {
            $('.nav-toggle').trigger('click');
        }
    });

    $(document).on('click', '.tablet-nav a', function(e) {

        if ($(e.target).is('i') || $(e.target).closest('.bank-online').length || $(e.target).hasClass('bank-online')) {
            e.preventDefault();
            if ($(this).next('div').length) {
                if (!$(this).closest('li').hasClass('md-opened')) {
                    if ($(this).closest('.second-level').length) {
                        $(this).closest('.second-level').find('li.md-opened .third-level-wrap').slideUp(300);
                        $(this).closest('.second-level').find('li.md-opened').removeClass('md-opened');
                    } else if ($(this).closest('.first-level').length) {
                        $(this).closest('.first-level').find('li.md-opened .third-level-wrap,li.md-opened .second-level-wrap').slideUp(300);
                        $(this).closest('.first-level').find('li.md-opened').removeClass('md-opened');
                    } else if ($(this).hasClass('nav-button')) {
                        $('nav li.md-opened .third-level-wrap,nav li.md-opened .second-level-wrap,nav li.md-opened .nav-item').slideUp(300);
                        $('nav li.md-opened').removeClass('md-opened');
                    }

                    $(this).closest('li').addClass('md-opened');
                    $(this).next('div').slideDown(300);

                } else {

                    $(this).closest('li').removeClass('md-opened');
                    $(this).next('div').slideUp(300);
                }
            }

        }

    });


    $('.attention-item').on('mouseover touchstart', function() {
        $('.attention-item svg').attr('class', 'default').closest('.attention-item').css({
            'background': '#ffffff',
            'color': '#214696'
        });
        $(this).css({
            'background': '#cccccc',
            'color': '#ffffff'
        });
        $(this).find('svg').attr('class', 'hovering');
        Snap.select('.hovering').animate({
            fill: '#ffffff'
        }, 250, mina.easeinout);
    });
    $('.attention-item').on('mouseleave', function() {
        Snap.select('.hovering').animate({
            fill: '#214696'
        }, 250, mina.easeinout);
        $('.attention-item svg').attr('class', 'default').closest('.attention-item').css({
            'background': '#ffffff',
            'color': '#214696'
        });

    });


    $('.video-wrap iframe').each(function(i) {
        var frameH = $(this).width() * 0.554;
        $(this).css('height', frameH + 'px');
    });

    $(window).resize(function() {
        $('.video-wrap iframe').each(function() {
            var frameH = $(this).width() * 0.554;
            $(this).css('height', frameH + 'px');
        });

    });

    function covtime(youtube_time) {
        array = youtube_time.match(/(\d+)(?=[MHS])/ig) || [];
        var formatted = array.map(function(item) {
            if (item.length < 2) return '0' + item;
            return item;
        }).join(':');
        if (array.length == 1) {
            formatted = '00:00:' + formatted;
        }
        if (array.length == 2) {
            formatted = '00:' + formatted;
        }
        return formatted;
    }


    $('.youtube-video').each(function(i) {
        if ($(this).closest('.video-item').length) {
            var ifr = $(this);
            var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = ifr.attr('src').match(regExp); // get youtube video id
            if (match && match[2].length == 11) {
                var youtubeUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + match[2] +
                    "&key=AIzaSyB8S1yBYnrpD_B_jRojrfRCIsIrGypbVy0&part=snippet,contentDetails";
                $.ajax({
                    async: false,
                    type: 'GET',
                    url: youtubeUrl,
                    success: function(data) {
                        var youtube_time = data.items[0].contentDetails.duration;
                        var duration = covtime(youtube_time);
                        var name = data.items[0].snippet.localized.title;
                        ifr.closest('.video-item').find('.video-info .name').text(name);
                        ifr.closest('.video-item').find('.video-info .time span').text(duration);
                    }
                });
            }
        }

    });

    $('.doc-item').on('click', function() {
        var link = $(this).attr('data-document');
        var name = $(this).attr('data-file');
        dlBinAjax(link, name);
    });
    if ($('.product-banner').length) {
        $('.product-banner-trigger').each(function(i) {
            $(this).attr('data-id', i);
            if (i == 0) {
                $(this).addClass('active-trigger');
            }
        });
        $('.product-slide').each(function(i) {
            $(this).attr('data-id', i);
            if (i == 0) {
                $(this).addClass('active-slide');
            }
        });
        $('.product-banner-trigger').on('click', function() {
            var id = $(this).attr('data-id');
            $('.product-banner-trigger').removeClass('active-trigger');
            $(this).addClass('active-trigger');
            $('.product-slide').removeClass('active-slide');
            $('.product-slide[data-id="' + id + '"]').addClass('active-slide');
            if ($(this).hasClass('tablet-trigger')) {
                $('.product-banner-nav').slideUp(300);
                $('.product-banner-slides').slideDown(300);
                if (windowWm.matches) {
                    $('.product-banner-top').slideUp(300);
                }
            }
        });
        $('.product-slides-inner .slide-back').on('click', function() {
            $('.product-banner-nav').slideDown(300);
            $('.product-banner-slides').slideUp(300);
            if (windowWm.matches) {
                $('.product-banner-top').slideDown(300);
            }
        });
    }


    $('.slider-range').each(function() {
        var slider = $(this),
            name = $(this).attr('data-name');
        $(this).noUiSlider({
            range: [slider.attr('data-min'), slider.attr('data-max')],
            start: [$('input[name="' + name + '"]').val()],
            step: slider.attr('data-step') * 1,
            handles: 1,
            serialization: {
                to: [$('input[name="' + name + '"]')],
                resolution: 1
            },
            slide: function() {
                $('input[name="' + name + '"]').trigger('change');
            }
        });
    });


    $('body').find(".table-scroll-wrap").mCustomScrollbar({
        axis: "x",
        moveDragger: true,
        scrollInertia: 70,
        mouseWheel: {
            enable: false
        },
        scrollButtons: {
            enable: true,
            scrollType: "stepless"
        },
        callbacks: {
            onInit: function() {
                $('body').find('.mCSB_buttonLeft,.mCSB_buttonRight').html('<span></span>');
            }
        }

    });
    var nowDate = new Date(),
        minYear,
        maxYear;
    if ($('#vacancyForm').length) {
        minYear = nowDate.getFullYear() - 80,
            maxYear = nowDate.getFullYear() - 16;
    } else {
        minYear = nowDate.getFullYear() - 90,
            maxYear = nowDate.getFullYear();
    }


    $(function() {
        var loc = $('body').attr('data-lang');
        if (loc == 'en') {
            loc = 'en-GB';
        }
        $(".datepicker").datepicker({
            defaultDate: "-20y",
            showOtherMonths: true,
            dateFormat: "dd/mm/yy",
            changeYear: true,
            yearRange: minYear + ":" + maxYear
        });
        $(".date-rates").datepicker({
            defaultDate: "0",
            showOtherMonths: true,
            dateFormat: "dd/mm/yy",
            changeYear: false
        });

        $(".datepicker,.date-rates").datepicker("option",
            $.datepicker.regional[loc]);
        $(".date-rates").datepicker("setDate", nowDate);
    });


    $('.masked').each(function() {
        var target = $(this),
            mask = $(this).attr('data-mask'),
            placeholder = $(this).attr('data-placeholder');
        target.mask(mask, {
            placeholder: placeholder,
            autoclear: false
        });
    });

    function getCurrencies() {
        $.ajax({
            url: location.protocol + '//' + location.hostname + "/ajax.php",
            dataType: 'json',
            data: 'action=convert&type=list',
            success: function(response) {
                arrayCurrencies = response.rates;
                arrayCurrencies.unshift(uahItem);
                currencyFrom = $('select[name="currency_from"]').attr('data-value');
                currencyTo = $('select[name="currency_to"]').attr('data-value');
                $('#converter select').each(function() {
                    var $target = $(this),
                        val = $target.attr('data-value');
                    $.each(arrayCurrencies, function(i, item) {
                        var selected = '';
                        if (val == item.currency_id) {
                            selected = ' selected';
                        }

                        $target.append('<option value="' + item.currency_id + '"' + selected + '>' + item.name + '</option>');
                    });
                });
                $('#converter select').trigger('change');

            },
            error: function(xhr, status) {
                console.log(status);
            }
        });
    }

    function getRate() {
        var fromQuery = (currencyFrom != '0') ? '&from=' + currencyFrom : '',
            toQuery = (currencyTo != '0') ? '&to=' + currencyTo : '',
            summQuery = ($('input.from_value').val() && !$('input.from_value').hasClass('error')) ? '&summ=' + $('input.from_value').val() : '';
        $.ajax({
            url: location.protocol + '//' + location.hostname + "/ajax.php",
            dataType: 'json',
            data: 'action=convert&type=kurs' + fromQuery + toQuery + summQuery,
            success: function(response) {
                $('#kurs').html('1 ' + iconFrom + ' = ' + response.kurs + ' ' + iconTo);

                if (response.summ) {
                    $('input.to_value').val(response.summ);
                }

            },
            error: function(xhr, status) {
                console.log(status);
            }
        });
    }

    if ($('#converter').length) {
        var arrayCurrencies = [],
            currencyFrom = '',
            currencyTo = '',
            iconFrom = '',
            iconTo = '';
        getCurrencies();
        $('#converter select').on('change', function() {
            var $select = $(this),
                val = $select.val(),
                nameSelect = $select.attr('name'),
                icon = '';
            if (!val) {
                val = '0';
            }
            $('input.to_value').val('');
            arrayCurrencies.filter(function(item) {
                if (item.currency_id == val) {
                    $select.closest('.currency-item').find('.field-icon').html(item.code);
                    icon = item.code;
                }
            });
            if (nameSelect == 'currency_from') {
                currencyFrom = val;
                iconFrom = icon;
                $('select[name="currency_to"]').find('option').prop('disabled', false);
                $('select[name="currency_to"]').find('option[value="' + val + '"]').prop('disabled', true);
                $('select[name="currency_to"]').trigger('refresh');
            } else {
                currencyTo = val;
                iconTo = icon;
                $('select[name="currency_from"]').find('option').prop('disabled', false);
                $('select[name="currency_from"]').find('option[value="' + val + '"]').prop('disabled', true);
                $('select[name="currency_from"]').trigger('refresh');
            }
            getRate();

        });

        $('.reverse-currency').on('click', function() {
            var from = currencyFrom,
                to = currencyTo;
            $('input.to_value').val('');
            $('#converter select').each(function() {
                var $select = $(this),
                    nameSelect = $select.attr('name');
                $(this).find('option').prop('selected', false).prop('disabled', false);
                if (nameSelect == 'currency_from') {
                    $(this).find('option[value="' + to + '"]').prop('selected', true);
                } else {
                    $(this).find('option[value="' + from + '"]').prop('selected', true);
                }
                $select.trigger('change');
            });
        });

        $('input.from_value').on('keyup', function() {
            $('input.to_value').val('');
        });

        $('#calcRate').on('click', function() {
            if (!$('input.from_value').hasClass('error')) {
                getRate();
            }
        });

    }

    function fillInTable($block, data) {
        var $table = $block.find('table'),
            $title = $block.find('h5'),
            $nbuText = $block.find('.nbu-text');
        $table.fadeOut(0);
        $table.closest('.table-scroll-wrap').fadeOut(0);
        $table.find('tbody').html('');
        $title.html('');
        $nbuText.html('');
        if (data.data) {
            var items = data.data;
            $title.text(data.title ? data.title : '');
            $nbuText.text(data.nbu_msg ? data.nbu_msg : '');
            if (items.length) {
                $table.fadeIn(0);
                $table.closest('.table-scroll-wrap').fadeIn(0);
                $.each(items, function(i, val) {
                    var nbuCol = '';
                    if (val.nbu) {
                        nbuCol = '<td>' + val.nbu + '</td>';
                    }
                    var itemList = '<tr><td>' + val.code + '</td><td>' + val.currency + '</td><td>' + val.buy + '</td><td>' + val.sell + '</td>' + nbuCol + '</tr>';
                    $table.append(itemList);
                });
            }
        } else {
            $title.html(data.missing_msg ? data.missing_msg : '');
        }

    }

    function getRatesTable(day, month, year) {
        var lang = $('body').attr('data-lang');
        $.ajax({
            url: location.protocol + '//' + location.hostname + "/services/v1/rates/",
            type: "GET",
            dataType: 'json',
            data: 'day=' + day + '&month=' + month + '&year=' + year + '&lang=' + lang,
            success: function(response) {
                var cash = response.rates.cash,
                    cards = response.rates.cards;

                fillInTable($('#cashList'), cash);
                fillInTable($('#cardsList'), cards);

                $('.rates-comment').html(response.rates.comment ? '<br>' + response.rates.comment : '');
            },
            error: function(xhr, status) {
                console.log(status);
            }
        });
    }

    if ($('#ratesList').length) {
        getRatesTable(nowDate.getDate(), nowDate.getMonth() + 1, nowDate.getFullYear());
        $('#ratesDate').on('change', function() {
            var newDate = $(this).datepicker('getDate');
            if (newDate) {
                getRatesTable(newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear());
            }
        });
    }

});