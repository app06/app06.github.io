$(function() {
	function parallaxBanner() {
		if ( $(window).width() < 993 ) return;

		var bannerBlock = $('.top');
		var banner = $('.parallax-banner');
		var pheight = bannerBlock.height();

		var st = $(document).scrollTop();
		var sp = banner.offset().top - $(window).height();
		var ob = banner.offset().top + pheight;
		var speed = 30;

		if(st >= sp && st <= ob) {
			banner.css({
				"transform" : "translate3d(0px, -" + st / speed + "%, .01px)",
				"-webkit-transform" : "translate3d(0px, -" + st / speed + "%, .01px)"
			});
		}
	}

	var parallaxInner = $('.parallax__inner');

	function parallaxInit() {
		if ( $(window).width() < 769 ) {
			parallaxInner.css({
				"transform" : "translate3d(0px, 0%, 0)",
				"-webkit-transform" : "translate3d(0px, 0%, 0)"
			});
			return;
		}

		$('.parallax').each(function() {
			var $this = $(this);
			var pheight = $this.outerHeight();

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

	parallaxBanner();
	parallaxInit();

	$(window).on('scroll resize',function() {
		parallaxBanner();
		parallaxInit();
	});

	new WOW({mobile: false}).init();
});