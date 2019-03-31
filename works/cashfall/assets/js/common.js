$(function (){
	$('.wrapper').fullpage({
		scrollingSpeed: 1000,
		verticalCentered: ($(window).width() < 1200)
							|| $('.not-found').length ? true : false
		//scrollBar: true
	});

	var
			section2 = $('.section_2'),
			browserLogo = $('.logo-wrapper_browser'),
			browserBg = $('.browser__bg'),
			extention = $('.extention'),
			searchText = $('.extention__search-text'),
			searchAli = $('.extention__search-ali'),
			extItem1 = $('.extention__item_1'),
			extItem2 = $('.extention__item_2'),
			extItemAli = $('.extention__item_ali'),
			browserAli = $('.browser__ali'),
			browserCashfall = $('.browser__cashfall'),
			browserBrands = $('.browser__brands'),
			extAliName = $('.extention__item-name_ali'),
			demoLeft1 = $('.demo__left-1'),
			demoLeft2 = $('.demo__left-2'),
			demoLeft3 = $('.demo__left-3'),
			demoLeft4 = $('.demo__left-4'),
			logoArrow = $('.logo__arrow-wrap'),
			logoDollar = $('.logo__dollar-wrap'),
			toDown = $('.to-down');

	if ( toDown.length ) {
		toDown.on('click', function() {
			$.fn.fullpage.moveSectionDown();
		});
	}

	if ( section2.length ) {
		// смена бэкграунда на сиреневый
		setTimeout(function () {
			section2.addClass('bg-purple');
			section2.removeClass('bg-green');
			section2.removeClass('bg-blue');
			demoLeft2.addClass('show');
			demoLeft1.addClass('hide');
			demoLeft3.addClass('hide');
			demoLeft4.addClass('hide');
			demoLeft1.removeClass('show');
			demoLeft3.removeClass('show');
			demoLeft4.removeClass('show');
			setInterval(function () {
				section2.addClass('bg-purple');
				demoLeft1.addClass('hide');
				demoLeft3.addClass('hide');
				demoLeft4.addClass('hide');
				section2.removeClass('bg-green');
				section2.removeClass('bg-blue');
				demoLeft1.removeClass('show');
				demoLeft3.removeClass('show');
				demoLeft4.removeClass('show');
				demoLeft2.addClass('show');
			}, 30000);
		}, 5000);

		// смена бэкграунда на зеленый
		setTimeout(function () {
			section2.addClass('bg-green');
			section2.removeClass('bg-blue');
			section2.removeClass('bg-purple');
			demoLeft3.addClass('show');
			demoLeft1.addClass('hide');
			demoLeft2.addClass('hide');
			demoLeft4.addClass('hide');
			demoLeft1.removeClass('show');
			demoLeft2.removeClass('show');
			demoLeft4.removeClass('show');
			setInterval(function () {
				section2.addClass('bg-green');
				section2.removeClass('bg-blue');
				section2.removeClass('bg-purple');
				demoLeft1.removeClass('show');
				demoLeft2.removeClass('show');
				demoLeft4.removeClass('show');
				demoLeft1.addClass('hide');
				demoLeft2.addClass('hide');
				demoLeft4.addClass('hide');
				demoLeft3.addClass('show');
			}, 30000);
		}, 15000);

		// смена бэкграунда на голубой
		setTimeout(function () {
			section2.addClass('bg-blue');
			section2.removeClass('bg-green');
			section2.removeClass('bg-purple');
			demoLeft4.addClass('show');
			demoLeft1.addClass('hide');
			demoLeft2.addClass('hide');
			demoLeft3.addClass('hide');
			demoLeft1.removeClass('show');
			demoLeft2.removeClass('show');
			demoLeft3.removeClass('show');
			setInterval(function () {
				section2.addClass('bg-blue');
				section2.removeClass('bg-purple');
				section2.removeClass('bg-green');
				demoLeft1.addClass('hide');
				demoLeft2.addClass('hide');
				demoLeft3.addClass('hide');
				demoLeft1.removeClass('show');
				demoLeft2.removeClass('show');
				demoLeft3.removeClass('show');
				demoLeft4.addClass('show');
			}, 30000);
		}, 20000);

		setInterval(function () {
			section2.removeClass('bg-blue');
			section2.removeClass('bg-purple');
			section2.removeClass('bg-green');
			demoLeft1.removeClass('show');
			demoLeft2.removeClass('show');
			demoLeft3.removeClass('show');
			demoLeft4.removeClass('show');
			demoLeft1.removeClass('hide');
			demoLeft2.removeClass('hide');
			demoLeft3.removeClass('hide');
			demoLeft4.removeClass('hide');
			browserLogo.removeClass('hide');
		}, 30000);

		// лого загрузки и бэкграунд браузера
		setTimeout(function () {
			browserLogo.addClass('hide');
			browserBg.addClass('show');

			setInterval(function () {
				browserLogo.addClass('hide');
			}, 30000);

			setTimeout(function () {
				browserBg.removeClass('show');
				setInterval(function () {
					browserBg.removeClass('show');
				}, 30000);
			}, 10000);
			setInterval(function () {
				browserBg.addClass('show');
			}, 30000);
		}, 5000);

		// окошко с расширением
		setTimeout(function () {
			extention.addClass('show');
			setTimeout(function () {
				extention.removeClass('show');
				setInterval(function () {
					extention.removeClass('show');
				}, 30000);
			}, 10000);
			setInterval(function () {
				extention.addClass('show');
			}, 30000);
		}, 5000);

		// строка поиска
		setTimeout(function () {
			searchText.addClass('hide');
			searchAli.addClass('show');
			setTimeout(function () {
				setTimeout(function () {
					searchText.removeClass('hide');
					searchAli.removeClass('show');
				}, 1000);
				setInterval(function () {
					setTimeout(function () {
						searchText.removeClass('hide');
						searchAli.removeClass('show');
					}, 1000);
				}, 30000);
			}, 8000);
			setInterval(function () {
				searchText.addClass('hide');
				searchAli.addClass('show');
			}, 30000);
		}, 7000);

		// результаты поиска в браузере
		setTimeout(function () {
			extItem1.addClass('hide');
			extItem2.addClass('hide');
			extItemAli.addClass('show');
			setTimeout(function () {
				setTimeout(function () {
					extItem1.removeClass('hide');
					extItem2.removeClass('hide');
				}, 1000);
				setTimeout(function () {
					extItemAli.removeClass('show');
				}, 1500);
				setInterval(function () {
					setTimeout(function () {
						extItem1.removeClass('hide');
						extItem2.removeClass('hide');
					}, 1000);
					setTimeout(function () {
						extItemAli.removeClass('show');
					}, 1500);
				}, 30000);
			}, 6500);
			setInterval(function () {
				extItem1.addClass('hide');
				extItem2.addClass('hide');
				extItemAli.addClass('show');
			}, 30000);
		}, 8500);

		// Ввод aliexpress в окно поиска
		setTimeout(function () {
			extAliName.addClass('click');
			setTimeout(function () {
				setTimeout(function () {
					extAliName.removeClass('click');
				}, 1000);
				setInterval(function () {
					setTimeout(function () {
						extAliName.removeClass('click');
					}, 1000);
				}, 30000);
			}, 2500);
			setInterval(function () {
				extAliName.addClass('click');
			}, 30000);
		}, 13500);

		// бэкграунд али
		setTimeout(function () {
			browserAli.addClass('show');
			setTimeout(function () {
				browserAli.removeClass('show');
				setInterval(function () {
					browserAli.removeClass('show');
				}, 30000);
			}, 5000);
			setInterval(function () {
				browserAli.addClass('show');
			}, 30000);
		}, 15000);

		// cashfall в браузере на экране с али
		setTimeout(function () {
			browserCashfall.addClass('show');
			setTimeout(function () {
				browserCashfall.removeClass('show');
				setInterval(function () {
					browserCashfall.removeClass('show');
				}, 30000);
			}, 3000);
			setInterval(function () {
				browserCashfall.addClass('show');
			}, 30000);
		}, 17000);

		// брэнды в браузере
		setTimeout(function () {
			browserBrands.addClass('show');
			setTimeout(function () {
				browserBrands.removeClass('show');
				setInterval(function () {
					browserBrands.removeClass('show');
				}, 30000);
			}, 10000);
			setInterval(function () {
				browserBrands.addClass('show');
			}, 30000);
		}, 20000);
	}

	if ( logoArrow.length ) {
		// Пауза для анимации лого
		logoArrow.addClass('active');
		logoDollar.addClass('active');
		setTimeout(function() {
			logoArrow.removeClass('active');
			logoDollar.removeClass('active');
		}, 7500);
		setInterval(function() {
			logoArrow.addClass('active');
			logoDollar.addClass('active');
			setTimeout(function() {
				logoArrow.removeClass('active');
				logoDollar.removeClass('active');
			}, 7500);
		}, 9500);
	}
});

$(document).scroll(function() {
	(function(){
		var
			sale1 = $('.sale_left'),
			sale2 = $('.sale_right'),
			wScroll = $(window).scrollTop();
		//slideIt(sale1, wScroll / 10, 'top');
		//slideIt(sale2, wScroll / 10, 'bottom');

		function slideIt(block, strafeAmount, direction) {
			var symbol = '';
			if (direction === 'top') symbol = '-';
			if (direction === 'bottom') symbol = '+';

			var
				strafe = symbol + strafeAmount + '%',
				transormString = 'translate3d(0,' + strafe + ',0)';

			block.css({
				'transform' : transormString
			});
		}
	}());
});