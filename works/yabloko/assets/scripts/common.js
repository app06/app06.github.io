;$(function (){
	var isIE8 = ($.browser.msie && (parseInt($.browser.version, 10) < 9)) ? true : false;


	// waypoins
	if ( $('.header__waypoint-item').length && !isIE8 ) {
		var waypLis = $('.header__waypoint-item');

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
			offset: '30%'
		});
	}

	// открытие дополнительных цитат в блоке "Яблоко — это мы!"
	if( $('.nano').length && !isIE8 ) {
		$('.nano').nanoScroller();
	}

	// выравнивание списка новостей
	if(!isIE8) {
		if ( $('.cont-news__news-list').length > 0 ) {
			$('.cont-news__news-list').masonry({
				itemSelector: '.cont-news__news-item',
				columnWidth: 298
			});
		}
	}

	// timeline на странице персоны
	if ( $('.person__list').length ) {
		var sizeLi = $('.person__list-item').length;
		var x = 4;

		$('.person__list li:lt(' + x + ')').show();
		$('.person__list-show-more').on('click', function () {
			x = (x + 2 <= sizeLi) ? x + 2 : sizeLi;

			$('.person__list li:lt(' + x + ')').show();

			if (x == sizeLi) {
				$('.person__list-show-more').hide();
			}
		});
	}

	// стилизация формы на странице 'вступить в партию'
	if ( ($('.form__select').length
		|| $('.form__input-gender').length
		|| $('.form__input-file').length) && !isIE8 ) {
		$('.form__select,.form__input-gender,.form__input-file').styler();
	}

	// список городов
	if ( $('.user-panel__title').length ) {
		var
			cityBlock = $('.user-panel__city'),
			dropdownCityBlock = cityBlock.find('.user-panel__city-dropdown-wrap'),
			dropdownCityToggle =$('.user-panel__title');

		$('.user-panel__title').on('click', function(e) {
			e.preventDefault();

			if( !dropdownCityBlock.hasClass('active') ) {
				dropdownCityBlock.stop(true, true).slideDown('fast');
				dropdownCityBlock.addClass('active');
			} else {
				dropdownCityBlock.removeClass('active');
				dropdownCityBlock.stop(true, true).slideUp('fast');
			}
		});

		// закрытие списка городов
		$(document).mouseup(function (e){
			if ( !dropdownCityToggle.is(e.target) ) {
				dropdownCityBlock.removeClass('active');
				dropdownCityBlock.stop(true, true).slideUp('fast');
			}
		});

		// замена текста при выборе города
		$('.user-panel__city-dropdown-link').on('click', function() {
			dropdownCityToggle.text($(this).text());
		});
	}


	// поиск
	if ( $('.user-panel__btn-search').length ) {
		$(document).on('click', function(event){
		    if( $(event.target).hasClass('user-panel__btn-search') || $(event.target).parents().hasClass('user-panel__search-block') ){
		        $('.user-panel__search-block').addClass('active');
		    } else {
		        $('.user-panel__search-block').removeClass('active');
		    }
		});
	}


	// рандом блоков в разделе "Яблоко это мы"
	if ( $('.apple__list').length ) {
		(function($) {

		$.fn.randomize = function(childElem) {
		  return this.each(function() {
		      var $this = $(this);
		      var elems = $this.children(childElem);

		      elems.sort(function() { return (Math.round(Math.random())-0.5); });

		      $this.remove(childElem);

		      for(var i=0; i < elems.length; i++)
		        $this.append(elems[i]);

		  });
		}
		})(jQuery);

		$('.apple__list').randomize('.apple__item');
	}

	// фиксированное меню
	function fixedMenu() {
		var menuBlock = $('.header__logo-menu');
		var body = $('.page-wrap');
		var st;
		var offs = menuBlock.offset();
		var menuWrap = $('.header__menu-wrap');
		var menuWrapMt;
		$(document).on('scroll', function() {
			st = $(document).scrollTop();
			menuWrapMt = parseInt(menuWrap.css('margin-top'), 10);

			if ( (st >=  (offs.top + menuWrapMt) && !body.hasClass('page-wrap_open') )
					// && $(window).width() > 959
					) {
				menuBlock.addClass('fixed');
				menuBlock.width(menuBlock.parent().width());
			} else {
				menuBlock.removeClass('fixed');
			}

			if (st === 0) {
				menuBlock.removeClass('fixed');
			}
		});

		$(window).resize(function() {
			// if ( $(window).width() < 960 && menuBlock.hasClass('fixed') ) {
			// 	menuBlock.removeClass('fixed');
			// }
			menuBlock.width(menuBlock.parent().width());
		});
	}

	fixedMenu();

	// смена цвета waypoint ссылок
	function changeBgWaypoint() {
		var wpBlock = $('.header__waypoint-list');
		var wpBlockPos;
		var wpBlockHeight = wpBlock.height();
		var appleBlock = $('.apple');
		var actualBlock = $('.actual');
		var newsBlock = $('.news');
		var appleBlockPos;
		var actualBlockPos;
		var newsBlockPos;
		var appleBlockHeight;
		var actualBlockHeight;
		var newsBlockHeight;

		$(document).on('scroll', function() {
			wpBlockPos = wpBlock.offset();

			appleBlockPos = appleBlock.offset();
			actualBlockPos = actualBlock.offset();
			newsBlockPos = newsBlock.offset();

			appleBlockHeight = appleBlock.height();
			actualBlockHeight = actualBlock.height();
			newsBlockHeight = newsBlock.height();

			if ( ( (wpBlockPos.top >= (appleBlockPos.top - wpBlockHeight/2 ) )
					&& ((wpBlockPos.top + wpBlockHeight - wpBlockHeight/2) <=  (actualBlockPos.top + actualBlockHeight))
					)
				||
				 ( (wpBlockPos.top >= (newsBlockPos.top - wpBlockHeight/2) )
					&& ((wpBlockPos.top + wpBlockHeight - wpBlockHeight/2) <= (newsBlockPos.top + newsBlockHeight))
					)
				) {
				wpBlock.addClass('green');
			} else {
				wpBlock.removeClass('green');
			}
		});
	}

	if ( $('.header__waypoint-list').length ) {
		changeBgWaypoint();
	}

	// мобильное меню
	function mobileMenu() {
		var opener = $('.header__mob-btn'),
			menu = $('.header__menu-wrap'),
			body = $('.page-wrap'),
			cont = $('.main-content'),
			waypFlag = ($('.header__waypoint-list').length) ? true : false;
    	opener.on('click', function(e){
	        e.preventDefault();
	        if( $(this).hasClass('active') ) {
	            $(this).removeClass('active');
	            body.removeClass('page-wrap_open')
	            cont.removeClass('main-content_open');
	            cont.addClass('main-content_close');
	            setTimeout(function() {
	            	cont.removeClass('main-content_close');
	            }, 500);
	            // cont.stop(true, true).animate({
	            // 	left: 0
	            // }, 500);
	            if(waypFlag) {
	            	$('.header__waypoint-list').show();
	            }

	        } else{
	            $(this).addClass('active');
	            body.addClass('page-wrap_open'); ;
	            cont.removeClass('main-content_close');
	            cont.addClass('main-content_open');
	            if( $(window).width() < 960 ) {
	            	setTimeout(function() {
	            		$('body,html').animate({scrollTop: 0}, 300);
	            	}, 500);
	            }

	            // cont.stop(true, true).animate({
	            // 	left: '-250px'
	            // }, 500);
	            if(waypFlag) {
	            	$('.header__waypoint-list').hide();
	            }
	        }
    	});

	    $(window).resize(function(){
	        if($(this).width() >= 960) {
	            opener.removeClass('active');
	            body.removeClass('page-wrap_open')
	            cont.removeClass('main-content_open');
	            cont.removeClass('main-content_close');
	            // cont.stop(true, true).animate({
	            // 	left: 0
	            // }, 500);
	            if(waypFlag) {
	            	$('.header__waypoint-list').show();
	            }
	        }
    	});
	}

	if( $('.header__mob-btn').length ) {
		mobileMenu();
	}

	// анимация на странице программы
	if( $('.programm').length ) {
		$('.animated').waypoint( function(dir) {
			var el = $(this.element);
			if(dir === 'down') {
				if( el.data('animate-class') === 'zoomIn' ) {
					el.addClass('zoomIn');
				} else if( el.data('animate-class') === 'fadeIn' ) {
					el.addClass('fadeIn');
				} else if( el.data('animate-class') === 'fadeInLeft' ) {
					el.addClass('fadeInLeft');
				} else if( el.data('animate-class') === 'fadeInRight' ) {
					el.addClass('fadeInRight');
				}

			}
		}, {
			offset: '90%'
		});
	}
});