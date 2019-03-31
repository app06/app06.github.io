$(function() {
	var $window = $(window);
	var $document = $(document);
	var $wrapper = $('.wrapper');
	var $notice = $('.notice ');
	var canNotice = true;
	var storage = localStorage.getItem('canNotice');
	var tracked = $('.tracked');
	if (storage) canNotice = JSON.parse(storage);

	var phoneSlider = new Swiper ('.phone__slider-wrap', {
		slidesPerView: 1,
		effect: 'flip',
		allowTouchMove: false,
		pagination: {
			el: '.phone__slider-pagination',
			clickable: false
		}
	});

	new Swiper ('.publisher__slider-wrap', {
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 23,
		initialSlide: 1,
		navigation: {
			nextEl: '.publisher__next',
			prevEl: '.publisher__prev'
		},
		breakpoints: {
			1279: {
				pagination: {
					el: '.publisher__pagination',
					clickable: true
				}
			}
		}
	});

	new Swiper ('.promoter__slider-wrap', {
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 23,
		initialSlide: 1,
		navigation: {
			nextEl: '.promoter__next',
			prevEl: '.promoter__prev'
		},
		breakpoints: {
			1279: {
				pagination: {
					el: '.promoter__pagination',
					clickable: true
				}
			}
		}
	});

	new Swiper ('.news__slider-wrap', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		navigation: {
			nextEl: '.news__next',
			prevEl: '.news__prev'
		},
		breakpoints: {
			1279: {
				centeredSlides: true,
				pagination: {
					el: '.news__pagination',
					clickable: true
				}
			}
		}
	});

	$document.on('click', '.mobile-btn', function() {
		$('.nav-mobile').addClass('active');
	});

	function closeMobileMenu() {
		$('.nav-mobile').removeClass('active');
	}
	$document.on('click', '.nav-mobile__close', closeMobileMenu);


	// хедер
	var $product = $('.product');
	if ( $product.length ) {
		function stickyHeader() {
			var payment = $('.product');

			if ( $window.width() < 768 ) {
				payment.removeClass('fixed');
				return
			}

			var st = $(window).scrollTop();
			if ( st === 0) {
				payment.removeClass('fixed');
				return;
			}
			if ( st >= 0 ) {
				payment.addClass('fixed');
			}
		}

		$window.on('scroll', stickyHeader);
		$window.on('resize', function() {
			if ( $window.width() < 768 ) {
				$('.product').removeClass('fixed');
				return;
			}
		});
	}

	$document.on('click', '.slow', function(event) {
		event.preventDefault();

		var id = $(this).attr('href'),
				top = $(id).offset().top;
		var scroll = top - $('.header').outerHeight();

		if ( $(this).hasClass('nav-mobile__link') ) {
			closeMobileMenu();
			scroll = top;
		}

		$('body, html').animate({
			scrollTop: scroll
		}, 800);
	});

	// подцветка при скролле waypoins
	if ( tracked.length) {
		var waypLis = $('.menu__item');

		tracked.waypoint(function(dir) {
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

	setTimeout(function() {
		var parallax = $('.product__pic_left, .product__pic_right, .product__pic_list');

		$product.on('mousemove', function (e) {
			if ( $window.width() < 1280) {
				parallax.css({
					'transform': 'translate3D(0, 0, 0)'
				});
				return;
			}
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			var w = ($product.outerWidth() / 2) - mouseX;
			var h = ($product.outerHeight() / 2) - mouseY;
			var posX = w * (4 / 100);
			var posY = h * (4 / 100);
			if (Math.abs(posX) >= 20) {
				posX = Math.abs(posX) !== posX ? -20 : 20;
			}

			parallax.css({
				'transform': 'translate3D(' + posX + 'px,' + posY + 'px, 0)'
			});
		});
	}, 1000);

	new WOW({mobile: false}).init();

	var phoneVideo = document.getElementById('phone-video');
	if ( phoneVideo ) {
		var currTime = 0;
		var st = 0;
		var phoneBlock = $('#phone');

		function playerControl() {
			st = $document.scrollTop();

			var pheight = phoneBlock.height();
			var sp = phoneBlock.offset().top - 150;
			var ob = phoneBlock.offset().top + pheight;

			if ( st >= sp && st <= ob ) {
				if ( phoneVideo.paused ) {
					phoneVideo.play();
				}
			} else {
				if ( phoneVideo.paused ) {
					phoneVideo.pause();
				}
			}
		}
		$window.on('scroll', playerControl)
				.on('resize', playerControl);
		playerControl();

		phoneVideo.addEventListener('timeupdate', function() {
			currTime = phoneVideo.currentTime;
			if ( currTime >= 0 && currTime < 5 ) {
				phoneSlider.slideTo(0);
			} else if ( currTime >= 5 && currTime < 10) {
				phoneSlider.slideTo(1);
			} else if ( currTime > 10) {
				phoneSlider.slideTo(2);
			}
		});
	}

	var fakeWith = $('.publisher__fake-with');
	if ( fakeWith.length ) {
		function setScrollWidth() {
			if ( $window.width() > 767 ) return;
			fakeWith.each(function() {
				var $this = $(this);
				var parent = $this.closest('.publisher__steps-outer');
				var steps = parent.find('.publisher__step-list');
				$this.css('width', ($window.width() + steps.width() - 44)); // 44 - ширина номера
			});
		}

		$window.on('resize', setScrollWidth);
		setScrollWidth();
	}

	(function () {
		if ($.validator != null) {
			$.validator.addMethod('myEmail', function (value, element) {
				return this.optional(element) || ( /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/i.test(value) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(value) );
			});
		}

		var receiveForm = $('.subscribe__form');
		if ( receiveForm.length ) {

			var flag = true;

			receiveForm.validate({
				// onkeyup: function(element) {
				//     if (flag === false) {
				//         return;
				//     }
				//     $(element).valid();
				//     if ( !receiveForm.valid() ) {
				//         wrongMsg.show();
				//         receive.addClass('error');
				//         okMsg.hide();
				//     } else {
				//         wrongMsg.hide();
				//         receive.removeClass('error');
				//     }
				// },
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

					$.getJSON('/subscribe?email=' + $('.subscribe__input').val(), function(data){
						if (data.res) {
							$('.subscribe__input').val('Subscription activated').css({color: 'green'});
						}
					});

					console.log('yes');
				}
			});
		}
	}());

	$('.popup__open').magnificPopup({
		mainClass: 'mfp-policy',
		showCloseBtn: false,
		callbacks: {
			open: function() {
				$wrapper.addClass('blur');
			},
			close: function() {
				$wrapper.removeClass('blur');
			}
		}
	});

	$document.on('click', '.policy__close', function() {
		$.magnificPopup.close();
	});

	function closeNotice() {
		$notice.removeClass('active');
		canNotice = false;
		localStorage.setItem('canNotice', canNotice);
	}

	if (canNotice) {
		setTimeout(function() {
			$notice.addClass('active');
		}, 500);
	}

	$('.notice__btn').on('click', closeNotice);
});

