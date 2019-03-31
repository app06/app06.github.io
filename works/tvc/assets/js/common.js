$(function (){
	var $document = $(document);
	var fixedMenu = $('.fixed-menu');

	// поиск
	if ( $('.main-menu__search').length ) {
		$('.main-menu__btn-search').on('click', function(){
			var mainMenu = $('.main-menu__search');
			mainMenu.addClass('active');
			if ( $(this).hasClass('main-menu__btn-search_fixed') ) {
				mainMenu.addClass('fixed');
			}
			$('.main-menu__search-input_date').focus();
		});

		$('.main-menu__search-overlay').on('click', function() {
			$('.main-menu__search').removeClass('active fixed');
			$('.main-menu__search-input_date').data('datepicker').hide();
		});

		$(window).on('scroll', function() {
			var mainMenu = $('.main-menu__search');
			if ( mainMenu.hasClass('active') ) {
				mainMenu.removeClass('active fixed');
				$('.main-menu__search-input_date').data('datepicker').hide();
			}
		});
	}

	// табы в поиске
	if ( $('.main-menu__tabs-link').length ) {
		var  itemIdx = 0;

		$('.main-menu__search-input_date').keypress(function(e) {
			if (itemIdx === 0) {
				e.preventDefault();
			}

		});

		$('.main-menu__tabs-link').on('click', function() {
			var
					item = $(this).closest('.main-menu__tabs-controls-item'),
					listItems = $('.main-menu__tabs-list-item'),
					itemIdx = item.index();

			listItems.eq(itemIdx)
					.add(item)
					.addClass('active')
					.siblings()
					.removeClass('active')
					.end()
					.find('.main-menu__search-input')
					.focus();
		});
	}

	// air datepicker поиска
	if ( $('.main-menu__search-input_date').length ) {
		$('.main-menu__search-input_date').datepicker({
			position: 'bottom left',
			dateFormat: 'dd-mm-yyyy',
			onSelect: function(formattedDate, date, inst) {
				inst.hide();
				window.location.href = '/news/archive/date/' + formattedDate
			},
			classes: 'search__datepicker'
		});
	}

	// синхронизация инпутов в поиске
	if ( $('.main-menu__search-input').length ) {
		$('.main-menu__search-input_news').on('keyup paste', function() {
			$('.main-menu__search-input_channel').val($(this).val());
		});

		$('.main-menu__search-input_channel').on('keyup paste', function() {
			$('.main-menu__search-input_news').val($(this).val());
		});
	}

	// выбадающее меню городов Телеканал
	if ( $('.timezone').length ) {
		$('.timezone').on('click', function() {
			var $this = $(this);
			if ( !$this.hasClass('active') ) {
				$this.addClass('active');
			} else {
				$this.removeClass('active');
			}
		});

		$(document).on('mouseup', function(e){
			var tz = $('.timezone');
			if (!tz.is(e.target) && tz.has(e.target).length === 0 ) {
				tz.removeClass('active');
			}
		});
	}

	/* Пагинация на страницах с подгружаемыми блоками [ */
	var currentPageUrl;
	var pageParams = [];

	function getPageNumber() {
		var page = 1;
		var arr = window.location.pathname.split('/');

		arr.forEach(function(item, i) {
			if (item === 'page' && arr[i+1] != null) page = arr[i+1];
		});

		return parseInt(page);
	}

	function changePageUrl(url) {
		console.log(url);
	}

	function changeUrlOnScroll() {
		if (!currentPageUrl) return false;
		var st = $(window).scrollTop();
		pageParams.forEach(function(page) {
			var stMod = st + $(window).height();
			if (stMod >= page.top && stMod < page.bottom) {
				if (currentPageUrl !== page.url) {
					changePageUrl(page.url);
					currentPageUrl = page.url;
				}
			}
		});
	}
	$(window).on('scroll resize', changeUrlOnScroll);

	function setPageParams(list, itemClass) {
		var items = list.find(itemClass),
			groups = [];
		pageParams = [];

		items.each(function() { // определяем станицы
			var group = $(this).data('page-url');
			if($.inArray(group, groups) === -1) {
				groups.push(group);
			}
		});

		var groupCount = groups.length - 1;
		groups.forEach(function(group, i) { // определяем границы страницы
			var elements = items.filter("[data-page-url='" + group + "']");
			var top, bottom;
			if ( elements.length > 1) {
				var lastEl = elements.last();
				var firstEl = elements.first();
				top = firstEl.offset().top + firstEl.outerHeight();
				bottom = (i === groupCount) ? $document.height()+50 : (lastEl.offset().top + lastEl.outerHeight());
			} else { // в текстовой трансляции или статье
				top = elements.offset().top;
				bottom = (i === groupCount) ? $document.height()+50 : top + elements.outerHeight();
			}

			pageParams.push({
				top: top,
				bottom: bottom,
				url: group
			});
		});
	}
	/* ] Пагинация на страницах с подгружаемыми блоками */

	// выравнивание списка новостей на главной
	if ( $('.main-news__list').length) {
		var mainNewsPage = getPageNumber(),
			mainNewsList = $('.main-news__list'),
			mainNewsPageUrl = mainNewsList.attr('data-page-url');
			currentPageUrl = mainNewsPageUrl;

		$(window).on('resize', function() {
			return setPageParams(mainNewsList, '.main-news__item');
		});
		var btnMainMore = $('.more-btn');
		var $mainMasonry = $('.main-news__list');
		$mainMasonry.imagesLoaded(function(){
			$mainMasonry.masonry({
				itemSelector: '.main-news__item',
				columnWidth: 319,
				transitionDuration: '1.5s',
				hiddenStyle: { opacity: 0 },
				visibleStyle: { opacity: 1 },
				animationOptions: {
					duration: 400000
				}
			});
			$mainMasonry.addClass('active');
		});

		// подгрузка блоков новостей
		function loadMore()
		{
			$(window).unbind('scroll.news');

			var
					loader = $('.news__loader'),
					moreBtn = $('.more-btn__wrap');
			loader.show();
			moreBtn.hide();

			mainNewsPage++;
			// тут должна быть ajax подргузка
			var $items = $($('#tmp-series').html());
			if ( $items.filter('.main-news__item').length < 1 ) {
				loader.hide();
				return false;
			}

			$items
				.attr('data-page-url', mainNewsPageUrl + 'page/' + mainNewsPage)
				.css({
					opacity: 0,
					visibility: 'hidden'
				});

			// setTimeout удалить
			setTimeout(function() {
				moreBtn.show();
				loader.hide();
				$mainMasonry.append($items).imagesLoaded(function(){
					$mainMasonry.masonry('appended', $items);
					$items.css({
						opacity: 1,
						visibility: 'visible'
					});
					setPageParams(mainNewsList, '.main-news__item');
					$(window).bind('scroll.news', bindScroll);
				});
			}, 1000);

			return true;
		}

		function bindScroll(){
			var st = $(window).scrollTop(),
				bottom = btnMainMore.offset().top + btnMainMore.height();
			if( st + $(window).height() >=  bottom ) {
				loadMore();
			}
		}

		$(window).on('scroll.news', bindScroll);
	}

	// мобильное меню
	function mobileMenu() {
		var opener = $('.main-menu__mobile-btn'),
				body = $('.wrapper'),
				cont = $('.content-outer');
		opener.on('click', function(e){
			e.preventDefault();
			if( opener.hasClass('active') ) {
				opener.removeClass('active');
				body.removeClass('wrapper_open');
				cont.removeClass('content-outer_open');
				cont.addClass('content-outer_close');
				setTimeout(function() {
					cont.removeClass('content-outer_close');
				}, 500);
			} else{
				opener.addClass('active');
				body.addClass('wrapper_open');
				cont.removeClass('content-outer_close');
				cont.addClass('content-outer_open');
				$('html, body').animate({
					scrollTop: 0
				}, 500);
			}
		});

		$(window).resize(function(){
			if($(this).width() >= 960) {
				opener.removeClass('active');
				body.removeClass('wrapper_open');
				cont.removeClass('content-outer_open');
				cont.removeClass('content-outer_close');
			}
		});
	}

	if( $('.main-menu__mobile-btn').length ) {
		mobileMenu();
	}

	// видеоархив
	function owlVideoArchive(block) {
		$(block).each(function() {
			var
					sliderBlock = $(this),
					parent = sliderBlock.closest('.video-archive__list-wrap'),
					prev = parent.find('.video-archive__list-btn_prev'),
					next = parent.find('.video-archive__list-btn_next');

			var sliderOwl = sliderBlock.owlCarousel({
				items: 4,
				margin: 0,
				responsiveClass:true,
				responsive: {
					320: {
						items: 1
					},
					767: {
						items: 2
					},
					1000: {
						items: 3
					},
					1291: {
						items: 4
					}
				},
				itemMobile: false
			});

			next.click(function() {
				sliderOwl.trigger('next.owl.carousel');
			});

			prev.click(function() {
				sliderOwl.trigger('prev.owl.carousel');
			});
		});
	}

	function owlVideoArchiveProgram() {
		var
				sliderBlock = $('.owl-program'),
				parent = sliderBlock.closest('.video-archive__list-wrap'),
				prev = parent.find('.video-archive__list-btn_prev'),
				next = parent.find('.video-archive__list-btn_next');

		var sliderOwl = sliderBlock.owlCarousel({
			items: 3,
			margin: 0,
			responsiveClass:true,
			responsive: {
				320: {
					items: 1
				},
				767: {
					items: 2
				},
				1000: {
					items: 3
				},
				1201: {
					items: 2
				},
				1307: {
					items: 3
				}
			},
			itemMobile: false
		});

		next.click(function() {
			sliderOwl.trigger('next.owl.carousel');
		});

		prev.click(function() {
			sliderOwl.trigger('prev.owl.carousel');
		});
	}

	function owlSchedule() {
		var
				sliderBlock = $('.owl-schedule'),
				parent = sliderBlock.closest('.schedule__days'),
				prev = parent.find('.schedule__btn_prev'),
				next = parent.find('.schedule__btn_next');

		var sliderOwl = sliderBlock.owlCarousel({
			items: 7,
			margin: 0,
			autoWidth:false,
			responsiveClass:true,
			responsive: {
				320: {
					items: 2
				},
				797: {
					items: 5
				},
				1290: {
					items: 7
				}
			},
			itemMobile: false
		});

		next.click(function() {
			sliderOwl.trigger('next.owl.carousel');
		});

		prev.click(function() {
			sliderOwl.trigger('prev.owl.carousel');
		});
	}

	if ( $('.video-archive').length ) {
		owlVideoArchiveProgram();
		owlVideoArchive('.video-archive__list');
	}

	// видеоархив, выделение активного блока
	if ( $('.video-archive__heading-link').length ) {
		// 34 высота блока подменю
		var fixedMenuHeight = fixedMenu.hasClass('active-sub-menu') ? (fixedMenu.outerHeight() + 34) : fixedMenu.outerHeight();

		$('.js-archive-menu').on('click', 'a', function(event) {
			event.preventDefault();
			var
					$this = $(this),
					link =  $this.closest('.sub-menu__list').length ? $this.data('href') : $this.attr('href'),
					el = $(link);

			$('.sub-menu__link').removeClass('active').filter("[data-href='"+link+"']").addClass('active');
			document.location.hash = link;

			if ( el.length ) {
				$('.video-archive__block').removeClass('hover');
				el.addClass('hover');
				// закрываем мобильное меню
				$('body, html').scrollTop(el.offset().top - fixedMenuHeight);
			}
		});

		if ( location.hash ) {
			setTimeout(function() {
				$('body, html').scrollTop($(document.location.hash).offset().top - fixedMenuHeight);
			}, 1);
		}
	}

	if ( $('.owl-schedule').length ) {
		owlSchedule();
	}

	var schedule = $('.schedule');
	if ( schedule.length ) {
		function reposSchedule() {
			schedule.css({
				left: 'auto',
				top: 'auto'
			});
		}
		$(window).on('resize', reposSchedule);
	}

	if ( $('.news-menu__heading').length ) {
		$('.news-menu__heading').on('click', function() {
			var
					$this = $(this);
			if ( $this.hasClass('active') ) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
		});
	}

	// слайдер в статье
	if ( $('.article__text-slider').length ) {
		var bxArticleText = $('.article__text-slider').bxSlider({
			auto: true,
			controls: false
		});
	}

	function getHashValue(key) {
		var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
		return matches ? matches[1] : null;
	}

	// отрисовака галлереи
	if ( $('.inner-gallery').length ) {
		function bxArticle(list) {
			list.each(function() {
				var
						$this = $(this),
						bxList = $this.find('.article__slider'),
						thumbs = $this.find('.article__thumbs'),
						imgs = thumbs.find('img');

				var bxArticlePhoto = bxList.bxSlider({
					controls: false,
					adaptiveHeight: true,
					pager: false,
					onSliderLoad: function(currentIndex) {
						imgs.eq(currentIndex).addClass('border-active');
					}
				});

				if ( thumbs.length > 0 ) {
					owlBx(thumbs);
				}

				thumbs.on('click', '.article__thumbs-item', function(){
					var
							$this = $(this),
							parent = $this.closest('.article__thumbs'),
							imgs = parent.find('img'),
							parentWrap = parent.siblings('.article__bx-slider-wrap'),
							player = parentWrap.find('.brand__player');

					if ( player.length > 0) {
						player.fadeOut('fast', function() {
							player.remove();
							parentWrap.removeClass('active');
						});
					}
					imgs.removeClass('border-active');
					$this.find('img').addClass('border-active');
					bxArticlePhoto.goToSlide($this.data('index'));
				});
			});
		}

		$.extend(true, $.magnificPopup.defaults, {
			tLoading: 'Загрузка...',
			gallery: {
				tPrev: 'Назад',
				tNext: 'Вперед',
				tCounter: '%curr% из %total%'
			}
		});

		function changeGalleryUrl (url) {
			location.hash = url;
		}

		function openMfp ($this) {
			if ( $this.hasClass('article__slide_video') ) return;
			var
					fullSrc = $this.data('image-full'),
					gallery = $this.closest('.inner-gallery'),
					startAt = Number($this.attr('data-index')),
					contentBlock = $this.closest('.article__content'),
					banner = contentBlock.find('.article__fixed-banner'),
					gid = gallery.data('gid');

			if ( fullSrc.length > 0 ) {
				$.magnificPopup.open({
					mainClass: 'article__mfp-gallery',
					items: gallery.data('full-arr'),
					type: 'image',
					callbacks: {
						open: function () {
							$.magnificPopup.instance.goTo(startAt);
							if ( banner.length ) {
								banner.prependTo('body').addClass('active');
							}
						},
						close: function() {
							if ( banner.length ) {
								banner.appendTo(contentBlock).removeClass('active');
							}
							removeHash();
						},
						change: function() {
							var el = gallery.find('.article__slide[data-index="' + $.magnificPopup.instance.index + '"]').not('.bx-clone');
							var url = 'gid=' + gid + '&pid=' + el.data('pid');
							changeGalleryUrl(url);
						}
					},
					gallery: {
						enabled: true
					}
				});
			}
		}
		$('.content').on('click', '.article__slide', function() {
			var
					$this = $(this);
			openMfp($this);
		});

		function getUrl(itemId, size, ext) {
			var id = itemId.toString();
			var url = '/pictures/' + size;
			for (var i = 0; i < id.length; i = i + 3) {
				url = url + '/' + id.substring(i, i + 3);
			}
			return url + '.' + ext;
		}

		function getPicsIdAsString(pics) {
			var
					arr = [],
					str = '';
			pics.forEach(function(item) {
				if ( item.type == 'pic' ) arr.push(item['pic_id']);
			});
			if ( arr.length ) {
				str = arr.join(',');
			}
			return str;
		}

		function getArticleImageData(idsStr) {
 			return $.ajax({
				type : 'GET',
				url : '/picture/data/id/' + idsStr,
				dataType : 'JSON'
			});
		}

		function createTitle(title, sliderLi) {
			$('<div/>', {
				class: 'article__slide-title',
				text: title
			}).prependTo(sliderLi.find('.article__slide-author'));
		}

		function itemHasTitle(item) {
			if ( item.title != null && item.title != '' ) {
				return true;
			} else {
				return false;
			}
		}

		function removeHash() {
			history.pushState("", document.title, window.location.pathname + window.location.search);
		}

		function openPopupByHash() {
			var gid = getHashValue('gid');
			var pid = getHashValue('pid');
			var gallery = $('.inner-gallery[data-gid="'+gid+'"]');
			var elm = gallery.find('.article__slide[data-pid="'+pid+'"]');
			if ( elm.length ) {
				openMfp(elm);
			}
		}

		function drawArticleGallery($gallery) {
			$gallery.each(function() {
				var
						gallery = $(this),
						pics = gallery.data('items');

				var sliderBlock = $('<div/>', {
					class: 'article__bx-slider-wrap'
				});

				var sliderUl = $('<ul/>', {
					class: 'article__slider'
				});

				var thumbsBlock = $('<div/>', {
					class: 'article__thumbs owl-carousel'
				});

				var fullGalleryArr = [];
				var indexEl = 0;
				var authorsStr = getPicsIdAsString(pics);

				//getArticleImageData(authorsStr).done(function(authors) {
					var authors = {"190026":{"id":"190026","author":null, "title":"Заголовок 1", "sizes":{"o":"https:\/\/cdn.tvc.ru\/pictures\/o\/190\/026.jpg","t":"https:\/\/cdn.tvc.ru\/pictures\/t\/190\/026.jpg"}},"190028":{"id":"190028","author":null, "sizes":{"o":"https:\/\/cdn.tvc.ru\/pictures\/o\/190\/028.jpg","t":"https:\/\/cdn.tvc.ru\/pictures\/t\/190\/028.jpg"}},"190029":{"id":"190029","author":"\u0424\u043e\u0442\u043e\u0431\u0430\u043d\u043a \u041b\u043e\u0440\u0438","title": "Заголовок 2", "sizes":{"o":"https:\/\/cdn.tvc.ru\/pictures\/o\/190\/029.jpg","t":"https:\/\/cdn.tvc.ru\/pictures\/t\/190\/029.jpg"}},"190030":{"id":"190030","author":null,"sizes":{"o":"https:\/\/cdn.tvc.ru\/pictures\/o\/190\/030.jpg","t":"https:\/\/cdn.tvc.ru\/pictures\/t\/190\/030.jpg"}},"190031":{"id":"190031","author":null,"sizes":{"o":"https:\/\/cdn.tvc.ru\/pictures\/o\/190\/031.jpg","t":"https:\/\/cdn.tvc.ru\/pictures\/t\/190\/031.jpg"}}};
					pics.forEach(function(item, i) {
						if ( item.type == 'pic' ) {
							var srcSlider = 'https://static.tvc.ru' + getUrl(item['pic_id'], 'mc', 'jpg');
							var srcSliderFull = 'https://static.tvc.ru' + getUrl(item['pic_id'], 'o', 'jpg');
							var srcThumb = 'https://static.tvc.ru' + getUrl(item['pic_id'], 't', 'jpg');

							var sliderLi = $('<li/>', {
								class: 'article__slide',
								itemprop: 'associatedMedia',
								itemscope: '',
								itemtype: 'http://schema.org/ImageObject',
								'data-image-full': srcSliderFull,
								'data-index': indexEl,
								'data-pid': item['pic_id']
							});

							// Если есть автор
							if ( authors[item['pic_id']] != null && authors[item['pic_id']].author != null) {
								if ( itemHasTitle(authors[item['pic_id']]) ) {
									var authorTitle = "<div class='article__slide-title'>" + authors[item['pic_id']].title + "</div>" + 'Автор: ' + authors[item['pic_id']].author;
									fullGalleryArr.push({src: srcSliderFull, title: authorTitle});
								} else {
									fullGalleryArr.push({src: srcSliderFull, title: 'Автор: ' + authors[item['pic_id']].author});
								}
								$('<div/>', {
									class: 'article__slide-author',
									text: 'Автор: ' + authors[item['pic_id']].author
								}).appendTo(sliderLi);
							} else {
								if ( itemHasTitle(authors[item['pic_id']]) ) {
									fullGalleryArr.push({src: srcSliderFull, title: "<div class='article__slide-title'>" + authors[item['pic_id']].title + "</div>"});
								} else {
									fullGalleryArr.push({src: srcSliderFull, title: authors[item['pic_id']].author});
								}
							}

							indexEl++;

							if ( itemHasTitle(authors[item['pic_id']]) ) {
								if ( sliderLi.children('.article__slide-author').length ) {
									createTitle(authors[item['pic_id']].title, sliderLi)
								} else {
									$('<div/>', {
										class: 'article__slide-author'
									}).appendTo(sliderLi);
									createTitle(authors[item['pic_id']].title, sliderLi);
								}
							}

							$('<img/>', {
								src: srcSlider,
								itemprop: 'image',
								alt: ''
							}).appendTo(sliderLi);

							sliderLi.appendTo(sliderUl);

							var thumbItem = $('<div/>', {
								class: 'article__thumbs-item',
								'data-index': i
							});

							$('<img/>', {
								src: srcThumb,
								alt: ''
							}).appendTo(thumbItem);
							thumbItem.appendTo(thumbsBlock)
						} else if ( item.type == 'video' ) {
							var srcThumb = 'https://static.tvc.ru' + getUrl(item['pic_id'], 't', 'jpg');
							var srcSlider = 'https://static.tvc.ru' + getUrl(item['pic_id'], 'mc', 'jpg');

							var sliderLi = $('<li/>', {
								class: 'article__slide article__slide_video',
								itemprop: 'associatedMedia',
								itemscope: '',
								'data-video-src': "//www.tvc.ru/video/iframe/id/" + item.video_id + "/id_stat/news/type/html5"
							});

							$('<img/>', {
								src: srcSlider,
								itemprop: 'image',
								alt: ''
							}).appendTo(sliderLi);
							$('<i/>', {
								class: 'ico-video ico-video_gallery-slide'
							}).appendTo(sliderLi);
							sliderLi.appendTo(sliderUl);

							var thumbItem = $('<div/>', {
								class: 'article__thumbs-item',
								'data-index': i
							});

							$('<img/>', {
								src: srcThumb,
								alt: ''
							}).appendTo(thumbItem);

							$('<i/>', {
								class: 'ico-video ico-video_gallery-thumb'
							}).appendTo(thumbItem);

							thumbItem.appendTo(thumbsBlock);
						}
					});

					sliderUl.appendTo(sliderBlock);
					sliderBlock.appendTo(gallery);
					if ( thumbsBlock.children().length > 1 ) {
						thumbsBlock.appendTo(gallery);
					}

					if ( fullGalleryArr.length > 0 ) {
						gallery.attr('data-full-arr', JSON.stringify(fullGalleryArr));
					}

					bxArticle(gallery);

				//});
			});
		}

		drawArticleGallery($('.inner-gallery'));
		openPopupByHash();
	}

	function owlBx(thumbs) {
		var els = thumbs.find('.article__thumbs-item').length;
		return thumbs.owlCarousel({
			margin: 12,
			items: 5,
			responsiveClass:true,
			responsive: {
				320: {
					loop: (els > 1) ? true : false,
					stagePadding: (els > 2) ? 85 : 0,
					items:1
				},
				767: {
					loop: (els > 3) ? true : false,
					stagePadding: (els > 3) ? 85 : 0,
					items: 3
				},
				991: {
					loop: (els > 4) ? true : false,
					stagePadding: (els > 4) ? 85 : 0,
					items: 4
				}
			},
			itemMobile: false
		});
	}

	$(document).on('click', '.article__slide_video', function() {
		$(document).unbind('scroll.mainPlayer');
		var mainPlayer = $('.player');

		var $this = $(this),
			parent = $this.closest('.article-wrap'),
			sliderWrap = $this.closest('.article__bx-slider-wrap'),
			otherSliders = parent.find('.article__bx-slider-wrap'),
			videoSrc = $this.data('video-src'),
			otherPlayers = parent.find('.brand__player');

		mainPlayer.remove();
		otherSliders.removeClass('active');
		sliderWrap.addClass('active');
		otherPlayers.remove();

		var
				player = $('<div/>', {
					class: 'brand__player'
				}),
				playerWrap = $('<div/>', {
					class: 'brand__player-wrap'
				}),
				playerInner = $('<div/>', {
					class: 'brand__player-inner'
				});
		var frame = $('<iframe ' +
				'		webkitallowfullscreen="true" ' +
				'		mozallowfullscreen="true" ' +
				'		allowfullscreen="true" ' +
				'		src="' + videoSrc + '"' +
				'		frameborder="0" ' +
				'		scrolling="no">' +
				'		style="border:none;"' +
				'		</iframe>');

		frame.appendTo(playerInner);
		playerInner.appendTo(playerWrap);
		playerWrap.appendTo(player);
		player.appendTo(sliderWrap);
		$(window).on('scroll.articleSticky', stickyArticlePlayer);
	});

	// страница ТВ-программ
	if( $('.tvprogram__list').length ) {
		$('.tvprogram__list').masonry({
			itemSelector: '.grid-item',
			columnWidth: 319
		});
	}

	// страница персоны алфавит
	if( $('.persons__list').length ) {
		$('.persons__list').masonry({
			itemSelector: '.grid-item',
			columnWidth: 319
		});
	}

	// слайдер главной
	if ( $('.program__slider').length > 0) {
		var bxProgram = $('.program__slider').bxSlider({
			auto: true,
			controls: false
		});

		$('.program__slider-btn_next').on('click', function() {
			bxProgram.goToNextSlide();
		});

		$('.program__slider-btn_prev').on('click', function() {
			bxProgram.goToPrevSlide();
		});
	}

	// фиксированное меню
	var lastScrollTop = 0;
	$(document).on('scroll', function(){
		var
				mainMenu = $('.main-menu'),
				mainMenuBot = mainMenu.offset().top + mainMenu.height(),
				st = $(this).scrollTop(),
				fm = $('.fixed-menu'),
				videoArchivePlayer = $('.video-archive__player'),
				alphabetList = $('.alphabet__list-wrap'),
				articleSlider = $('.article__bx-slider-wrap.active'),
				schedule = $('.schedule');

		if ( videoArchivePlayer.length ) {
			var
					subMenu = $('.fixed-menu__sub-menu'),
					archiveBottom = videoArchivePlayer.offset().top + videoArchivePlayer.height();
			subMenu.addClass('hidden');
		}

		if ( st > mainMenuBot ) {
			if ( videoArchivePlayer.length ) {
				if ( st > archiveBottom ) {
					subMenu.removeClass('hidden');
				} else {
					subMenu.addClass('hidden');
				}
			}

			fm.addClass('active');
			if ( $('.sub-menu__list').length ) {
				fm.addClass('active-sub-menu')
			}

			if ( alphabetList.length ) {
				if ( (st + fm.outerHeight()) >= $('.tvprogram').offset().top ) {
					fm.addClass('active-alphabet');
					alphabetList.css('top',fm.outerHeight());
				}
			}

			if ( schedule.length ) {
				var channelSchedule = $('.channel__schedule');
				if ( (st + fm.outerHeight()) >= channelSchedule.offset().top ) {
					fm.addClass('active-schedule');
					schedule.css({
						top: fm.outerHeight(),
						left: channelSchedule.offset().left
					});
				}
			}
		} else {
			fm.removeClass('active');
			if ( $('.sub-menu__list').length ) {
				fm.removeClass('active-sub-menu')
			}

			if ( articleSlider.length ) {
				var player = $('.brand__player-wrap.fixed');
				if ( player.length ) {
					player.css('top', mainMenuBot + 5 - st);
				}
			}
		}


		if ( alphabetList.length ) {
			if ( st + fm.outerHeight() + $('.alphabet__list-wrap').height() < $('.tvprogram__heading').offset().top + 15 ) { // 15 - margin-bottom .alphabet__list
				fm.removeClass('active-alphabet');
				alphabetList.css('top', 'auto');
			}
		}

		if ( schedule.length ) {
			if ( (st + fm.outerHeight()) < $('.channel__schedule').offset().top ) {
				fm.removeClass('active-schedule');
				schedule.css({
					top: 'auto',
					left: 'auto'
				});
			}
		}
		lastScrollTop = st;
	});

	// читать весь текст Бренд, программа
	if ( $('.brand__fully-link').length ) {
		$('.brand__fully-link').on('click', function(e){
			e.preventDefault();
			var
					$this = $(this),
					parent = $this.closest('.brand__anons'),
					textBlock = parent.find('.brand__anons-text');

			textBlock.css({height: 'auto'});
			$this.hide();
		} );
	}

	// owl превью видеоархива
	if ( $('.video-archive__slider').length ) {

		function videoarchivePreview() {
			$('.video-archive__slider').slick({
				autoplay: true,
				autoplaySpeed: 7000,
				centerMode: true,
				infinite: true,
				centerPadding: 0,
				variableWidth: true,
				dots: true,
				nextArrow: '<button type="button" class="slick-next"></button>',
				prevArrow: '<button type="button" class="slick-prev"></button>'
			});
		}

		videoarchivePreview();
	}

	//подгрузка на страницах Бренд, Бренд фото, Плейлист
	var seriesBlock = $('.series');
	if ( seriesBlock.length && !seriesBlock.hasClass('series_without-load') ) {
		var listSeriesPage = getPageNumber(),
			seriesList = $('.series__list'),
			listSeriesPageUrl = seriesList.attr('data-page-url');
			currentPageUrl = listSeriesPageUrl;

		$(window).on('resize', function() {
			return setPageParams(seriesList, '.series__item');
		});

		var btnMoreSeries = $('.more-btn');
		function loadNextSeries() {
			$(window).unbind('scroll.loadSeries');
			var
				loader = $('.news__loader'),
				moreBtn = $('.more-btn__wrap');
			moreBtn.hide();
			loader.show();

			listSeriesPage++;
			// тут должна быть ajax подргузка
			var
				newEl = $($('#tmp-series').html());
			if ( $(newEl).filter('.series__item').length < 1 ) {
				loader.hide();
				return false;
			}

			// setTimeout удалить
			setTimeout(function() {
				$(newEl).attr('data-page-url', listSeriesPageUrl + '/page/' + listSeriesPage).css('display', 'none');
				$(newEl).appendTo('.series__list').fadeIn('slow');
				$(window).bind('scroll.loadSeries', bindScrollSeries);
				loader.hide();
				moreBtn.show();
				setPageParams(seriesList, '.series__item');
			}, 1000);

			return true;
		}

		function bindScrollSeries(){
			var
				st = $(window).scrollTop(),
				seriesBottom = btnMoreSeries.offset().top + btnMoreSeries.height();

			if (st + $(window).height() >=  seriesBottom) {
				loadNextSeries();
			}
		}

		$(window).on('scroll.loadSeries', bindScrollSeries);
	}

	var wrapMoreSeries = $('.more-btn__wrap_series');
	if ( wrapMoreSeries.length && !seriesBlock.length ) {
		wrapMoreSeries.css('opacity', 0);
	}

	//подгрузка на странице Новости-2, Бренд новости, Результат поиска
	if ( $('.subject-news__list').length ) {
		var listNewsPage = getPageNumber(),
			newsList = $('.subject-news__list'),
			listNewsPageUrl = newsList.attr('data-page-url');
			currentPageUrl = listNewsPageUrl;

		$(window).on('resize', function() {
			return setPageParams(newsList, '.subject-news__item');
		});

		var btnSubjectMore = $('.more-btn');
		function loadNextNews() {
			$(window).unbind('scroll.next');

			var
					loader = $('.news__loader'),
					moreBtn = $('.more-btn__wrap');
			moreBtn.hide();
			loader.show();

			listNewsPage++;
			// тут должна быть ajax подргузка
			var
				newEl = $($('#tmp-series').html());

			if ( $(newEl).filter('.subject-news__item').length < 1 ) {
				loader.hide();
				return false;
			}

			// setTimeout удалить
			setTimeout(function() {
				$(newEl).attr('data-page-url', listNewsPageUrl + 'page/' + listNewsPage).css('display', 'none');
				$(newEl).css('display', 'none');
				$(newEl).appendTo('.subject-news__list').fadeIn('slow');
				$(window).bind('scroll.next', bindScrollNews);
				loader.hide();
				moreBtn.show();
				setPageParams(newsList, '.subject-news__item');
			}, 1000);

			return true;
		}

		function bindScrollNews(){
			var st = $(window).scrollTop(),
				bottom = btnSubjectMore.offset().top + btnSubjectMore.height();

			if( st + $(window).height() >=  bottom ) {
				loadNextNews();
			}
		}

		$(window).on('scroll.next', bindScrollNews);
	}

	var enableStickyPlayer = true;
	function stickyPlayer(){
		if ( $(window).width() < 768 || enableStickyPlayer === false) return;
		if ( $('.article-wrap').length ) return;

		var
				st = $(window).scrollTop(),
				player = $('.brand__player'),
				playerBottom = player.outerHeight() + player.offset().top,
				wrap = $('.brand__player-wrap'),
				playerLine = playerBottom - playerBottom * 0.25;
		if (st >=  playerLine) {
			wrap
					.addClass('fixed')
					.css({
						width: player.width() / 2
					});
			wrap.addClass('fixed_visible');
		} else {
			wrap
					.removeClass('fixed')
					.removeClass('fixed_visible')
					.css({
						width: 'auto'
					});
		}
	}

	function stickyArticlePlayer() {
		if ( $(window).width() < 768 || enableStickyPlayer === false ) return;
		if ( $('.article-wrap').length < 1 ) return;
		var playerWrap = $('.article__bx-slider-wrap.active');
		if ( playerWrap.length < 1 ) return;
		var player = playerWrap.find('.brand__player');
		if ( player.length < 1 ) return;

		var
				st = $(window).scrollTop(),
				playerBottom = player.outerHeight() + player.offset().top,
				wrap = $('.brand__player-wrap'),
				playerLine = playerBottom - player.outerHeight() * 0.25,
				playerLineTop = player.offset().top - $(window).height() + player.outerHeight() * 0.25;

		if (st >=  playerLine || st < playerLineTop) {
			wrap
					.addClass('fixed')
					.css({
						width: player.width() / 2
					});
			wrap.addClass('fixed_visible');
		} else {
			wrap
					.removeClass('fixed')
					.removeClass('fixed_visible')
					.css({
						width: 'auto'
					});
		}
	}

	function mainStickyPlayer() {
		var player = $('.player');
		if ( player.length < 1 ) return;
		if ( $(window).width() < 768 || enableStickyPlayer === false ) return;
		var classes = '';
		var submenu = $('.fixed-menu__sub-menu');

		if ( fixedMenu.hasClass('active') ) {
			if ( fixedMenu.hasClass('active-sub-menu') && submenu.not('.hidden').length ) classes += 'fixed_sub-menu';
			if ( fixedMenu.hasClass('active-alphabet') ) classes += ' fixed_alphabet';

			player.addClass('fixed');
			setTimeout(function() {
				player.addClass('fixed_visible');
				player.addClass(classes);
				if ( submenu.length && submenu.hasClass('hidden') ) player.removeClass('fixed_sub-menu');
			}, 1);
		} else {
			player.removeClass('fixed fixed_visible fixed_sub-menu fixed_alphabet');
		}
	}

	function drawMainPlayer() {
		var headerInner = $('.header__inner .container'),
			player = $('<div/>', {
				class: 'player'
			}),
			playerInner = $('<div/>', {
				class: 'player__inner'
			}),
			frame = $('<iframe ' +
				'		webkitallowfullscreen="true" ' +
				'		mozallowfullscreen="true" ' +
				'		allowfullscreen="true" ' +
				'		src="//www.tvc.ru/channel/onairiframe/mute/true"' +
				'		frameborder="0" ' +
				'		scrolling="no">' +
				'		style="border:none;"' +
				'		</iframe>');

		frame.appendTo(playerInner);
		playerInner.appendTo(player);
		$('<button/>', {class:'player__close'}).html('\&#215;').appendTo(playerInner);
		player.appendTo(headerInner);
	}

	if ( (!$('.brand__player').length && !$('.channel__inner').length) || $('.article-wrap').length ) {
		drawMainPlayer();
		mainStickyPlayer();
		$(document).on('scroll.mainPlayer', mainStickyPlayer);
	}

	// Брэнд - видео при скролле
	if ( $('.brand__player-wrap').length ) {
		$(window).on('scroll', stickyPlayer);
		stickyPlayer();
	}

	// Брэнд фото слайдеры
	var brandPhotoSlick = $('.brand__photo-slider');

	if ( brandPhotoSlick.length ) {
		function changeBrandPhotoUrl(url) {
			location.hash = url;
		}

		function getSliderIndexByHash () {
			var pid = getHashValue('pid');
			if (!pid) return null;
			var el = $('.brand__photo-slider').find('div[data-pid="'+pid+'"]');
			return el.index();
		}

		brandPhotoSlick.on('init', function(e, slick) {
					$('.brand__photo-slider .slick-active').find('img').on('load', function() {
						$(window).trigger('resize');
					});
				}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
					var pid = $(slick.$slides.get(nextSlide)).data('pid');
					changeBrandPhotoUrl('pid=' + pid);
				}).on('afterChange', function(event, slick, currentSlide) {
					$('.brand__photo-slider').slick('refresh');
				});

		brandPhotoSlick.slick({
			nextArrow: '<span class="brand__slider-btn brand__slider-btn_next"></span>',
			prevArrow: '<span class="brand__slider-btn brand__slider-btn_prev"></span>',
			slidesToShow: 1,
			slidesToScroll: 1,
			lazyLoad: 'ondemand',
			fade: true,
			asNavFor: '.brand__thumb-slider',
			adaptiveHeight: true,
			responsive: [
				{
					breakpoint: 500,
					settings: {
						arrows: false
					}
				}
			],
			initialSlide: (function() {
				if ( location.hash ) {
					var brandSliderIndex = getSliderIndexByHash();
					return brandSliderIndex ? brandSliderIndex : 0
				}
				return 0;
			}())
		});

		function omitTransform(otElem) {
			var trackElem = $(otElem).find('.slick-track');
			var slides = trackElem.find('.slick-slide').not('.slick-cloned');
			var $windowWidth = $(window).width();
			if ($windowWidth < 520 && slides.length < 2) {
				trackElem.addClass('brand__thumb-stop');
			} else if ($windowWidth < 768 && $windowWidth >=520 && slides.length < 4) {
				trackElem.addClass('brand__thumb-stop');
			} else if ($windowWidth < 992 && $windowWidth >= 768 && slides.length < 5) {
				trackElem.addClass('brand__thumb-stop');
			} else if ($windowWidth < 1130 && $windowWidth >= 992 && slides.length < 7) {
				trackElem.addClass('brand__thumb-stop');
			} else if ($windowWidth < 1291 && $windowWidth >= 1130 && slides.length < 8) {
				trackElem.addClass('brand__thumb-stop');
			} else if ($windowWidth >= 1291 && slides.length < 9) {
				trackElem.addClass('brand__thumb-stop');
			} else {
				trackElem.removeClass('brand__thumb-stop');
			}
		}

		$('.brand__thumb-slider').on('init', function() {
			omitTransform(this);
		}).slick({
			slidesToShow: 8,
			swipeToSlide: true,
			lazyLoad: 'ondemand',
			asNavFor: '.brand__photo-slider',
			dots: false,
			focusOnSelect: true,
			arrows: false,
			responsive: [
				{
					breakpoint: 1291,
					settings: {
						slidesToShow: 7
					}
				},
				{
					breakpoint: 1130,
					settings: {
						slidesToShow: 6
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 520,
					settings: {
						slidesToShow: 1,
						centerMode: true,
						centerPadding: '20%'
					}
				}
			]
		});
	}

	// вставка плеера в tvchannel по клику на блок с прямым эфиром
	if ( $('.channel__inner').length ) {
		$('.channel__inner').on('click', function() {
			if ( $(this).hasClass('active') ) return;
			var
					pagePlayer = $('.channel__inner'),
					player = $('<div/>', {
						class: 'brand__player'
					}),
					playerWrap = $('<div/>', {
						class: 'brand__player-wrap'
					}),
					playerInner = $('<div/>', {
						class: 'brand__player-inner'
					}),
					frame = $('<iframe ' +
					'		webkitallowfullscreen="true" ' +
					'		mozallowfullscreen="true" ' +
					'		allowfullscreen="true" ' +
					'		src="http://www.tvc.ru/channel/onairiframe" ' +
					'		frameborder="0" ' +
					'		scrolling="no">' +
					'		style="border:none;"' +
					'		</iframe>');

			$('<button/>', {class:'brand__player-close'}).html('\&#215;').appendTo(playerInner);
			frame.appendTo(playerInner);
			playerInner.appendTo(playerWrap);
			playerWrap.appendTo(player);

			pagePlayer
					.addClass('active')
					.html(player);

			stickyPlayer();
			$(window).on('scroll', stickyPlayer);
		});
	}

	function detectIE() {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}
		return false;
	}

	if ( detectIE() ) {
		$('html').addClass('ie');
	}

	// подгрузка новости в статье
	if ( $('.article-wrap').length ) {
		var
			btnMoreArticle = $('.article__outer').last().find('.more-btn'),
			articleList = $('.article-wrap'),
			articleListUrl = articleList.attr('data-page-url');
			currentPageUrl = articleListUrl;

		var articlePage = 1; // на продакшене удалить, строка нужна для эмуляции

		$(window).on('resize', function() {
			return setPageParams(articleList, '.article__outer');
		});

		function loadNextArticle() {
			$(window).unbind('scroll.article');
			btnMoreArticle = null;

			var
					loader = $('.news__loader'),
					moreBtn = $('.more-btn__wrap');
			moreBtn.hide();
			loader.show();

			articlePage++; // на продакшене удалить, строка нужна для эмуляции
			// тут должна быть ajax подргузка
			var
					newEl = $($('#template-article').html());

			if ( $(newEl).filter('.article__outer').length < 1 ) {
				loader.hide();
				return false;
			}


			// setTimeout удалить
			setTimeout(function() {
				$(newEl)
						.attr('data-page-url', articleListUrl + 'page/' + articlePage) // на продакшене удалить, строка нужна для эмуляции
						.css('display', 'none').appendTo('.article-wrap').fadeIn('slow', function() {
					if( $(newEl).find('.inner-gallery').length > 0 ) {
						var
								gallery = $('.inner-gallery').last();
						drawArticleGallery(gallery);
					}
				});
				if ( $(newEl).find('.article__text-slider').length > 0) {
					var slider = $('.article__text-slider').last();
					slider.bxSlider({
						auto: true,
						controls: false
					});
				}
				$(window).bind('scroll.article', bindScrollArticle);
				loader.hide();
				moreBtn.show();
				btnMoreArticle = $('.article__outer').last().find('.more-btn');
				setPageParams(articleList, '.article__outer');
			}, 1000);

			return true;
		}

		function bindScrollArticle(){
			var
					st = $(window).scrollTop(),
					article = $('.article-wrap'),
					articleBottom = btnMoreArticle.offset().top + btnMoreArticle.height();

			if (st + $(window).height() >=  articleBottom) {
				loadNextArticle();
			}
		}

		$(window).on('scroll.article', bindScrollArticle);
	}

	var wrapMoreArticle = $('.more-btn__wrap');
	if ( $('.article__content').length && !$('.article').length && wrapMoreArticle.length ) {
		wrapMoreArticle.css('opacity', 0);
	}

	// Подгрузка текстовой трансляции
	if ( $('.text-translation__wrap').length ) {
		var btnTextMore = $('.more-btn'),
			textTranslationPage = getPageNumber(),
			textTranslationList = $('.text-translation__wrap'),
			textTranslationListUrl = textTranslationList.attr('data-page-url');
			currentPageUrl = textTranslationListUrl;

		$(window).on('resize', function() {
			return setPageParams(textTranslationList, '.text-translation');
		});

		function loadNextTranslation() {
			$(window).unbind('scroll.nextTranslation');

			var
					loader = $('.news__loader'),
					moreBtn = $('.more-btn__wrap');
			moreBtn.hide();
			loader.show();

			textTranslationPage++;
			// тут должна быть ajax подргузка
			var
					newEl = $('#test-template').html();

			if ( $(newEl).filter('.text-translation').length < 1 ) {
				loader.hide();
				return false;
			}

			// setTimeout удалить
			setTimeout(function() {
				$(newEl)
						.attr('data-page-url', textTranslationListUrl + 'page/' + textTranslationPage)
						.css('display', 'none')
						.appendTo('.text-translation__wrap')
						.fadeIn('slow');
				$(window).bind('scroll.nextTranslation', bindScrollTranslation);
				loader.hide();
				moreBtn.show();
				setPageParams(textTranslationList, '.text-translation');
			}, 1000);

			return true;
		}

		function bindScrollTranslation(){
			var st = $(window).scrollTop(),
				bottom =  btnTextMore.offset().top + btnTextMore.height();

			if( st + $(window).height() >=  bottom ) {
				loadNextTranslation();
			}
		}

		$(window).on('scroll.nextTranslation', bindScrollTranslation);
	}

	if ( $('.channel__player-blur').length ) {
		$('.channel__player-blur').trigger('click');
	}

	if ( $('.video-archive__player-blur').length ) {
		$('.video-archive__player-blur').trigger('click');
	}

	if ( $('.video-archive__preview-warp').length ) {
		function setOffsetVideoPreview() {
			var wrap = $('.video-archive__preview-warp');
			wrap.css({
				bottom: -(wrap.height()*0.75)
			});
		}

		setOffsetVideoPreview();
		$(window).resize(setOffsetVideoPreview);
	}

	// подцветка символов алфавита при скролле
	if ( $('.tracked').length) {
		var waypLis = $('.alphabet__symbol');
		var itemQueue = [];
		var queueTimer;

		$('.tracked').waypoint(function(dir) {
			var waypHash = $(this.element).attr('id');
			waypLis.children('a').removeClass('active');
			$(this).children('a').addClass('active');

			window.clearTimeout(queueTimer);

			$.each( waypLis, function() {
				var elHref = $(this).children('a').attr('href').slice(1);
				if( elHref == waypHash ) {
					itemQueue.push($(this).children('a'));
					queueTimer = setTimeout(function() {
						if ( itemQueue.length ) {
							$(itemQueue.shift()).addClass('active');
							itemQueue = [];
						}
					}, 1);
				}
			});
		}, {
			offset: $(window).width() < 1290 ? '40%' : '30%'
		});
	}

	$(document).on('click', '.brand__player-close', function() {
		enableStickyPlayer = false;
		$(this).closest('.brand__player-wrap').removeClass('fixed fixed_visible').css('width', 'auto');
	});

	$(document).on('click', '.player__close', function() {
		enableStickyPlayer = false;
		$(this).closest('.player').removeClass('fixed fixed_visible fixed_sub-menu fixed_alphabet');
	});
});