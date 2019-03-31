$(function() {
	var pageWarap = $('.page-wrap');
	var content = $('.content');

	var isfullPage = false;

	if ( $(window).width() > 1199 ) {
		createfullPage();
	}

	function createfullPage() {
		if(isfullPage === false) {
			isfullPage = true;
			$('.content__sections').fullpage({
				verticalCentered: false
			});
		}
	}

	$(window).resize(function(){
		if ( $(window).width() > 1199 ) {
			createfullPage();
		} else {
			if(isfullPage === true) {
				isfullPage = false;
				$.fn.fullpage.destroy();
			}
		}
	});

	$('.menu__btn').on('click', function() {
		pageWarap.toggleClass('active');
	});

	$('.menu__btn-close').on('click', function() {
		pageWarap.removeClass('active');
	});

	$('.menu__link').on('click', function() {
		pageWarap.removeClass('active');
		if ( $(window).width() < 1200 ) {
			var link = $(this).attr('href');
			link = link.slice(1);
			if (link) {
				var block = $("[data-anchor='"+link+"']");
				$('html, body').animate({
					scrollTop: block.offset().top
				}, 500);
			}
		}
	});

	var slider = new Swiper ('.channel__current', {
		slidesPerView: 1,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		allowTouchMove: false
	});

	new Swiper ('.channel__pagination', {
		slidesPerView: 6,
		loop: true,
		slideToClickedSlide: true,
		navigation: {
			nextEl: '.channel__nav-btn_next',
			prevEl: '.channel__nav-btn_prev'
		},
		on: {
			slideChangeTransitionStart: function() {
				slider.slideTo(this.realIndex);
			}
		},
		breakpoints: {
			768: {
				slidesPerView: 1,
				centeredSlides: true
			},
			1139: {
				slidesPerView: 4
			}
		}
	});
});