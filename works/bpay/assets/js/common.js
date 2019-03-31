$(function() {
	// мобильное меню
	if ( $('.mobile-btn').length ) {
		function closeMobileMenu() {
			$('.nav-mobile').removeClass('active');
		}

		$('.mobile-btn').on('click', function() {
			if ( $(window).width() < 1024 ) {
				$('.nav-mobile').addClass('active');
			} else {
				var
						$this = $(this);

				if ( $this.hasClass('active') ) {
					$this.removeClass('active');
				} else {
					$this.addClass('active');
				}
			}
		});

		$('.nav-mobile__close').on('click', closeMobileMenu);

		$('.nav-mobile__menu-wrap').on('click', 'a', function() {
			closeMobileMenu();
			var id = $(this).attr('href');
			if ( $(id).length < 1) return;
			var top = $(id).offset().top;

			$('body, html').animate({
				scrollTop: top - $('.header').outerHeight()
			}, 500);
		});
	}

	// таймер http://hilios.github.io/jQuery.countdown/examples/legacy-style.html
	var
			timerEl = $('.timer'),
			finalDate = timerEl.data('countdown');
	timerEl.countdown(finalDate)
			.on('update.countdown', function(event) {
				$(this).html(event.strftime(''
						+ '<div class="timer__item timer__item_days"><div class="timer__value">%D</div><div class="timer__title">days</div></div>'
						+ '<div class="timer__item timer__item_hours"><div class="timer__value">%H</div><div class="timer__title">hours</div></div>'
						+ '<div class="timer__item timer__item_mins"><div class="timer__value">%M</div><div class="timer__title">mins</div></div>'
						+ '<div class="timer__item timer__item_secs"><div class="timer__value">%S</div><div class="timer__title">secs</div></div>'));
			}).on('finish.countdown', function(event) {
		console.log('Конец!');
	});

	// плавный скролл к разделу
	$('body').on('click', '.header__menu-fixed-link', function (event) {
		event.preventDefault();

		var id = $(this).attr('href'),
				top = $(id).offset().top;

		$('body, html').animate({
			scrollTop: top - $('.header').outerHeight()
		}, 800);
	});

	// слайдер с телефоном
	if ( $('.online__slider').length ) {
		var phoneSlick = $('.online__slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			fade: true,
			speed: 0
		});

		$('.btn_prev-online').on('click', function () {
			phoneSlick.slick('slickPrev');
		});

		$('.btn_next-online').on('click', function () {
			phoneSlick.slick('slickNext');
		});
	}

	if ( $('.features__tabs-link').length ) {
		$('.features__tabs-link, .features__tabs-dot').on('click', function() {
			var
					item = $(this),
					listItems = $('.features .feature__wrap'),
					dots = $('.features__tabs-dots .features__tabs-dot'),
					links = $('.features__tabs-controls .features__tabs-link'),
					itemIdx = item.index();

			listItems.eq(itemIdx)
					.addClass('active')
					.siblings()
					.removeClass('active');

			dots.eq(itemIdx)
					.addClass('active')
					.siblings()
					.removeClass('active');

			links.eq(itemIdx)
					.addClass('active')
					.siblings()
					.removeClass('active');
		});
	}

	// валидация форм
	$.validator.addMethod('myEmail', function (value, element) {
		return this.optional(element) || ( /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/i.test(value) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(value) );
	});

	$('.form-email').each(function() {
		$(this).validate({
			onkeyup: function(element) {$(element).valid()},
			errorPlacement: function(error, element) { },
			rules: {
				email: {
					required: true,
					myEmail: true
				}
			},
			messages: {
				email: false
			},
			submitHandler: function(form) {
				// выполняем ajax отправку

				// для теста
				$(form).addClass('sent');
			}
		});
	});

	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = {37: 1, 38: 1, 39: 1, 40: 1};

	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}

	// how it works
	if ( $('.how__list-outer_seller').length ) {
		var
				defaultScale = .56,
				maxPlusScale = .44,
				sellerTexts = $('.seller__slide-text'),
				buyerTexts = $('.buyer__slide-text'),
				speedSwiper = 500;

		var howBreakpoints = {
			767: {
				spaceBetween: 22
			},
			1023: {
				spaceBetween: 190
			},
			1439: {
				spaceBetween: 235
			},
			9999: {
				spaceBetween: 278
			}
		};

		function changeSlideAnimation(slides, slideBg, slideImage) {
			for (var i = 0; i < slides.length; i++){
				var
						slide = slides[i],
						progress = slide.progress;

				if ( Math.abs(progress) < 1) { // анимируем текущий и предыдущий слайды
					var
							opacity,
							scale;

					if ( Math.abs(progress) === progress) { // предыдущий слайд (слева направо)
						opacity = 1 - progress;
						scale = 1 - progress * maxPlusScale;

					} else { // следующий слайд (слева направо)
						opacity = 1 + progress;
						scale = 1 + (progress * maxPlusScale);
					}
				} else if ( Math.abs(progress) === 1) { // предыдущий слайд
					opacity = 0;
					scale = defaultScale;
				} else {
					continue;
				}

				$(slide).find(slideBg).css({
					opacity: opacity
				});

				if ( scale >= 1 ) {
					scale = 1 ;
				} else if ( scale <= defaultScale ) {
					scale = defaultScale;
				}

				$(slide).find(slideImage).css({
					transform: 'scale('+ scale + ')'
				});
			}
		}

		function changeSlidesText($texts, index) {
			$texts.eq(index)
					.addClass('active')
					.siblings()
					.removeClass('active');
		}

		var sellerSwiper = new Swiper ('.how__list-outer_seller', {
			slidesPerView: 'auto',
			centeredSlides: true,
			spaceBetween: 278,
			breakpoints: howBreakpoints,
			speed: speedSwiper,
			allowTouchMove: true,
			touchReleaseOnEdges: true,
			slideToClickedSlide: device.desktop() ? true : false,
			autoplay: {
				delay: 1500,
				stopOnLast: false
			},
			on: {
				init: function() {
					var slider = this;
					$('.how__list-outer_seller').mouseenter(function() {
						if ( !slider.isEnd ) {
							slider.autoplay.start();
						}
					}).mouseleave(function() {
						slider.autoplay.stop();
					});
				},
				slideChange: function () {
					changeSlidesText(sellerTexts, this.realIndex);
				},
				progress: function () {
					var
							slides = this.slides;
					changeSlideAnimation(slides, '.seller__slide-bg', '.seller__slide-image');
				},
				slideChangeTransitionEnd: function() {
					var slider = this;
					if ( slider.isEnd ) {
						slider.autoplay.stop();
						$('.how__list-outer_seller').unbind('mouseenter').unbind('mouseenter');
					}
				},
				touchStart: function() {
					this.autoplay.stop();
					$('.how__list-outer_seller').unbind('mouseenter').unbind('mouseenter');
				}
			}
		});

		sellerSwiper.autoplay.stop();

		var buyerSwiper = new Swiper ('.how__list-outer_buyer', {
			slidesPerView: 'auto',
			centeredSlides: true,
			spaceBetween: 278,
			breakpoints: howBreakpoints,
			speed: speedSwiper,
			allowTouchMove: true,
			touchReleaseOnEdges: true,
			slideToClickedSlide: device.desktop() ? true : false,
			autoplay: {
				delay: 1500,
				stopOnLast: false
			},
			on: {
				init: function() {
					var slider = this;
					$('.how__list-outer_buyer').mouseenter(function() {
						if ( !slider.isEnd ) {
							slider.autoplay.start();
						}
					}).mouseleave(function() {
						slider.autoplay.stop();
					});
				},
				slideChange: function () {
					changeSlidesText(buyerTexts, this.realIndex);
				},
				progress: function () {
					var
							slides = this.slides;
					changeSlideAnimation(slides, '.buyer__slide-bg', '.buyer__slide-image');
				},
				slideChangeTransitionEnd: function() {
					var slider = this;
					if ( slider.isEnd ) {
						slider.autoplay.stop();
						$('.how__list-outer_buyer').unbind('mouseenter').unbind('mouseenter');
					}
				},
				touchStart: function() {
					this.autoplay.stop();
					$('.how__list-outer_buyer').unbind('mouseenter').unbind('mouseenter');
				}
			}
		});

		buyerSwiper.autoplay.stop();
	}

	if ( $('.how__tabs-link').length ) {
		$('.how__tabs-link').on('click', function() {
			var
					item = $(this),
					listItems = $('.how__list .how__list-item'),
					links = $('.how__tabs-controls .how__tabs-link'),
					itemIdx = item.index();

			listItems.eq(itemIdx)
					.addClass('active')
					.siblings()
					.removeClass('active');

			links.eq(itemIdx)
					.addClass('active')
					.siblings()
					.removeClass('active');
		});
	}

	// roadmap
	if ( $('.roadmap').length ) {
		var breakpoint = window.matchMedia( '(max-width:767px)' );
		var roadmapSwiper;
		var  breakpointChecker = function() {
			if ( breakpoint.matches === true ) {
				if ( roadmapSwiper !== undefined ) roadmapSwiper.destroy( true, true );
				return;
			} else if ( breakpoint.matches === false ) {
				return enableSwiper();
			}
		};

		var enableSwiper = function() {
			var
					defaultMaxScaleFont = 1.5;

			roadmapSwiper = new Swiper ('.roadmap__inner', {
				slidesPerView: 'auto',
				centeredSlides: true,
				spaceBetween: 200,
				speed: speedSwiper,
				allowTouchMove: true,
				touchReleaseOnEdges: true,
				slideToClickedSlide: device.desktop() ? true : false,
				navigation: {
					nextEl: '.roadmap__button_right',
					prevEl: '.roadmap__button_left'
				},
				on: {
					progress: function () {
						var
								slides = this.slides;

						for (var i = 0; i < slides.length; i++){
							var
									slide = slides[i],
									progress = slide.progress;

							if ( Math.abs(progress) < 1) { // анимируем текущий и предыдущий слайды
								var
										scaleFont,
										scaleCircle;

								if ( Math.abs(progress) === progress) { // предыдущий слайд (слева направо)
									scaleCircle = 1 - progress;
									scaleFont = defaultMaxScaleFont - progress;

								} else { // следующий слайд (слева направо)
									scaleCircle = 1 + progress;
									scaleFont = 1 + (1 + progress) ;
								}
							} else if ( Math.abs(progress) === 1) { // предыдущий слайд
								scaleCircle = 0; // скрываем
								scaleFont = 1;
							} else {
								continue;
							}

							$(slide).find('.roadmap__item-top').css({
								transform: 'scale('+ scaleFont + ')'
							});

							$(slide).find('.roadmap__item-circle-active').css({
								transform: 'scale('+ scaleCircle + ')'
							});
						}
					},
					slideChangeTransitionEnd: function() {
						var slider = this;
						if ( slider.isBeginning ) {
							$('.roadmap__button_right').show();
							$('.roadmap__button_left').hide();
						} else if ( slider.isEnd ) {
							$('.roadmap__button_right').hide();
							$('.roadmap__button_left').show();
						} else {
							$('.roadmap__button_right').show();
							$('.roadmap__button_left').show();
						}
					}
				}
			});
		};

		breakpoint.addListener(breakpointChecker);
		breakpointChecker();
	}

	// team slider
	(function() {
		var $slickSlider = $('.team__list');
		var settingsSlider = {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			speed: 0
		};

		function slickOnMobile(slider, settings){
			$(window).on('load resize', function() {
				if ($(window).width() > 767) {
					if (slider.hasClass('slick-initialized')) {
						slider.slick('unslick');
					}
					return;
				}
				if (!slider.hasClass('slick-initialized')) {
					var slick = slider.slick(settings);

					$('.btn_prev-team').on('click', function () {
						slick.slick('slickPrev');
					});

					$('.btn_next-team').on('click', function () {
						slick.slick('slickNext');
					});

					return slick;
				}
			});
		}

		slickOnMobile( $slickSlider , settingsSlider);
	}());

	// хедер
	function stickyHeader() {
		var payment = $('.payment');
		var st = $(window).scrollTop();
		if ( st === 0) {
			payment.removeClass('fixed');
			return;
		}
		if ( st >= 0 ) {
			payment.addClass('fixed');
		}
	}

	$(window).on('scroll', stickyHeader);

	// подцветка при скролле waypoins
	if ( $('.tracked').length) {
		var waypLis = $('.header__menu-fixed-item');

		$('.tracked').waypoint(function(dir) {
			var waypHash = $(this.element).attr('id');
			waypLis.children('a').removeClass('active');

			$.each( waypLis, function() {
				if( $(this).children('a').attr('href').slice(1) == waypHash ) {
					if(dir == 'up') {
						$(this).prev().children('a').addClass('active');
					} else {
						$(this).children('a').addClass('active');
					}
				}
			});
		}, {
			offset: '45%'
		});
	}

	// выбор языка
	if ( $('.langs__current').length ) {
		$('.langs__current').on('click', function() {
			var
					list = $('.langs__list');

			if ( !list.hasClass('active') ) {
				list.addClass('active');
				list.stop(true, true).slideDown('fast');
			} else {
				list.stop(true, true).slideUp('fast');
				list.removeClass('active');
			}
		});

		$('.langs__link').on('click', function() {
			var
					list = $('.langs__list'),
					current = $('.langs__current'),
					$this = $(this);

			if ( list.hasClass('active') ) {
				list.stop(true, true).slideUp('fast');
				current.text($this.text());
				list.removeClass('active');
			}
		});

		$(document).mouseup(function (e){
			var list = $('.langs__list');
			if (!list.is(e.target)
					&& list.has(e.target).length === 0
					&& !$('.langs__current').is(e.target) ) {
				list.stop(true, true).slideUp('fast');
				list.removeClass('active');
			}
		});
	}

	(function() {
	}());

});