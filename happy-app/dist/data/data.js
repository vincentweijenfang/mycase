/*        _            _
 *	   __| | _____ _ _| |_ _____ _
 *	 /  _  |/  _  | |_   _/  _  | |
 *	|  /_|    |_|   |_| |_| |_|   |_
 *   \_____/\____/\__/|__/\_____/\_/
 */
var data = {
	navigation: {
		name : {
			store: '門店 - 功能列表',
			customer: '功能列表'
		},
		open: false, // 是否開啟
		list: [
			{
				id: 0,
				key: 'love',
				name: '最愛商品',
				className: 'col-4',
				link: '', // 連結
				target: '',
				icon: './img/icon/nav-love.png',  
				hidden: [ 'love' ], // 在哪些頁面隱藏,
			},
			{
				id: 1,
				key: 'record',
				name: '瀏覽紀錄',
				className: 'col-4',
				link: '', // 連結
				target: '',
				icon: './img/icon/nav-record.png',  
				hidden: [ 'record' ], // 在哪些頁面隱藏,
			},
			{
				id: 2,
				key: 'order',
				name: '訂單查詢',
				className: 'col-4',
				link: '', // 連結
				target: '',
				icon: './img/icon/nav-order.png',  
				hidden: [ 'order' ], // 在哪些頁面隱藏,
			},
			{
				id: 3,
				key: 'store',
				name: '專屬店家設定',
				className: 'col-4',
				link: '', // 連結
				target: '',
				icon: './img/icon/nav-store.png',  
				hidden: [ 'store' ], // 在哪些頁面隱藏,
			},
			{
				id: 4,
				key: 'setting',
				name: '個人資料設定',
				className: 'col-4',
				link: '', // 連結
				target: '',
				icon: './img/icon/nav-setting.png',  
				hidden: [ 'setting' ], // 在哪些頁面隱藏,
			},
			{
				id: 5,
				key: 'QA',
				name: '簡易操作Q&A',
				className: 'col-4',
				link: '', // 連結
				target: '',
				icon: './img/icon/nav-QA.png',  
				hidden: [ 'QA' ], // 在哪些頁面隱藏,
			},
			{
				id: 6,
				key: 'shop',
				name: '商城商品管理',
				className: 'col-4 offset-4',
				link: '', // 連結
				target: '',
				icon: './img/icon/nav-shop.png',  
				hidden: [ 'shop' ], // 在哪些頁面隱藏,
			},
			{
				id: 7,
				key: 'index',
				name: '回首頁',
				className: 'col-4 offset-4',
				link: '/', // 連結
				target: '',
				icon: './img/icon/nav-index.png',  
				hidden: [ 'index' ], // 在哪些頁面隱藏,
			},
		],
	},
	classes: {
		name: '',
		list: [
			{
				id: 0,
				key: 'recommend',
				name: '推薦商品',
			},
			{
				id: 1,
				key: 'new',
				name: '最新商品',
			},
			{
				id: 2,
				key: 'sort',
				// name: '價格排序',
				html: '<span class="font-xl">價格排序</span><span class="font-ex">高<br>低</span>'
			},
			{
				id: 3,
				key: 'sort',
				// name: '價格排序',
				html: '<span class="font-xl">價格排序</span><span class="font-ex">高<br>低</span>'
			},
		],
	},
	menu: {
		name : '上方選單',
		open: true, // 是否開啟
		list: [
			{
				id: 0,
				key: 'confirm',
				name: '待確認',
				icon: './img/icon/menu-confirm.png',
				quantity: 50,
			},
			{
				id: 1,
				key: 'today',
				name: '本日訂單',
				icon: './img/icon/menu-today.png',
				quantity: 50,
			},
			{
				id: 2,
				key: 'month',
				name: '本月訂單',
				icon: './img/icon/menu-month.png',
				quantity: 50,
			},
			{
				id: 3,
				key: 'all',
				name: '全部訂單',
				icon: './img/icon/menu-all.png',
				quantity: 50,
			},
			{
				id: 4,
				key: 'cancel',
				name: '已取消',
				icon: './img/icon/menu-cancel.png',
				quantity: 0,
			},
			{
				id: 5,
				key: 'other',
				name: '其他',
				icon: './img/icon/menu-cancel.png',
				quantity: 42,
			},
			{
				id: 6,
				key: 'other',
				name: '其他',
				icon: './img/icon/menu-cancel.png',
				quantity: 42,
			},
			/*
			{
				id: 0,
				key: 'common',
				name: '常用',
				icon: './img/icon-common.png',
				quantity: 50,
			},
			{
				id: 1,
				key: 'paint',
				name: '塗料',
				icon: './img/icon-paint.png',
				quantity: 50,
			},
			{
				id: 2,
				key: 'tool',
				name: '工具',
				icon: './img/icon-tool.png',
				quantity: 50,
			},
			{
				id: 3,
				key: 'cleaning',
				name: '清潔',
				icon: './img/icon-cleaning.png',
				quantity: 50,
			},
			{
				id: 4,
				key: 'work',
				name: '施工',
				icon: './img/icon-work.png',
				quantity: 150,
			},
			{
				id: 5,
				key: 'other',
				name: '其他',
				icon: './img/icon-other.png',
				quantity: 42,
			},
			{
				id: 6,
				key: 'QQ',
				name: 'QQ',
				icon: './img/icon-QQ.png',
				quantity: 50,
			},
			*/
		],
	},
	product: {
		name: '商品列表',
		list: [
			{
				id: '245613',
				name: '壁癌殺手III Sener大大',
				pic: './img/product/paintII.png',
				state: true,
				unit: '箱',
				quantity: 5, // 目前下單數量
				quantityTotal: 100, // 僅剩數量
			},
		],
	},
	order: {
		name: '訂單確認',
		list: [
			{
				id: '000888797846431313',
				status: '已付款ㄋ',
				time: '2017/11/26 12:01:10',
				list: [
					{
						id: '245613',
						name: '壁癌殺手III Sener大大',
						pic: './img/product/paintII.png',
						state: true,
						unit: '箱',
						quantity: 5, // 下單數量
						quantityTotal: 100, // 總訂購數量
					},
				],
			},
			{
				id: '000888797846431313',
				status: '還沒付＄ㄋ',
				time: '2055/11/26 12:01:10',
				list: [
					{
						id: '245613',
						name: '壁癌殺手III Sener大大',
						pic: './img/product/paintII.png',
						state: true,
						unit: '箱',
						quantity: 5, // 下單數量
						quantityTotal: 100, // 總訂購數量
					},
				],
			},
		],
	},
};



