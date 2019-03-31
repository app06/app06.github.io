var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
	player = new YT.Player('video', {
		events: {
			'onReady': onPlayerReady
		}
	});
}

function onPlayerReady(event) {
	var playButton = document.querySelector('.movie__watch');
	playButton.addEventListener('click', function() {
		player.playVideo();
	});

	var pauseButton = document.querySelector('.video-player__close');
	pauseButton.addEventListener('click', function() {
		player.stopVideo();
	});
}

$(function() {
	// хедер
	if ( $('.payment').length ) {
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
	}

	// плавный скролл к разделу
	$('body').on('click', '.header__menu-fixed-link', function (event) {
		event.preventDefault();

		var id = $(this).attr('href'),
				top = $(id).offset().top;

		$('body, html').animate({
			scrollTop: top - $('.header').outerHeight()
		}, 800);
	});

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

	// плеер
	$('.movie__watch').on('click', function () {
		$('.video-player').addClass('active');
	});

	$('.video-player__close').on('click', function () {
		$('.video-player').removeClass('active');
	});

	// tabs solution
	$('.solution__btns').on('click', '.solution__tab-btn', function(e) {
		e.preventDefault();

		var
				$this = $(this),
				content = $('.solution__content-item'),
				itemIdx = $this.index(),
				container = $this.closest('.solution__inner'),
				blockClass = $this.data('class');

		content.eq(itemIdx)
				.add($this)
				.addClass('active')
				.siblings()
				.removeClass('active');

		container.get()[0].classList = 'solution__inner ' + blockClass;
	});

	// tabs solution
	$('.solutions__btns').on('click', '.solutions__tab-btn', function(e) {
		e.preventDefault();

		var
				$this = $(this),
				content = $('.solutions__content-item'),
				itemIdx = $this.index();

		content.eq(itemIdx)
				.add($this)
				.addClass('active')
				.siblings()
				.removeClass('active');
	});

	if ( $('.features__tabs-link').length ) {
		$('.features__tabs-link, .features__tabs-dot').on('click', function() {
			var
					item = $(this),
					listItems = $('.features .feature__wrap'),
					itemIdx = item.index();

			listItems.eq(itemIdx)
					.add(item)
					.addClass('active')
					.siblings()
					.removeClass('active');
		});
	}

	// media slider
	(function() {
		var $slickSlider = $('.media__list');
		if ( $slickSlider.length < 1 ) return;

		var settingsSlider = {
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
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

					$('.btn_media_prev').on('click', function () {
						slick.slick('slickPrev');
					});

					$('.btn_media_next').on('click', function () {
						slick.slick('slickNext');
					});

					return slick;
				}
			});
		}

		slickOnMobile( $slickSlider , settingsSlider);
	}());

	// мобильное меню
	function closeMobileMenu() {
		$('.nav-mobile').removeClass('active visible');
	}
	$(document).on('click', '.nav-mobile__close', closeMobileMenu);

	$(document).on('click', '.mobile-btn', function() {
		var nav = $('.nav-mobile');
		nav.addClass('active');
		setTimeout(function() {
			nav.addClass('visible');
		}, 600);
	});


	$('.nav-mobile__menu-wrap').on('click', 'a', function() {
		closeMobileMenu();
		var id = $(this).attr('href');
		if ( $(id).length < 1) return;
		var top = $(id).offset().top;

		$('body, html').animate({
			scrollTop: top - $('.header').outerHeight()
		}, 500);
	});

	$('.nav-mobile__user').on('click', 'a', closeMobileMenu);

	// попапы
	if ( $('.popup__open').length ) {
		$('.popup__open').magnificPopup({
			mainClass: 'mfp-forms'
		});
	}

	// всплывающие лейблы
	if ( $('.form__text-material').length ) {
		$(document).on('focus', '.form__text-material', function () {
			$(this).siblings('label').addClass('active');
		});

		$(document).on('blur', '.form__text-material', function () {
			var $inputElement = $(this);
			if ($inputElement.val().length === 0) {
				$inputElement.siblings('label').removeClass('active');
			}
		});
	}

	// team slider
	(function() {
		if ( $('.team__list_team').length < 1 ) return;

		var breakpoint = window.matchMedia( '(min-width:768px)' );
		var teamSlider;
		var advisersSlider;
		var  breakpointChecker = function() {
			if ( breakpoint.matches === true ) {
				if ( teamSlider !== undefined ) teamSlider.destroy( true, true );
				if ( advisersSlider !== undefined ) advisersSlider.destroy( true, true );
				return;
			} else if ( breakpoint.matches === false ) {
				return enableSwiper();
			}
		};

		var enableSwiper = function() {
			teamSlider = new Swiper ('.team__list_team', {
				slidesPerView: 'auto',
				centeredSlides: true,
				loop: true,
				spaceBetween: 20,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				}
			});

			advisersSlider = new Swiper ('.team__list_advisers', {
				slidesPerView: 'auto',
				centeredSlides: true,
				loop: true,
				spaceBetween: 20,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				}
			});
		};

		breakpoint.addListener(breakpointChecker);
		breakpointChecker();
	}());

	// валидация форм
	if ($.validator != null) {
		$.validator.addMethod('myEmail', function (value, element) {
			return this.optional(element) || ( /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/i.test(value) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(value) );
		});
	}
	if ( $('#form-career').length ) {
		(function() {
			var formCareer = $('#form-career');
			formCareer.validate({
				onkeyup: function(element) {
					if ( formCareer.valid() ) {
						formCareer.find('.btn_blue-submit').prop('disabled', false);
					}
				},
				errorPlacement: function(error, element) { },
				rules: {
					email: {
						required: true,
						myEmail: true
					},
					last_name: {
						required: true
					},
					phone: {
						required: true
					},
					letter: {
						required: true
					}
				},
				messages: {
					email: false,
					last_name: false,
					phone: false,
					letter: false
				},
				submitHandler: function(form) {
				}
			});
		}());
	}

	(function () {
		var receiveForm = $('.receive-email');
		if ( receiveForm.length ) {
			var receive = receiveForm.closest('.receive');
			var wrongMsg = receive.find('.receive__wrong');
			var okMsg = receive.find('.receive__ok');
			var flag = true;

			receiveForm.validate({
				onkeyup: function(element) {
					if (flag === false) {
						return;
					}
					$(element).valid();
					if ( !receiveForm.valid() ) {
						wrongMsg.show();
						receive.addClass('error');
						okMsg.hide();
					} else {
						wrongMsg.hide();
						receive.removeClass('error');
					}
				},
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
					if ( flag ) {
						wrongMsg.hide();
						receive.removeClass('error');
						okMsg.show();
						flag = false;
						receive.addClass('sent');
						// выполняем отправку
					}
				}
			});
		}
	}());

	if ( $('.receive__email').length ) {
		$(document).on('focus', '.receive__email', function () {
			$(this).siblings('label').addClass('active');
		});

		$(document).on('blur', '.receive__email', function () {
			var $inputElement = $(this);
			if ($inputElement.val().length === 0) {
				$inputElement.siblings('label').removeClass('active');
			}
		});
	}
});