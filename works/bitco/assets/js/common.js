$(function() {
    var sidebar = $('.sidebar');
    var overlay = $('.sidebar__overlay');
    var mainMenu = $('.main-menu');
    var mobMenu = $('.mobile');
    var feedbackTextArea = $('.table__textarea');
    var feedbackSubmit = $('.js-fb-submit');
    var feedbackInput = $('.table__email');
    var feedbackForm = $('#feedback-form');
    var subscribeForm = $('#subscribe-form');
    var subscribeInput = $('.sub-menu__input');
    var state = {
        canNoticePolicy: true,
        canNoticeImprove: true
    };
    var storage = localStorage.getItem('state');
    var noticePolicy = $('.notice_policy');
    var noticeImprove = $('.notice_white');

    if (storage)  state = JSON.parse(storage);

    var closeNotice = function() {
        var $this = $(this);
        if ( $this.hasClass('notice__policy_sub') ) {
            $('.notice').removeClass('active');
        }
        var parent = $this.closest('.notice');
        parent.hasClass('notice_policy') ? state.canNoticePolicy = false : state.canNoticeImprove = false;
        parent.removeClass('active');
        localStorage.setItem('state', JSON.stringify(state));
    };

    if (noticePolicy.length && state.canNoticePolicy) {
        setTimeout(function() {
            noticePolicy.addClass('active');
        }, 4000);
    }

    if (noticeImprove.length && state.canNoticeImprove) {
        setTimeout(function() {
            noticeImprove.addClass('active');
        }, 4000);
    }

    $('.notice__btn').on('click', closeNotice);
    $('.notice').on('click', 'a', closeNotice);

    if ( feedbackTextArea.length ) {
        autosize( feedbackTextArea.get(0) );
    }

    var closeSidebar = function() {
        sidebar.add(overlay).removeClass('active');
    };

    var closeMainMenu = function() {
        mainMenu.add(overlay).removeClass('active');
    };

    $('.js-mail').on('click', function(e) {
        e.preventDefault();
        $('.notice_white').removeClass('active');
        mobMenu.removeClass('active');
        sidebar.add(overlay).toggleClass('active');
        setTimeout(function() {
            feedbackInput.focus();
        }, 350);
    });

    $('.js-close-sidebar').on('click', closeSidebar);

    $('.js-main-menu').on('click', function() {
        mainMenu.add(overlay).addClass('active');
    });

    $('.js-close-main-menu').on('click', closeMainMenu);

    overlay.on('click', function() {
        closeMainMenu();
        closeSidebar();
    });

    $('.js-mob-menu').on('click', function () {
        mobMenu.addClass('active');
    });

    $('.js-close-mob-menu').on('click', function() {
        mobMenu.removeClass('active');
    });

    var validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    var checkForm = function() {
        return feedbackTextArea.val().length > 5 && validateEmail(feedbackInput.val());
    };

    var feedbackFormReset = function() {
        feedbackTextArea.add(feedbackInput).val('');
        feedbackSubmit.prop('disabled', true);
    };

    feedbackForm
        .on('submit', function(e) {
            e.preventDefault();

            var form = $(this);
            if ( checkForm() ) {
                var data = form.serialize();

                feedbackFormReset();
                console.log(data);

                feedbackSubmit.addClass('sent').text('Done');
                feedbackInput.prop('disabled', true);
            }
        }).on('input', function() {
            if ( checkForm() ) {
                feedbackSubmit.prop('disabled', false);
            } else {
                feedbackSubmit.prop('disabled', true);
            }
        });

    subscribeForm
        .on('submit', function(e) {
            e.preventDefault();

            var form = $(this);
            if ( validateEmail(subscribeInput.val()) ) {
                var data = form.serialize();

                console.log(data);
                subscribeInput
                    .css('color', 'green')
                    .prop('disabled', true)
                    .val('Subscription activated');
            }
        });

    //var teamSlider = new Swiper ('.investors__list', {
    //    slidesPerView:  3,
    //    centeredSlides: true,
    //    initialSlide: 1,
    //    breakpoints: {
    //        375: {
    //            initialSlide: 0,
    //            slidesPerView:  'auto',
    //            spaceBetween: 10
    //        },
    //        1023: {
    //            slidesPerView:  'auto',
    //            spaceBetween: 10
    //        }
    //    }
    //});

    var newsSlider = new Swiper ('.news__slider-wrap', {
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false
        },
        slidesPerView: 3,
        centeredSlides: true,
        initialSlide: 1,
        navigation: {
            nextEl: '.btn_slider-news_next',
            prevEl: '.btn_slider-news_prev'
        },
        breakpoints: {
            1023: {
                initialSlide: 0,
                slidesPerView:  'auto',
                spaceBetween: 24
            },
            1439: {
                initialSlide: 0,
                slidesPerView:  'auto',
                spaceBetween: 30
            }
        }
    });

    // всплывающие лейблы
    if ( $('.user-form__text').length ) {
        $(document).on('focus', '.user-form__text', function () {
            $(this).siblings('label').addClass('active');
        });

        $(document).on('blur', '.user-form__text', function () {
            var $inputElement = $(this);
            if ($inputElement.val().length === 0) {
                $inputElement.siblings('label').removeClass('active');
            }
        });
    }
});