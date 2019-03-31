$(function() {
	var spaceSeparator = $.animateNumber.numberStepFactories.separator(' ');

	$('.promo__menu-btn').on('click', function() {
		$(this).add('.menu__list').toggleClass('active');
	});

	$('.start').waypoint(function(dir) {
		var $num = $('.start__num');
		if (dir === "down" && !$num.hasClass('compiled')) {
			$('.start__num_client').animateNumber({
				number: 912
			}, 1000, function () {$num.addClass('compiled')});
			$('.start__num_project').animateNumber({
				number: 12012,
				numberStep: spaceSeparator
			}, 1000, function () {$num.addClass('compiled')});
			$('.start__num_point').animateNumber({
				number: 9012,
				numberStep: spaceSeparator
			}, 1000, function () {$num.addClass('compiled')});
		}
	}, {offset: '100%' });

	$(document).on('click', '.menu__link', function (event) {
		event.preventDefault();

		$('.promo__menu-btn, .menu__list').removeClass('active');

		var id = $(this).attr('href'),
				top = $(id).offset().top;

		$('body, html').animate({
			scrollTop: top
		}, 500);
	});

	var parrallaxInner = $('.parallax__inner');

	function parallaxInit() {
		if ( $(window).width() < 769 ) {
			parrallaxInner.css({
				"transform" : "translate3d(0px, 0%, 0)",
				"-webkit-transform" : "translate3d(0px, 0%, 0)"
			});
			return;
		}

		$('.parallax').each(function() {
			var $this = $(this);
			var pheight = $this.height();

			var st = $(document).scrollTop();
			var sp = $this.offset().top;
			var ob = $this.offset().top + pheight;
			var sr = st-sp;
			var el = $this.find('.parallax__inner');
			var can = false;
			if ( pheight > $(window).height() ) {
				if (st + $(window).height() >= ob) {
					can = true;
					sr = st + $(window).height() - ob;
				}
			} else {
				if (st >= sp && st <= ob) can = true;
			}
			if(can) {
				el.css({
					"transform" : "translate3d(0px, " + sr /20 + "%, 0)",
					"-webkit-transform" : "translate3d(0px, " + sr /20 + "%, 0)"
				});
			} else {
				el.css({
					"transform" : "translate3d(0px, 0%, 0)",
					"-webkit-transform" : "translate3d(0px, 0%, 0)"
				});
			}
		});
	}

	parallaxInit();

	$(window).scroll(function() {
		parallaxInit();
	});

	$("*").resize(function() {
		parallaxInit();
	});
});