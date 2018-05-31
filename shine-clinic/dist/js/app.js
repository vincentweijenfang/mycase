/************************************************
 
 * @ client:  光彩時尚診所
 * @ project: PC版官網
 * @ date:    Fri Jun 01 2018
 * @ author:  Vincent
 * @ version: v1.0.0
 
 ************************************************/
'use strict';

var PI = Math.PI,
    rad = Math.PI / 180,
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
    random = Math.random,
    loca = window.location;

var SCRIPTS = {
  first: document.getElementsByTagName('script')[0]
};

var API_KEYS = {};

var URL = {
  href: loca.href,
  host: loca.protocol + '//' + loca.hostname, // 完整網域
  path: loca.pathname.replace(/\/[^/]*$/, ''), // 完整資料夾
  page: loca.href.split('/').pop().replace(/[\?\#\.]+.*/, ''), // 頁面名稱
  port: loca.port ? ':' + loca.port : '',
  api: 'API/',
  prev: document.referrer, // 前一頁
  hash: loca.hash, // # 後面
  query: loca.search, // 問號後面
  querys: function querys() {
    var str = loca.href.replace(/.+[\?]/, '').split('&'),
        opt = {};
    for (var s = 0; s < str.length; s++) {
      var item = str[s].split('=');
      opt[item[0]] = item[1];
    }
    return opt;
  }
};
// console.log( URL.querys() );

var _body = document.body,
    _none;

var $body = $('body'),
    $html = $('html'),
    $htmlbody = $('html, body'),
    $wrapper = $('.wrap'),
    $header = $('.header'),
    $footer = $('.footer'),
    $loading_data = $('.loading-data'),
    $loading_page = $('.loading-page'),
    $loading_percent = $('.loading-percent');

var W = window.innerWidth,
    H = window.innerHeight,
    loop = true,
    scroll = _body.scrollTop;

/* 判斷瀏覽器大大與是否行動裝置 */
function parseUserAgent() {
  var u1 = navigator.userAgent;
  var u2 = navigator.userAgent.toLowerCase();
  var u3 = navigator.appName;
  var rv = -1; // Return value assumes failure.
  if (u3 == 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent,
        re = new RegExp('MSIE ([0-9]{1,}[\\.0-9]{0,})');
    if (re.exec(ua) !== null) {
      rv = String(parseFloat(RegExp.$1));
    }
  } else if (u3 == 'Netscape') {
    /// in IE 11 the navigator.appVersion says 'trident'
    /// in Edge the navigator.appVersion does not say trident
    if (navigator.appVersion.indexOf('Trident') === -1) rv = '12';else rv = '11';
  }
  // console.log( 'rv:' +  rv );
  // 行動版瀏覽器
  return {
    trident: u1.indexOf('Trident') > -1, // IE 核心
    presto: u1.indexOf('Presto') > -1, // Opera 核心
    webKit: u1.indexOf('AppleWebKit') > -1, // Apple Google 核心 + Android Google 核心
    iOSchrome: u1.indexOf('CriOS') > -1, // iOS chrome
    gecko: u1.indexOf('Gecko') > -1 && u1.indexOf('KHTML') == -1, // Firefox 核心
    firefox: u1.indexOf('Firefox') > -1, // Firefox
    iOS: !!u1.match(/\(i[^;]+;( U;)? CPu1.+Mac OS X/), // iOS 系統
    Android: u1.indexOf('Android') > -1 || u1.indexOf('Linux') > -1, // Android Linux 系統
    iPhone: u1.indexOf('iPhone') > -1, // iPhone 與否
    iPad: u1.indexOf('iPad') > -1, // iPad 與否
    webApp: u1.indexOf('Safari') == -1, // 
    iOSv: u1.substr(u1.indexOf('iPhone OS') + 9, 3),
    weixin: u2.match(/MicroMessenger/i) == 'micromessenger',
    ali: u1.indexOf('AliApp') > -1,
    line: u1.indexOf('Line') > -1,
    FB: u1.indexOf('facebook') > -1,
    iOSapp: u1.standalone,
    IE9: u1.indexOf('MSIE 9.0') > -1,
    IE10: rv.indexOf('10') > -1,
    IE11: rv.indexOf('11') > -1,
    edge: rv.indexOf('11') > -1,
    u1: rv,
    u2: u2,
    u3: u3,
    /////////////////////////////////////////////////////////////////////////////////
    browser: /Edge\/\d+/.test(u1) ? 'edge' : /MSIE 9/.test(u1) ? 'IE9' : /MSIE 10/.test(u1) ? 'IE10' : /MSIE 11/.test(u1) ? 'IE11' : /MSIE\s\d/.test(u1) ? 'IE?' : /rv\:11/.test(u1) ? 'IE11' : /Firefox\W\d/.test(u1) ? 'Firefox' : /Chrom(e|ium)\W\d|CriOS\W\d/.test(u1) ? 'Chrome' : /\bSafari\W\d/.test(u1) ? 'Safari' : /\bOpera\W\d/.test(u1) ? 'Oprea' : /\bOPR\W\d/i.test(u1) ? 'Oprea' : typeof MSPointerEvent !== 'undefined' ?
    // 'IE?' : '',
    'IE?' : false, // others
    app: /fbid/.test(u2) | /fb_iab/.test(u2) | /facebook/.test(u2) ? 'FacebookAPP' : /Line/.test(u1) ? 'LineAPP' : false,
    OS: /Windows NT 10/.test(u1) ? 'win10' : /Windows NT 6\.0/.test(u1) ? 'winvista' : /Windows NT 6\.1/.test(u1) ? 'win7' : /Windows NT 6\.\d/.test(u1) ? 'win8' : /Windows NT 5\.1/.test(u1) ? 'winxp' : /Windows NT [1-5]\./.test(u1) ? 'winnt' : /Mac/.test(u1) ? 'Mac' : /Linux/.test(u1) ? 'Linux' : /X11/.test(u1) ? 'nix' : false, // others
    mobile: /IEMobile|Windows Phone|Lumia/i.test(u1) ? 'windows' : /iPhone|iP[oa]d/.test(u1) ? 'iOS' : /Android/.test(u1) ? 'Android' : /BlackBerry|PlayBook|BB10/.test(u1) ? 'Blackberry' : /Mobile Safari/.test(u1) ? 'Undetected mobile device running Safari' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(u1) ? 'Undetected mobile device' : false, // Not a mobile or tablet device or others?
    tablet: /Tablet|iPad/i.test(u1), // tablet true false
    touch: 'ontouchstart' in document.documentElement // touch true false
  };
};

var $ua = parseUserAgent();

if (!$ua.mobile) {
  console.log('是電腦');
  var gotoOthers = true;
  if (!URL.href.match('localhost')) {
    // window.location = '../';	
  }
  $body.addClass('desktop');
  switch ($ua.browser) {
    case 'IE9':case 'IE?':
      loop = false;
      console.log('請使用高級瀏覽器');
      alert('建議使用Chrome，Firefox，以及IE10以上版本的瀏覽器進入網站，以便達成最佳瀏覽效果，謝謝');
      break;
    default:
      gotoOthers = false;
      break;
  }
  // $( '.broswer-popup-active' ).prop( 'checked', gotoOthers ).change();
} else {
  console.log('是行動裝置');
  var gotoOthers = true;
  if (!URL.href.match('localhost')) {
    if (!$ua.tablet) {
      // window.location = './m/'; 
      $body.addClass('mobile');
    } else {
      console.log('tablet');
      $body.addClass('tablet');
    }
  }
  switch ($ua.mobile) {
    case 'Android':
      console.log('Android');
      break;
    case 'iOS':
      console.log('iOS');
      break;
    case 'Undetected mobile device':
    case 'Undetected mobile device running Safari':
    case false:
      console.log('其它');
      break;
    default:
      console.log('其它');
      break;
  }
  switch ($ua.app) {
    case 'FacebookAPP':
      console.log('Facebook APP');
      break;
    case 'LineAPP':
      console.log('Line APP');
      break;
    default:
      console.log('APP Browser');
      gotoOthers = false;
      break;
  }
  // $( '.broswer-popup-active' ).prop( 'checked', gotoOthers ).change();
}

/* localStorage */
function loadFormStorage(id) {
  var get_storage = window.localStorage[id];
  if (get_storage) {
    return JSON.parse(get_storage);
  } else {
    return {};
  }
}
function saveToStorage(id, data) {
  window.localStorage[id] = JSON.stringify(data);
}

var _loadingCanvas = $('.loading-percent')[0],
    _loadingCtx = _loadingCanvas.getContext('2d'),
    _loadingBar = document.querySelector('.loading-bar');

_loadingCanvas.width = 100;
_loadingCanvas.height = 80;

function showLoadingPercent(_canvas, _ctx, txt) {
  _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
  _ctx.font = '1.25em' + ' Arial';
  _ctx.fillStyle = 'rgba( 255, 255, 255, 1 )';
  _ctx.textAlign = 'center';
  _ctx.textBaseline = 'middle';
  _ctx.fillText(round(txt * 100), _canvas.width / 2, _canvas.height / 2);
}

// showLoadingPercent( _loadingCanvas, _loadingCtx, progressedData.loadedPercent );

function openLoading() {
  $loading_page.addClass('visible');
}
function closeLoading() {
  $loading_page.removeClass('visible');
}

var loadend = {
  img: false,
  ready: false
};

var str = {
  animationEnd: 'webkitAnimationEnd oanimationend msAnimationEnd animationend'
};

var cnsle = {
  create: 'color: rgba(5,137,62,1);' + 'font-size: 1.5rem;',
  update: 'color: rgba(255,137,62,1);' + 'font-size: 1.5rem;',
  error: 'color: rgba(255,62,62,1);' + 'font-size: 1.5rem;'
};

$body.imagesLoaded().then(function (instance, image) {}).done(function () {}).always(function () {
  loadend.img = true;
  showLoadingPercent(_loadingCanvas, _loadingCtx, 1);
  // if( loadend.vue && !loadend.ready ){
  closeLoading();
  // }
}).progress(function (instance, image, progressedData) {
  showLoadingPercent(_loadingCanvas, _loadingCtx, progressedData.loadedPercent);
});

// 尺寸
function resizing() {
  W = window.innerWidth; // $body.width();
  H = window.innerHeight; // $body.height();
}

window.onresize = function () {
  resizing();
};

$('.slide').each(function () {
  var $this = $(this),
      options = {
    prevArrow: $this.children('.slide--prev'),
    nextArrow: $this.children('.slide--next'),
    dots: true,
    infinite: true,
    speed: 550,
    centerMode: true,
    centerPadding: '0%',
    slidesToShow: 1
  };
  switch ($this.attr('slide-style')) {
    case 'picture':
      options.prevArrow = '';
      options.nextArrow = '';
      options.dots = false;
      options.arrow = false;
      options.asNavFor = '.slideNav[slide-name="' + $this.attr('slide-name') + '"] .slide--list';
      break;
    case 'banner':
      options.slidesToShow = 4;
      options.autoplay = true;
      options.autoplaySpeed = 2000;
      options.responsive = [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      }];
      break;
  }
  $this.children('.slide--list').slick(options);
  // 圖片選單
  if (options.asNavFor) {
    var $nav = $(options.asNavFor),
        length = $this.find('.slide--item').length;
    $nav.slick({
      prevArrow: $nav.siblings('.slide--prev'),
      nextArrow: $nav.siblings('.slide--next'),
      slidesToShow: length > 4 ? 4 : length,
      slidesToScroll: length > 4 ? 4 : length,
      asNavFor: '.slide[slide-name="' + $this.attr('slide-name') + '"] .slide--list',
      centerMode: true,
      focusOnSelect: true
    });
  }
});

$body.on('click', '.cover-X', function () {
  $(this).parents('.cover').hide();
});

jQuery('img.svg').each(function () {
  var $img = jQuery(this);
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');
  jQuery.get(imgURL, function (data) {
    // Get the SVG tag, ignore the rest
    var $svg = jQuery(data).find('svg');
    // Add replaced image's ID to the new SVG
    if (typeof imgID !== 'undefined') {
      $svg = $svg.attr('id', imgID);
    }
    // Add replaced image's classes to the new SVG
    if (typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass + ' replaced-svg');
    }
    // Remove any invalid XML tags as per http://validator.w3.org
    $svg = $svg.removeAttr('xmlns:a');
    // Replace image with new SVG
    $img.replaceWith($svg);
  }, 'xml');
});