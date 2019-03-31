jQuery(document).ready(function(){

	"use strict";

	arlo_tm_responsive();
	arlo_tm_list_height();
	arlo_tm_portfolio();
	arlo_tm_anchor();
	arlo_tm_animate_text();
	arlo_tm_totop();
	arlo_tm_totop_myhide();
	arlo_tm_ripple();
	arlo_tm_switcher();
	arlo_tm_data_images();
	arlo_tm_hamburger();
	
	
	jQuery(window).on('scroll',function(){
		arlo_tm_totop_myhide();
	});
	
	jQuery(window).on('resize',function(){
		arlo_tm_responsive();
	});

	jQuery(function(){
		setTimeout(function(){
        	jQuery('.arlo_tm_preloader').addClass('loaded');
		}, 1000);
	});
});

// -----------------------------------------------------
// --------------------  FUNCTIONS  --------------------
// -----------------------------------------------------

// -----------------------------------------------------
// --------------    RESPONSIVE    ---------------------
// -----------------------------------------------------

function arlo_tm_responsive(){
	
	"use strict";
	
	var leftpart			= jQuery('.arlo_tm_leftpart_wrap');
	var rightpart			= jQuery('.arlo_tm_rightpart');
	var WW					= jQuery(window).width();
	
	if(WW<1040){
		leftpart.addClass('hide');
		rightpart.addClass('full');
	}else{
		leftpart.removeClass('hide');
		rightpart.removeClass('full');
	}
}

// -------------------------------------------------
// ---------    PERSONAL LIST HEIGHT    ------------
// -------------------------------------------------

function arlo_tm_list_height(){
	
	"use strict";
	
	var div			= jQuery('.about_short_contact_wrap');
	var list		= div.find('li:nth-of-type(2n)');
	
	list.after("<div class='clearfix'></div>");
}


// -------------------------------------------------
// -----------------    PORTFOLIO    ---------------
// -------------------------------------------------

// filterable 

function arlo_tm_portfolio(){

	"use strict";

	if(jQuery().isotope) {

		// Needed variables
		var list 		 = jQuery('.arlo_tm_portfolio_list');
		var filter		 = jQuery('.arlo_tm_portfolio_filter');

		if(filter.length){
			// Isotope Filter 
			filter.find('a').on('click', function(){
				var selector = jQuery(this).attr('data-filter');
				list.isotope({ 
					filter				: selector,
					animationOptions	: {
						duration			: 750,
						easing				: 'linear',
						queue				: false
					}
				});
				return false;
			});	

			// Change active element class
			filter.find('a').on('click', function() {
				filter.find('a').removeClass('current');
				jQuery(this).addClass('current');
				return false;
			});	
		}
	}
}


// -----------------------------------------------------
// ------------    ANCHOR NAVIGATION    ----------------
// -----------------------------------------------------

function arlo_tm_anchor(){
	
	"use strict";
	
	jQuery('.anchor_nav').onePageNav();
	
	var scrollOffset = 0;
	
	jQuery(".anchor a").on('click', function(evn){
		evn.preventDefault();
		jQuery('html,body').scrollTo(this.hash, this.hash, {
			gap: { y: -scrollOffset-85 },
			animation:{
				duration: 1500,
				easing: "easeInOutExpo"
			}
		});
		return false;	
	});
}

// -----------------------------------------------------
// --------------------    TOTOP    --------------------
// -----------------------------------------------------

function arlo_tm_totop(){
	
	"use strict";
	
	jQuery(".arlo_tm_totop").on('click', function(e) {
		e.preventDefault();		
		jQuery("html, body").animate({ scrollTop: 0 }, 'slow');
		return false;
	});
}

function arlo_tm_totop_myhide(){
	
	"use strict";
	
	var toTop		=jQuery(".arlo_tm_totop");
	if(toTop.length){
		var topOffSet 	=toTop.offset().top;
		
		if(topOffSet > 1000){
			toTop.addClass('opened');	
		}else{
			toTop.removeClass('opened');
		}
	}
}
// -------------------------------------------------
// -------------   ANIMATE TEXT  -------------------
// -------------------------------------------------

function arlo_tm_animate_text(){
	
	"use strict";
	
	var animateSpan			= jQuery('.arlo_tm_animation_text_word');
	
		animateSpan.typed({
			strings: ["Full stack", "Web разработчик"],
			loop: true,
			startDelay: 1e3,
			backDelay: 2e3
		});
}


// -------------------------------------------------
// -------------  RIPPLE  --------------------------
// -------------------------------------------------

function arlo_tm_ripple(){
	
	"use strict";
	
	jQuery('#ripple').ripples({
			resolution: 500,
			dropRadius: 20,
			perturbance: 0.04
		});
	jQuery('#ripple_testimonial').ripples({
			resolution: 500,
			dropRadius: 20,
			perturbance: 0.04
		});
}


// -----------------------------------------------------
// -----------------    SWITCHER    --------------------
// -----------------------------------------------------

function arlo_tm_switcher(){
	
	"use strict";
	
	var switcherOpener				= jQuery('.arlo_tm_resize');
	var switcherIcon				= jQuery('.arlo_tm_leftpart_wrap .arlo_tm_resize i');
	var leftPart					= jQuery('.arlo_tm_leftpart_wrap');
	var rightPart					= jQuery('.arlo_tm_rightpart');
	
	switcherOpener.on('click',function(){
		if(switcherOpener.hasClass('opened')){
			switcherOpener.removeClass('opened');
			switcherIcon.removeClass('opened');
			leftPart.removeClass('opened');
			rightPart.removeClass('opened');
		}else{
			switcherOpener.addClass('opened');
			switcherIcon.addClass('opened');
			leftPart.addClass('opened');
			rightPart.addClass('opened');
		}
		setTimeout(function(){jQuery('#ripple').ripples('updateSize');},101);
		setTimeout(function(){jQuery('#ripple').ripples('updateSize');},201);
		setTimeout(function(){jQuery('#ripple').ripples('updateSize');},301);

		return false;
	});
	

}

// -----------------------------------------------------
// ---------------   DATA IMAGES    --------------------
// -----------------------------------------------------

function arlo_tm_data_images(){
	
	"use strict";
	
	var data			= jQuery('*[data-img-url]');
	
	data.each(function(){
		var element			= jQuery(this);
		var url				= element.data('img-url');
		element.css({backgroundImage: 'url('+url+')'});
	});
}

// -----------------------------------------------------
// ---------------  HAMBURGER  -------------------------
// -----------------------------------------------------

function arlo_tm_hamburger(){
	
	"use strict";
	
	var hamburger 		= jQuery('.hamburger');
	var mobileMenu		= jQuery('.arlo_tm_mobile_menu_wrap');
	
	hamburger.on('click',function(){
		var element 	= jQuery(this);
		
		if(element.hasClass('is-active')){
			element.removeClass('is-active');
			mobileMenu.slideUp();
		}else{
			element.addClass('is-active');
			mobileMenu.slideDown();
		}
		return false;
	});
}