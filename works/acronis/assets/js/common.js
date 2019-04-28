$(function() {
    var $window = $(window);
    var $body = $('body');
    var toTop = $('#back-to-top');
    var $document = $(document);

    new Swiper('.facts', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.facts__pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.facts__next'
        },
        breakpoints: {
            767: {
                slidesPerView:  1,
                spaceBetween: 0
            },
            959: {
                slidesPerView:  2,
                spaceBetween: 32
            },
        }
    });

    var vectorsSwiper = new Swiper('.popup-vectors__slider', {
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        pagination: {
            el: '.popup-vectors__pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.popup-vectors__btn_next',
            prevEl: '.popup-vectors__btn_prev'
        }
    });

    $('.accordeon__item-link').on('click', function (e) {
        var $this = $(this),
            item = $this.closest('.accordeon__item'),
            list = $this.closest('.accordeon'),
            items = list.find('.accordeon__item'),
            content = item.find('.accordeon__item-content'),
            otherContent = list.find('.accordeon__item-content'),
            duration = 300;

        if ( !item.hasClass('active') ) {
            items.removeClass('active');
            item.addClass('active');

            otherContent.stop(true, true).slideUp(duration);
            content.slideDown(duration);
        } else {
            content.slideUp(duration);
            item.removeClass('active');
        }

        if (e.originalEvent !== undefined) {
            $('.solution__btn[data-slide='+item.index()+']').trigger('click');
        }
    });

    $('.solution__btn').on('click', function (e) {
        var $this = $(this),
            idx = $this.data('slide'),
            slider = $this.closest('.solution__slider'),
            btns = slider.find('.solution__btn'),
            slides = slider.find('.solution__slide'),
            slide = slides.filter('[data-slide='+idx+']'),
            parcel = $('.solutions__parcel');

        if ( $this.hasClass('active') ) {
            $this.add(slides).add(parcel).removeClass('active');
            slides.eq(0).addClass('active');
        } else {
            btns.add(slides).removeClass('active');
            $this.add(slide).addClass('active');
            if (idx === 0) {
                parcel.addClass('active');
            } else {
                parcel.removeClass('active');
            }
        }

        if (e.originalEvent !== undefined) {
            $('.accordeon__item').eq(idx).find('.accordeon__item-link').trigger('click');
        }
    });

    $('.social-icons-sticky .trigger').on('click', function() {
        $(this).closest('.social-icons-sticky').toggleClass('opened');
    });

    function showGoTop() {
        var st = $window.scrollTop();
        var wHeight = $window.height();
        st > wHeight ? toTop.addClass('active') : toTop.removeClass('active');
    }
    toTop.on('click', function(event){
        event.preventDefault();
        $('body, html').animate({ scrollTop: 0 }, 550 );
    });
    $window.on('scroll resize', showGoTop);
    
    $('.menu-item').on('click', function () {
        $(this).toggleClass('show');
    });

    $('.js-close-popup').on('click', function () {
       $('.popup').removeClass('active');
        $body.removeClass('overflow-hidden');
    });
    
    $('.vectors__item').on('click', function (e) {
        e.preventDefault();

        $body.addClass('overflow-hidden');
        vectorsSwiper.slideTo($(this).data('id'), 1);
        $('.popup_vectors').addClass('active');
    });

    new WOW({mobile: false}).init();

    var params = {
        container: document.getElementById('lottie'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData
    };

    var anim;

    anim = lottie.loadAnimation(params);

    // прилипание схемы
    (function () {
        var slider = $('.solution__slider');
        var solutions = slider.closest('.solutions');
        var parent = slider.closest('.solution__slider-outer');
        var parentLeft = parent.offset().left;
        var parentTop = parent.offset().top;
        var bottom;
        var st;
        var solutionsHeight;
        var sliderHeight;

        function stickyRightBlock() {
            st = $document.scrollTop();
            sliderHeight = slider.outerHeight();
            solutionsHeight = solutions.outerHeight();
            bottom = solutions.offset().top + solutionsHeight - sliderHeight - 10

            if ($window.width() < 768) {
                return;
            }

            if (st > parentTop) {
                if (st < bottom) {
                    slider.css({
                        position: 'fixed',
                        top: 0,
                        left: parentLeft
                    });
                } else if (st >= bottom) {
                    slider.css({
                        position: 'absolute',
                        top: 'auto',
                        left: 0,
                        bottom: $window.width() > 959 ? -70 : -219
                    });
                }
            } else if(st <= parentTop){
                slider.css({
                    position: 'relative',
                    top: 0,
                    left: 0
                });
            }
        }

        stickyRightBlock();
        $window.on('scroll', function() {
            stickyRightBlock();
        });
        $window.on('resize', function() {
            slider.css({
                position: 'relative',
                top: 0,
                left: 0
            });
            parentLeft = parent.offset().left;
            parentTop = parent.offset().top;
        });
    }());
});