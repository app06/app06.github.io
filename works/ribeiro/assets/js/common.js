$(function() {

	var $window = $(window);
	var $document = $(document);
	var currentSlide = $('.training__slider-number_current');
	var menuContent = $('.menu__content');
	var feedbackForm = $('#feedback-form');
	var bookingForm = $('#booking-form');
	var socialFixed = $('.social_fixed');
	var message = $('.message');
	var next = $('.next');
	var menuOpen = $('.btn_menu-open');
	var fpNav;
	var newsDisplayPrev = $('.news__display-left');
	var newsDisplayNext = $('.news__display-right');
	var newsDisplayCurrent = $('.news__display-number_current');
	var newsDisplayTotal = parseInt($('.news__display-number_total').text());

	$('.wrapper').fullpage({
		verticalCentered: false,
		navigation: true,
		navigationPosition: 'right',
		scrollOverflow: true,
		afterRender: function(){
			fpNav = $('#fp-nav');
		},
		onLeave: function(origin, destination, direction){
			destination !== 1 ? socialFixed.add(message).addClass('top') : socialFixed.add(message).removeClass('top');
			if (destination === 6) {
				socialFixed.addClass('hide').removeClass('white inverse dark');
				message.addClass('hide').removeClass('yellow dark');
				next.removeClass('active white inverse');
				menuOpen.addClass('hide').removeClass('dark white inverse');
				fpNav.addClass('hidden').removeClass('dark yellow');
			}
			if (destination === 1) {
				next.removeClass('active white inverse');
			}
		},
		afterLoad: function(origin, destination, direction){
			// соцсети
			if (origin !== 'contact') {
				socialFixed.removeClass('hide');
			}
			origin === 'book' ? socialFixed.addClass('white') : socialFixed.removeClass('white');
			origin === 'coach' ? socialFixed.addClass('inverse') : socialFixed.removeClass('inverse');
			origin === 'about'  || origin === 'news' ? socialFixed.addClass('dark') : socialFixed.removeClass('dark');

			// кнопка сообщений
			if (origin !== 'contact') {
				message.removeClass('hide');
				origin === 'news'
					|| origin === 'about' ? message.addClass('yellow') : message.removeClass('yellow');

				origin === 'coach'
				|| origin === 'book'
						? message.addClass('dark') : message.removeClass('dark');
			}

			// кнопка "следующий экран"
			if (origin !== 'training' && origin !== 'contact') {
				next.addClass('active');
				origin === 'book' ? next.addClass('white') : next.removeClass('white');
				origin === 'coach' ? next.addClass('inverse') : next.removeClass('inverse');
			}

			// кнопка меню
			if (origin !== 'contact') menuOpen.removeClass('hide');
			origin === 'about' || origin === 'news' ? menuOpen.addClass('dark') : menuOpen.removeClass('dark');
			origin === 'coach' ? menuOpen.addClass('white') : menuOpen.removeClass('white');
			origin === 'book' ? menuOpen.addClass('inverse') : menuOpen.removeClass('inverse');

			// навигация
			if (!fpNav) fpNav = $('#fp-nav');
			if (origin !== 'contact') fpNav.removeClass('hidden');
			origin === 'about' || origin === 'coach' ? fpNav.addClass('yellow') : fpNav.removeClass('yellow');
			origin === 'news' ? fpNav.addClass('dark') : fpNav.removeClass('dark');
		}
	});

	$('.btn_next').on('click', function() {
		$.fn.fullpage.moveSectionDown();
	});

	new Swiper ('.training__slider-container', {
		slidesPerView: 1,
		effect: 'fade',
		//initialSlide: 1,
		//autoplay: {
		//	delay: 5000
		//},
		navigation: {
			nextEl: '.btn_training_next',
			prevEl: '.btn_training_prev'
		},
		on: {
			init: function() {
				newsDisplayNext.text(this.realIndex+2).show();
			},
			slideChange: function() {
				currentSlide.text(this.realIndex+1);
			}
		}
	});

	new Swiper ('.news__slider-wrapper', {
		slidesPerView: 1,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		//initialSlide: 1,
		//autoplay: {
		//	delay: 5000
		//},
		navigation: {
			nextEl: '.btn_news_next',
			prevEl: '.btn_news_prev'
		},
		on: {
			init: function() {
				newsDisplayNext.text(this.realIndex+2).show();
			},
			slideChange: function() {
				var prev = this.realIndex - 1;
				var next = this.realIndex + 2;
				var current = this.realIndex + 1;
				if (prev < 0) {
					newsDisplayPrev.hide();
				} else {
					newsDisplayPrev.text(this.realIndex).show();
				}

				if (next > newsDisplayTotal) {
					newsDisplayNext.hide();
				} else {
					newsDisplayNext.text(next).show();
				}
				newsDisplayCurrent.text(current);
			}
		}
	});

	// попапы
	$('.popup__open').magnificPopup({
		mainClass: 'mfp-forms',
		showCloseBtn: false
	});

	$document.on('click', '.btn_book_ok, .feedback__close', function() {
		$.magnificPopup.close();
	});

	// отправка формы поддержки
	feedbackForm.add(bookingForm).on('submit', _showResponse);

	function _showResponse(ev){
		ev.preventDefault();

		// Для теста
		$.magnificPopup.close();
		document.getElementById('feedback-form').reset();
		document.getElementById('booking-form').reset();

		$.magnificPopup.open({
			items: {
				src: '#success'
			},
			mainClass: 'mfp-success',
			showCloseBtn: false
		});

		// Отправка Ajax-ом
		// var form = $(this),
		// 		url = 'url',
		// 		dataType = 'html',
		// 		defObject = _ajaxForm(form, url, dataType);

		// defObject.done(function(ans){
			//$.magnificPopup.open({
			//	items: {
			//		src: '#success'
			//	},
			//	mainClass: 'mfp-success',
			//	showCloseBtn: false
			//});
		// })
	}

	// function _ajaxForm(form, url, dataType){
	// 	var data = form.serialize(),
	// 			defObj = $.ajax({
	// 				type : "POST",
	// 				url : url,
	// 				dataType : dataType,
	// 				data: data
	// beforeSend: function() {
	//$.magnificPopup.close();
	//document.getElementById('feedback-form').reset();
	//document.getElementById('booking-form').reset();
	// }
	// 			}).fail( function(){
	// 			console.log('Проблемы на стороне сервера');
	// 		});
	// 	return defObj;
	// };

	$('.coach__inner').on('click', '.btn_coach', function() {
		var $this = $(this),
			parent = $this.closest('.coach'),
			items = parent.find('.coach__item'),
			imagesParent = parent.find('.coach__image-list'),
			imagesMobileParent = parent.find('.coach__image-mobile'),
			images = imagesParent.find('.coach__image'),
			imagesMobile = imagesMobileParent.find('.coach__image'),
			ind = $this.index();
		$this
			.siblings()
			.add(items)
			.add(images)
			.add(imagesMobile)
			.removeClass('active');
		$this
			.add(items.eq(ind))
			.add(images.eq(ind))
			.add(imagesMobile.eq(ind))
			.addClass('active');
	});

	menuOpen.on('click', function() {
		menuContent.toggleClass('active');
	});

	function closeMenu() {
		menuContent.removeClass('active');
	}

	$('.btn_menu-close').on('click', closeMenu);
});