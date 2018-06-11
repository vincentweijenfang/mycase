/************************************************
 
 * @ client:  FET
 * @ project: 4.5G Landing Page
 * @ date:    Tue Jun 12 2018
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
const 
    PI = Math.PI,
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
    random = Math.random,
    loca = window.location;

const SCRIPTS = {
    first: document.getElementsByTagName( 'script' )[ 0 ]
};

console.log( `%cVINCENT`, 
`vartical-align: bottom; color: rgba(5,137,62,1);` +
`font-family: Arial,"Noto Sans TC","Microsoft JhengHei";` +
`font-size: 2rem; line-height: 1em;` +
`border: 2px solid rgba(5,137,62,1); ` +
`margin: 15px 0px;padding: 0px 5px;` );

// viewportChecker
var viewpageApp = {
	$scroll: $( 'html,body' ),
	page: '.f-viewpage',
	el: '.f-view',
	btn: '.f-btn-anchor',
	hash: false,
	anchor: false,
	header: 0,
	$mainNav: $( '.mainNav-active' ),
};
$( 'body' ).on( 'click', viewpageApp.btn, function(){
	var v = viewpageApp,
		target = $( this ).data( 'target' ),
		position = $( v.page + '[data-page="' + target + '"]' ).offset().top;
	v.$scroll.stop().animate({ scrollTop: position - v.header }, 400 );
	v.$mainNav.prop( 'checked', false ).change();
})
$( viewpageApp.page ).viewportChecker({
	classToAdd:                'f-visible', 
	classToAddForFullView:     'f-full-visible', 
	classToRemove:             'f-invisible', 
	removeClassAfterAnimation:  false, 
	offset:                    '50%',
	invertBottomOffset:         true,
	repeat:                     true, 
	scrollHorizontal:           false,
	callbackFunction: function( elem, action ){ 
		var v = viewpageApp;
		if( !v.anchor ){
			v.anchor = $( elem ).data( 'page' );
			$( v.btn + '[data-target="' + v.anchor + '"]' ).addClass( 'f-active' );
			v.action = action;
		}
		if( v.action !== action ){
			v.action = action;
			if( v.action == 'remove' ){
				$( v.btn + '.f-active' ).removeClass( 'f-active' );
			}
			else{
				v.anchor = $( elem ).data( 'page' );
				$( v.btn + '[data-target="' + v.anchor + '"]' ).addClass( 'f-active' );
			}
		}
		if( v.hash ){
			console.log( v.anchor );
			window.location.hash = v.anchor;
		}
	} 
});
$( viewpageApp.el ).viewportChecker({
	classToAdd:                'f-visible', 
	classToAddForFullView:     'f-full-visible', 
	classToRemove:             'f-invisible', 
	removeClassAfterAnimation:  false, 
	offset:                    '0%',
	invertBottomOffset:         false,
	repeat:                     false, 
	scrollHorizontal:           false,
	callbackFunction: function( elem, action ){} 
});

// Youtube
SCRIPTS.youtube = document.createElement( 'script' );
SCRIPTS.youtube.src = 'https://www.youtube.com/player_api'; // iframe_api
SCRIPTS.first.parentNode.insertBefore( SCRIPTS.youtube, SCRIPTS.first );

var playerApp = {
	_player:  document.querySelectorAll( '.f-filmPlayer' ),
	_playbtn: document.querySelectorAll( '.f-btn-filmItem' ),
	_closebtn: document.querySelectorAll( '.f-filmPlayer-X' ),
	// ready: false,	
	destory: false,
	id: {
		now:  '',
	},
	list: {
		videos:   [],
		yid:      [],
		readyid:  [],
		playbtns: [],
	},
	default: {
		loop: 0,
		autoplay: 0, 
		autohide: 1, 
		controls: 1, 
		showinfo: 1,
		playsinline: 1, // 使用 inline player 播放
		rel: 0, 
		modestbranding: 0, 
		disablekb: 1, 
		enablejsapi: 0, 
		iv_load_policy: 3,
	}
};
function onYouTubeIframeAPIReady(){
	if( playerApp.destory ){ return; }
	var _players = playerApp._player;
	for( var key = 0; key < _players.length; key++ ){
		var defaultOpt = playerApp.default,
			_this   = _players[ key ],
			$this   = $( _this ),
			videoId = $this.attr( 'videoid' ),
			defalutSet = $this.attr( 'defalut' ) ? inlineToJSON( $this.attr( 'defalut' ) ) : [];
		// 初始設定變更
		for( var item in defalutSet ){
			defaultOpt[ item ] = defalutSet[ item ];
		} 
		// 初始設定變更 End
		playerApp.list.yid[ key ] = videoId;
		playerApp.list.playbtns[ key ] = $( playerApp._playbtn ).filter( '[playerid=' + videoId + ']' );
		playerApp.list.videos[ key ] = new YT.Player( _this, {
            height: '100%',
            width:  '100%',
            videoId: videoId,
            playerVars: defaultOpt,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
            }
        });
	}
}

function onPlayerReady( event ){ 
	playerApp.list.readyid.push( videoId );
	// console.log( playerApp.list );
    var _this   = event.target,
		videoId = _this.b.b.videoId,
        autoplay = $( _this.getIframe() ).attr( 'autoplay' );
	if( autoplay == 'true' || autoplay == true ){
		toTriggerPlayer( videoId );
	}
}

function onPlayerStateChange( event ){
	var state    = event.data,
		_this    = event.target,
        $this    = $( _this.getIframe() ),
		videoId  = _this.b.b.videoId,
		$playbtn = $( playerApp.list.playbtns[ playerApp.list.yid.indexOf( videoId ) ] );
		// $playbtn.addClass( 'active' );
	switch( state ){
		case -1: // UNSTARTED
			_this.seekTo( 0 );
			console.log( 'UNSTARTED' );
		break;
		case 0: // END
			console.log( 'END' );
			_this.pauseVideo(); // .seekTo(18);
			// gtag( 'event', 'video', {
			// 	'event_category': '首頁',
			// 	'event_label': '看完影片'
			// });
		break;
		case 1: // PLAY
			console.log( 'PLAY' );
			// console.log( videoId, playerApp.id.now );
			if( videoId !== playerApp.id.now ){
				var $prevbtn = $( playerApp.list.playbtns[ playerApp.list.yid.indexOf( playerApp.id.now ) ] ),
					_now = playerApp.list.videos[ playerApp.list.yid.indexOf( playerApp.id.now ) ],
					$now = _now ? $( _now.a ) : false;
				if( $now && $this.attr( 'videogroup' ) == $now.attr( 'videogroup' ) ){
					_now.pauseVideo(); // .seekTo(18);
				}
				$prevbtn.removeClass( 'active' );
			}
			playerApp.id.now = videoId;
			$playbtn.addClass( 'active' );
		break;
		case 3: // BUFFERING 
			console.log( 'BUFFERING' );
		break;
		case 2: // PAUSE 
		break;
		case 5: // READT
			console.log( 'READT' );
		break;
	}
}
function toTriggerPlayer( event ){
	var videoId = event.videoId || playerApp.id.now,
		state   = event.data,
		_this   = playerApp.list.videos[ playerApp.list.yid.indexOf( videoId ) ],
		open    = true;
	if( !_this ){ console.log( '找不到影片哪' ); return };
	switch( state ){
		case 11: // toggle
			// console.log( _this.getPlayerState() ); 
			switch( _this.getPlayerState() ){
				case 0: // END
					_this.playVideo();
				break;
				case 1: // PLAY
					_this.pauseVideo();
				break;
				case 2: // PAUSE 
					_this.playVideo();
				break;
				case 5: // READT
					_this.playVideo();
				break;
			}
		break;
		case 1: // PLAY
		case 'PLAY':
			// 避免重複 PLAY
			if( playerApp.id.now && videoId !== playerApp.id.now ){
				// _this.playVideo();
				_this.playVideo().mute();
			}
		break;
		case 2: // PAUSE 
		case 'PAUSE':
			// 避免重複 PAUSE
			if( playerApp.id.now && videoId == playerApp.id.now ){
				_this.pauseVideo();
			}
			open = false;
		break;
		case 16: // BACKTO
		case 'BACKTO': // BACKTO
			if( playerApp.id.now && videoId == playerApp.id.now ){
				_this.pauseVideo();
				_this.seekTo( 0 );
			}
		break;
	}	
	$( '.f-popup-active[videoid="' + videoId + '"]' ).prop( 'checked', open ).change();
	// if( _this ){ $( _this.a ).addClass( 'visible' ).siblings( '.visible' ).removeClass( 'visible' ); }
}
$( playerApp._playbtn ).click(function(){
	toTriggerPlayer({
		videoId: $( this ).attr( 'playerid' ),
		data: 11,
	});
});
$( playerApp._closebtn ).click(function(){
	toTriggerPlayer({
		data: 2,
	});
});