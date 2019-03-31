$(function() {
    var parallax = $('.parallax-image');
    var last = $('.last');
    var dev = $('.development');
    var remedy = $('.remedy');
    var remedyBg = $('.remedy__bg');
    var rotateImg = $('.development__image_1');
    var $window = $(window);
    var $document = $(document);
    var $bodyHeight = $('body').height();
    var avantImg = $('.avant__img-wrap');
    var circle = $('.avant__circle-wrap');
    var isSafari = ( /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) ? true : false;

    function parallaxInit() {
        if ($window.width() < 769) return;
        var st = $document.scrollTop();
        var sp = last.offset().top - $window.height();
        var ob = dev.offset().top;
        var sr = st-sp;
        var remedyTop = remedyBg.offset().top - $window.height();
        var sr2 = st - remedyTop;
        var devTop = dev.offset().top - $window.height();

        if(st > 0 && st < last.offset().top) {
            avantImg.css({
                "transform" : "translate3d(0px, " + st /30 + "%, .01px)",
                "-webkit-transform" : "translate3d(0px, " + st /30 + "%, .01px)"
            });
            circle.css({
                "transform" : "translate3d(0px, -" + st /30 + "%, .01px)",
                "-webkit-transform" : "translate3d(0px, -" + st /30 + "%, .01px)"
            });
        }

        if(st >= sp && st <= ob) {
            if ( !isSafari ) {
                parallax.css({
                    "transform" : "translate3d(0px, " + sr /30 + "%, .01px)",
                    "-webkit-transform" : "translate3d(0px, " + sr /30 + "%, .01px)"
                });
            }
        }

        if (st >= remedyTop) {
            remedyBg.css({
                "transform" : "translate3d(0px, -" + sr2 /25 + "%, .01px)",
                "-webkit-transform" : "translate3d(0px, -" + sr2 /25 + "%, .01px)"
            });
        }

        if (st >= devTop && st < dev.offset().top) {
            rotateImg.css({
                'transform': 'rotate(-' + (st / $bodyHeight * 360) + 'deg)'
            });
        }
    }

    parallaxInit();

    $(window).on('scroll resize', function() {
        parallaxInit();
    });
});