/************************************************
 
 * @ client:  樂利 Happy7
 * @ project: APP
 * @ date:    Fri Feb 02 2018
 * @ author:  Vincent Fang
 * @ version: v1.0.0
 
 ************************************************/
/*                         _           _      _
 *	__    __ ____ _  _ ___(_) _____ _ | |__  | | _____
 *	\ \  / /  _  | || / __| |/  _  | ||  _  \| |/  __ \
 *	 \ \/ /| |_|   ||  /  | |  |_|   |  |_\  | |   ___/
 *    \__/ \____/|__/__|  |_|\____/|__/_____/|_|\_____/
 */
'use strict';
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

var _body = document.body,
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

console.log( '%c' + 'VINCENT', 
'vartical-align: bottom;' + 'color: rgba(5,137,62,1);' + 
'font-family: Arial,"Noto Sans TC","Microsoft JhengHei";' +
'font-size: 4em;' + 'line-height: 1.5em;' +
'border: 1px solid rgba(5,137,62,1);' +
'margin: 15px 0px;' + 'padding: 5px 15px;' );



/*                       _
 *	 _ ___ ___  _____ _ (_) _ ____
 *	| /   /   |/  _  | || || / _  |
 *	|  /|  /| |  |_|   |  ||  / | |_
 *  |_| |_| |__/____/|__/__/_|  |__/
 */

var bus = new Vue();

var str = {
	animatioEnd: 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
};
var cnsle = {
	create: 'color: rgba(5,137,62,1);' + 'font-size: 1.5em;',
	update: 'color: rgba(255,137,62,1);' + 'font-size: 1.5em;',
	error:  'color: rgba(255,62,62,1);' + 'font-size: 1.5em;',
};
