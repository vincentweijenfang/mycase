//**************************************
//  3Wcreative Web Design
//  https://www.facebook.com/3wcreative
//  Updated: 2015/12/10
//**************************************
var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var Pad = /iPad/i.test(navigator.userAgent);
$(document).ready(function() {
	//**************************************
	//  window scroll
	//**************************************
    $(window).scroll(function (e) {
    	var afterScroll = $(window).scrollTop()
    	if (mobile) {
        	if ($(this).scrollTop() > 0 && (($(document).height() - $('.ch-footer').height()) > afterScroll)) {
        		$('.backtop').fadeIn(200);
        	} else {
        		$('.backtop').fadeOut(200);
        	}
    	} else {
        	if ($(this).scrollTop() > 150) {
        		$('.backtop').fadeIn();
        	} else {
        		$('.backtop').fadeOut();
        	}
    	}
    });
	$(".backtop a").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
	});
});
//**************************************
//  window resize
//**************************************
$(window).resize(function (){
});
//**************************************
//  window load
//**************************************
$(window).load(function(){
    window.onunload = function (){window.scrollTo(0, 0);}
    wow = new WOW({
        mobile: false,
    })
    wow.init();
});
$(function() {
	var currentSize = "large";
    $(window).resize(function (){
    	var bodyContent = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
    	bodyContent = bodyContent.replace(/"/g, "").replace(/'/g, "");
    	if (bodyContent != currentSize){
        	if (bodyContent == 'large'){
        	    $(".PC").show;
        	    $(".MB").hide;
			}
        	if (bodyContent == 'smail'){
        	    $(".PC").hide;
        	    $(".MB").show;
			}
			currentSize = bodyContent;
    	}
    });
});