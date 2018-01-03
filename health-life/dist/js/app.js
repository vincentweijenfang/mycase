/************************************************
 
 * @ client:  合隆羽藏 Health Life
 * @ project: 溫度測試
 * @ date:    Wed Jan 03 2018
 * @ author:  Vincent Fang
 * @ version: v1.0.0
 
 ************************************************/
'use strict';
/////////////////////////////////////////////////////////////////////////////////////////
////              ///////////////////////////////////////////////////////////////////////
////   Variable   ///////////////////////////////////////////////////////////////////////
////              ///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
var PI = Math.PI,
    rad = Math.PI/180,
    cos = Math.cos,
    sin = Math.sin,
    atan2 = Math.atan2,
    abs = Math.abs,
    sqrt = Math.sqrt,
    round = Math.round,
    ceil = Math.ceil,
    floor = Math.floor,
    max = Math.max,
    min = Math.min,
    random = Math.random;

var URL       =  new Object;
	URL.href  =  window.location.href;
    // URL.foldr =  URL.href.match( '40' ) ? 'foldr/' : '';
    URL.foldr = '';
    URL.host  =  window.location.hostname + '/' + URL.foldr;
    URL.page  =  URL.href.split( '/' ).pop();
    URL.path  =  URL.page.split( '.html' ).shift();
    URL.api   = 'API/';
    URL.path  =  URL.path.match( '=' ) ? '' : URL.path;

var scripts = {
	first: document.getElementsByTagName( 'script' )[ 0 ],
	youtube: document.createElement( 'script' ),
}
scripts.youtube.src = 'https://www.youtube.com/player_api'; // iframe_api
scripts.first.parentNode.insertBefore( scripts.youtube, scripts.first );

var _body   = document.body,
    // _canvas = document.querySelector( '.bg-canvas' ),
	// _ctx    = _canvas.getContext( '2d' ),
	_none;
    
var $body      = $( 'body' ),
	$html      = $( 'html' ),
    $htmlbody  = $( 'html, body' ),
	$wrap      = $( '.wrap' ),
    $container = $wrap.find( '.container' ),
	$header    = $( '.header' ),
	$footer    = $( '.footer' ),
    $loading_info = $( '.loading-info' ),
    $loading_page = $( '.loading-page' );

var W = window.innerWidth,
    H = window.innerHeight,
    scroll  = _body.scrollTop,
    centerX = W / 2,
    centerY = H / 2,
    loop = true;

window.requestAnimateFrame = (function(){
 return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        function( callback ){
            return window.setTimeout( callback, 1000 / 60 ); // shoot for 60 fps
        };
})();
window.cancelAnimateFrame = (function(){
 return window.cancelAnimationFrame       ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame    ||
        window.oCancelAnimationFrame      ||
        function( id ){
            window.clearTimeout( id );
        };
})();

/* 判斷瀏覽器大大與是否行動裝置 */
function parseUserAgent(){
    var u1 = navigator.userAgent;
    var u2 = navigator.userAgent.toLowerCase();
    var u3 = navigator.appName;
    var rv = -1; // Return value assumes failure.
    if( u3 == 'Microsoft Internet Explorer' ){
       var ua = navigator.userAgent,
           re = new RegExp( 'MSIE ([0-9]{1,}[\\.0-9]{0,})' );
       if( re.exec(ua) !== null ){
            rv = String( parseFloat( RegExp.$1 ) );
       }
    }
    else if( u3 == 'Netscape' ){                       
       /// in IE 11 the navigator.appVersion says 'trident'
       /// in Edge the navigator.appVersion does not say trident
       if( navigator.appVersion.indexOf( 'Trident' ) === -1 ) rv = '12';
       else rv = '11';
    }       
    // console.log( 'rv:' +  rv );
    // 行動版瀏覽器
    return{ 
        trident:   u1.indexOf( 'Trident' ) > -1,                               // IE 核心
        presto:    u1.indexOf( 'Presto' ) > -1,                                // Opera 核心
        webKit:    u1.indexOf( 'AppleWebKit' ) > -1,                           // Apple Google 核心 + Android Google 核心
        iOSchrome: u1.indexOf( 'CriOS' ) > -1,                                 // iOS chrome
        gecko:     u1.indexOf( 'Gecko' ) > -1 && u1.indexOf( 'KHTML' ) == -1,  // Firefox 核心
        firefox:   u1.indexOf( 'Firefox' ) > -1,                               // Firefox
        iOS:    !! u1.match( /\(i[^;]+;( U;)? CPu1.+Mac OS X/ ),               // iOS 系統
        Android:   u1.indexOf( 'Android' ) > -1 || u1.indexOf( 'Linux' ) > -1, // Android Linux 系統
        iPhone:    u1.indexOf( 'iPhone' ) > -1,                                // iPhone 與否
        iPad:      u1.indexOf( 'iPad' ) > -1,                                  // iPad 與否
        webApp:    u1.indexOf( 'Safari' ) == -1,                               // 
        iOSv:      u1.substr( u1.indexOf( 'iPhone OS' ) + 9, 3 ),
        weixin:    u2.match( /MicroMessenger/i ) == 'micromessenger',
        ali:       u1.indexOf( 'AliApp' ) > -1,
        line:      u1.indexOf( 'Line' ) > -1,
        FB:        u1.indexOf( 'facebook' ) > -1,
        iOSapp:    u1.standalone,
        IE9:       u1.indexOf( 'MSIE 9.0' ) > -1,      
        IE10:      rv.indexOf( '10' ) > -1,
        IE11:      rv.indexOf( '11' ) > -1,
        edge:      rv.indexOf( '11' ) > -1,
        u1:        rv,
        u2:        u2,
        u3:        u3,
        /////////////////////////////////////////////////////////////////////////////////
        browser: /Edge\/\d+/.test(u1) ? 
                 'edge' : /MSIE 9/.test(u1) ? 
                 'IE9' : /MSIE 10/.test(u1) ? 
                 'IE10' : /MSIE 11/.test(u1) ? 
                 'IE11' : /MSIE\s\d/.test(u1) ? 
                 'IE?' : /rv\:11/.test(u1) ? 
                 'IE11' : /Firefox\W\d/.test(u1) ? 
                 'Firefox' : /Chrom(e|ium)\W\d|CriOS\W\d/.test(u1) ? 
                 'Chrome' : /\bSafari\W\d/.test(u1) ? 
                 'Safari' : /\bOpera\W\d/.test(u1) ? 
                 'Oprea' : /\bOPR\W\d/i.test(u1) ? 
                 'Oprea' : typeof MSPointerEvent !== 'undefined' ? 
                 // 'IE?' : '',
                 'IE?' : 
                  false, // others
		app:     /facebook/.test( u1 ) ?
                 'FacebookAPP' : /Line/.test( u1 ) ?
                 'LineAPP' : 
				  false,
		OS:      /Windows NT 10/.test(u1) ? 
                 'win10' : /Windows NT 6\.0/.test(u1) ? 
                 'winvista' : /Windows NT 6\.1/.test(u1) ? 
                 'win7' : /Windows NT 6\.\d/.test(u1) ? 
                 'win8' : /Windows NT 5\.1/.test(u1) ? 
                 'winxp' : /Windows NT [1-5]\./.test(u1) ? 
                 'winnt' : /Mac/.test(u1) ? 
                 'Mac' : /Linux/.test(u1) ? 
                 'Linux' : /X11/.test(u1) ? 
                 'nix' : 
                  false, // others
        mobile:  /IEMobile|Windows Phone|Lumia/i.test(u1) ? 
                 'windows' : /iPhone|iP[oa]d/.test(u1) ? 
                 'iOS' : /Android/.test(u1) ? 
                 'Android' : /BlackBerry|PlayBook|BB10/.test(u1) ? 
                 'Blackberry' : /Mobile Safari/.test(u1) ? 
                 'Undetected mobile device running Safari' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(u1) ? 
                 'Undetected mobile device' : 
                  false, // Not a mobile or tablet device or others?
        tablet:  /Tablet|iPad/i.test( u1 ), // tablet true false
        touch:   'ontouchstart' in document.documentElement, // touch true false
    };
}

var $ua = parseUserAgent();

/*
if( $ua.mobile ){ console.log( '是行動裝置' ); }
else{ console.log( '是電腦' ); }
if( !$ua.iPhone && $ua.iPad ){ console.log( 'iOS系統' ); }
if(  $ua.webKit ){ console.log( '是Webkit系統Chrome和Safari' ); }
if(  $ua.firefox ){ console.log( '是Firefox系統' ); }
if(  $ua.trident ){ console.log( '是IE系統' ); }
if(  $ua.IE9 || typeof history.pushState == 'undefined' ){ console.log( '是IE爛系統' ); }
if( $ua.line || $ua.weixin || $ua.iOSapp ){ console.log( 'APP' ); }
else{ console.log( '非APP' ); }
*/

if( !$ua.mobile ){
	console.log( '是電腦' );
	var gotoOthers = true;
	if( $html.hasClass( 'page___mobile' ) && !URL.href.match( 'localhost' ) ){ 
		window.location = '../';	
	}
	switch( $ua.browser ){
		case 'IE9':
		case 'IE?':
			loop = false;
			console.log( '請使用高級瀏覽器' );
			alert( '建議使用Chrome，Firefox，以及IE10以上版本的瀏覽器進入網站，以便達成最佳瀏覽效果，謝謝' );
		break;
		default:
			gotoOthers = false;
		break;
	}
	$( '.broswer-popup-active' ).prop( 'checked', gotoOthers ).change();
}
else{
	console.log( '是行動裝置' );
	var gotoOthers = true;
	if( $html.hasClass( 'page___desktop' ) && !URL.href.match( 'localhost' ) ){ 
		if( !$ua.tablet ){
			window.location = './m/'; 
		}
		else{
			console.log( 'tablet' );
		}
	}
	switch( $ua.mobile ){
		case 'Android':
			console.log( 'Android' );
		break;
		case 'iOS':
			console.log( 'iOS' );
		break;
		case 'Undetected mobile device':
		case 'Undetected mobile device running Safari':
		case false:
			console.log( '其它' );
		break;
		default:
			console.log( '其它' );
		break;
	}
	switch( $ua.app ){
		case 'FacebookAPP':
			console.log( 'Facebook APP' );
		break;
		case 'LineAPP':
			console.log( 'Line APP' );
		break;
		default:
			console.log( 'APP Browser' );
			gotoOthers = false;
		break;
	}
	$( '.broswer-popup-active' ).prop( 'checked', gotoOthers ).change();
}

/* 判斷前一頁 getQueryHistory( 'question', './' ); */
function getQueryHistory( key, redirect_href ){
    URL.history = document.referrer;
    if( !URL.history.match( key ) ){
        window.location = redirect_href;
    }
}
function getQueryParameter( value ){
    var query = window.location.search.substring( 1 );
    var vars  = query.split( '&' );
    for( var i = 0; i < vars.length; i++ ){
        var pair = vars[ i ].split( '=' );
        if( pair[ 0 ] == value ){
            return pair[ 1 ];
        }
    } 
}

console.log( '%c' + 'VINCENT', 
'vartical-align: bottom;' + 'color: rgba(5,137,62,1);' + 
'font-family: Arial,"Noto Sans TC","Microsoft JhengHei";' +
'font-size: 4em;' + 'line-height: 1.5em;' +
'border: 1px solid rgba(5,137,62,1);' +
'margin: 15px 0px;' + 'padding: 5px 15px;' );
console.log( '%c' + new Date(), 
'vartical_align:bottom;' + 'color:rgba(5,137,62,1);' + 
'font-size: 1em;' + 'line-height: 2em;' );
////////////////////////////////////////////////////////////////////////////////////////////////
////           /////////////////////////////////////////////////////////////////////////////////
////   Init    /////////////////////////////////////////////////////////////////////////////////
////           /////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function openLoading(){
    $loading_page.addClass( 'visible' );
}
function closeLoading(){
    $loading_page.removeClass( 'visible' );
}
function openLoadingInfo( text ){
    $loading_info.addClass( 'visible' ).find( '.txt' ).text( text );
}
function closeLoadingInfo(){
    $loading_info.removeClass( 'visible' );
}
function loadFormStorage( id ){
    var get_storage = window.localStorage[ id ];
    if( get_storage ){
        return JSON.parse( get_storage );
    }
    else{
        return {}
    }
}
function saveToStorage( id, data ){
    window.localStorage[ id ] = JSON.stringify( data );
}

// 尺寸
function resizing(){
    W = window.innerWidth; // $body.width();
    H = window.innerHeight; // $body.height();
    centerX = W / 2;
    centerY = H / 2;
    // 全螢幕
    /*
    var scale = .5625;
    if( H/W < scale ){
        $full.css({ width: W, height: W*scale });
    }
    else{
        $full.css({ width: H/scale, height: H });
    }
	if( animateBG ){
		animateBG.resizing();
	}
    */
}

window.onresize = function(){
    resizing();
}
/////////////////////////////////////////////////////////////////////////////////////////
////          ///////////////////////////////////////////////////////////////////////////
////   Main   ///////////////////////////////////////////////////////////////////////////
////          ///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

var loading = {
	img: false,
	vue: false,
	youtube: false,
	ready: false,
	count: {
		now: 0,
		all: $( 'img' ).length,
	}
}; 

var $scale;

var str = {
	animationEnd: 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
};

var cnsle = {
	create: 'color: rgba(5,137,62,1);' + 'font-size: 1.5em;',
	update: 'color: rgba(255,137,62,1);' + 'font-size: 1.5em;',
	error:  'color: rgba(255,62,62,1);' + 'font-size: 1.5em;',
};

var gradientColor = function( from, to, ratio ){
	var hex = function(x) {
		x = x.toString(16);
		return (x.length == 1) ? '0' + x : x;
	};
	var r = Math.ceil(
				parseInt(from.substring(0,2), 16) * ratio + 
				parseInt(to.substring(0,2), 16) * (1-ratio)),
		g = Math.ceil(
				parseInt(from.substring(2,4), 16) * ratio + 
				parseInt(to.substring(2,4), 16) * (1-ratio)),
		b = Math.ceil(
				parseInt(from.substring(4,6), 16) * ratio + 
				parseInt(to.substring(4,6), 16) * (1-ratio)),
		newColor = hex(r) + hex(g) + hex(b);
		return '#' + newColor; 
}

var intro = {
	start: function(){
		var that = this;
		setTimeout(function(){
			console.log( '%c' + '載入完畢ㄋ', cnsle.create );
			resizing();
			that.step1();
		}, 600 ); 
	},
	step1: function(){
		this.end();
	},
	end: function(){
		closeLoading();
		if( !loading.ready ){
			loading = true;
			setTimeout(function(){
				$( '#index .intro' ).addClass( 'visible' );
				// animate();
			}, 450 ); 
		}
	}
};

$body
.imagesLoaded()
.then(function( instance, image ){ 
    console.log( 'start loaded' ); 
})
.done(function(){})
.always(function(){
	console.log( 'all loaded' );
	loading.img = true;
	if( loading.vue && !loading.ready ){
		loading.ready = true;
		intro.start();
	}
})
.progress(function( instance, image ){
	if( image.isLoaded ){
		loading.count.now++;
		var percent = Math.round( loading.count.now / loading.count.all * 100 );
		// loading.percent = Math.round( loading.now / loading.count * 100 );
	} 
});

Vue.component( 'question-box', {
	template: '#question-box',
	props: {
		stage: { type: String, },
		info: { type: Object, },
		value: [ String, Number ],
	},
	data: function(){
		return {
			answer: this.value,
		}
	},
	watch: {
		value: {
			handler: function( val ){
				this.answer = val;
			},
		},
		answer: {
			handler: function( val ){
				this.$emit( 'input', val );
				if( this.answer ){
					bus.$emit( 'toStage', this.info.next );
				}
			}
		}
	},
	methods: {
		toStage: function( nextStage ){
			if( this.answer ){
				bus.$emit( 'toStage', nextStage );
			}
			else{
				alert( '尚未選擇答案喔' );
			}
		},
	}
});

var bus = new Vue();

var app = new Vue({
	el: '#app',
	data: {
		// index temp(q1) q2 q3 q4 result
		stage: 'index',
		geo: {
			// lat: 0,
			// lng: 0,
			enableHighAccuracy: true,
			timeout: 15000,
			maximumAge: 0,
		}, 
		google: {
			key: '&key=AIzaSyA1z9OHEgtAjocFRBhZa9k_-hGd6n6uF3c',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?',
			latlng: '',
			language: '&language=zh-TW',
		},
		temp: {
			val: 25,
			min: -20,
			max: 45,
			gradient: [ '0687f1', 'd6df29', 'c80018' ],
			site: '無法取得地點',
		},
		questions: {
			step: 1,
			list: [
				{
					id: 'q2',
					title: '您的體質？',
					options: [
						'較怕冷，夏天會想穿長袖',
						'較怕熱，冬天穿短袖也OK！',
						'一般體質，沒特別怕冷，也沒特別怕熱',
					], 
					answer: false,
					next: 'q3',
				},
				{
					id: 'q3',
					title: '您的居住的氣候環境？',
					options: [
						'都會區',
						'山邊、山區',
						'海邊、河岸邊',
					], 
					answer: false,
					next: 'q4',
				},
				{
					id: 'q4',
					title: '睡覺的穿著習慣？',
					options: [
						'會加蓋一條毯子',
						'不穿衣服',
						'一般',
					], 
					answer: false,
					next: 'result',
				}
			],
		},
		// 3 * 3 * 3 = 27
		answer: {
			val: 'light', 
			// 111 121 122 123 131 132 133 211 212 213 221 222 223
			list: {
				light: {
					title: '輕盈被(3~4 TOG)',
					products: [ 'a', 'b', 'c' ],
				},
				middle: {
					title: '標準被(3~4 TOG)',
					products: [ 'a', 'b', 'c' ],
				},
				heavy: {
					title: '過重被(3~4 TOG)',
					products: [ 'a', 'b', 'c' ],
				},
			}
		}, 
		product: {
			a: {
				name: '90/10 經典羽絨冬被',
				img: './img/product-a.jpg',
				link: 'https://google.com',
			},
			b: {
				name: '超級厚的棉被',
				img: './img/product-b.jpg',
				link: 'https://google.com',
			},
			c: {
				name: '0.2公分超薄觸感棉被',
				img: './img/product-c.jpg',
				link: 'https://google.com',
			}
		}
	},
	created: function(){
		var that = this;
		bus.$on( 'toStage', function( nextStage ){
			that.stage = nextStage;
		});
		bus.$on( 'toStage', function( nextStage ){
			that.stage = nextStage;
		});
	},
	// 是否載入完畢ㄌ
	mounted: function(){
		var that = this;
		loading.vue = true;
		if( loading.img && !loading.ready ){
			loading.ready = true;
			intro.start();
		}
		that.getLocation();
		// slider
		$scale = $( '.scale' ).slider({
			animate: 'fast',
			max: that.temp.max,
			min: that.temp.min,
			slide: function( event, ui ){
				that.temp.val = ui.value;
			}
		});
	},
	computed: {
		tempColor: function(){
			var temp = this.temp,
				renge = temp.max - temp.min,
				piece = renge / (temp.gradient.length - 1),
				id = floor( (temp.val - temp.min) / piece ),
				index = id == temp.gradient.length-1 ? 
						id - 1 : id,
				ratio = id == temp.gradient.length-1 ? 
						0 : 1 - ( (temp.val - temp.min) % piece / piece ),
				from = temp.gradient[ index ],
				to = temp.gradient[ index+1 ],
				color = gradientColor( from, to, ratio );
			return color;
		},
		tempX: function(){
			return (this.temp.val - this.temp.min) / 
				   (this.temp.max - this.temp.min) * 
				   100 + '%';
		},
	},
	watch: {
		'temp.val': {
			handler: function(){
				var that = this;
				$scale.slider( 'value', that.temp.val )
					  .find( '.ui-slider-handle' )
					  .css( 'background', that.tempColor );
			}
		}
	},
	methods: {
		toStage: function( nextStage ){
			this.stage = nextStage;
		},
		tempChange: function( val ){
			switch( this.temp.val ){
				case this.temp.min:
					if( val > 0 ){
						this.temp.val += val;
					}
				break;
				case this.temp.max:
					if( val < 0 ){
						this.temp.val += val;
					}
				break;
				default:
					this.temp.val += val;
				break;
			}
		},
		getLocation: function(){
			var that = this;
			console.log( 'getLocation' ) 
			navigator.geolocation.getCurrentPosition( 
				that.getLocationSuccess, 
				that.getLocationError, 
				that.geo
			);
		},
		getLocationSuccess: function( rsp ){
			// console.log( rsp );
			console.log( 'geo success' );
			var that = this;
			var coords = rsp.coords,
				meters = coords.accuracy,
				lat = coords.latitude,
				lng = coords.longitude;
				that.google.latlng = 'latlng=' + lat + ',' + lng,
			$.getJSON( 
				that.google.url + 
				that.google.latlng + 
				that.google.language, function( rsp ){
				console.log( rsp );
				var results = rsp.results,
					lastItem = results.length - 1;
				if( rsp.status == 'ZERO_RESULTS' ){ 
					console.log( 'location GG' ); 
					console.log( '不在台灣' );
					that.temp.site = '不在台灣';
				}
				if( !results[ lastItem ] || 
					!results[lastItem].formatted_address == '台灣' ){ 
					console.log( '不在台灣' );
					that.temp.site = '不在台灣';
				}
				for( var geo in results ){
					var geoItem = results[ geo ];
					if( geoItem.types == 'postal_code' ){
						var address = geoItem.formatted_address,
							site = address.split( '台灣' )[ 1 ] || '不在台灣';
						that.temp.site = site;
					}						
				}
				that.getWeather();			
			});
		},
		getLocationError: function( rsp ){
			console.log( rsp );
			console.log( 'geo error' );
		},
		getWeather: function(){
			// http://duckfly-tw.blogspot.tw/2015/02/yql-yahoo-weather-api.html
			var that = this,
				channel = 'item';
			$.getJSON( 
				// wind, item, item.condition ...
				'https://query.yahooapis.com/v1/public/yql?q=select '+ channel +' from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+ that.temp.site +' il")&format=json',
				function( rsp ){
					console.log( rsp );
					var F = rsp.query.		results.channel.item.condition.temp,
						C = round( (F - 32) * 5/9 );
					that.temp.val = 
						C > that.temp.min ?
						C < that.temp.max ? 
						C : that.temp.max : that.temp.min;
					console.log( C );
					if( $scale ){
						$scale.slider( 'value', that.temp.val )
							  .find( '.ui-slider-handle' )
							  .css( 'background', that.tempColor );
					}
					// console.log( that.temp.site );
					// console.log( C );
					// console.log( that.temp.val );
			})
		},
	}
});

