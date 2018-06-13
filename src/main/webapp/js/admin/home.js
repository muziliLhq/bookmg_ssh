$(document).ready(function() {

	basePath = $(':hidden').val();

	systime = '当前时间: ' + dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss');
	$('#systime').text(systime);
	setInterval(function() {
		systime = '当前时间: ' + dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss');
		$('#systime').text(systime);
	}, 1000);

	$('#home_tab').tabs({
		border : false
	});

	// 菜单点击事件绑定
	$('div.menu-contrl > a').click(function(event) {

		// 调用具体跳转逻辑
		menuSwitch($(this));
	});
});

/**
 * 日期格式化
 * 
 * @param date
 * @param pattern
 * @returns
 */
function dateFormat(date, pattern) {
	if ('yyyy-MM-dd HH:mm:ss' === pattern) {

		var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1)
				: (date.getMonth() + 1);
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		return date.getFullYear() + '-' + month + '-' + day + ' '
				+ date.getHours() + ':' + date.getMinutes() + ':'
				+ date.getSeconds();
	}
}

function menuSwitch(that) {
	switch (that.text()) {
	case '用户管理':
		// 创建用户管理的tab
		var content = '<iframe scrolling="auto" frameborder="0"  src="' + basePath + 'userList" style="width:100%;height:100%;"></iframe>';
		createTab('用户管理', 'user_mg', 'icon-user', content);
		break;
	case '书籍管理':
		// 创建书籍管理的tab
		var content = '<iframe scrolling="auto" frameborder="0"  src="' + basePath + 'bookList" style="width:100%;height:100%;"></iframe>';
		createTab('书籍管理', 'book_mg', 'icon-book', content);
		break;
	case '借书管理':
		// 创建书籍管理的tab
		var content = '<iframe scrolling="auto" frameborder="0"  src="' + basePath + 'rentBook" style="width:100%;height:100%;"></iframe>';
		createTab('借书管理', 'rentbook_mg', 'icon-book_rent', content);
		break;
	case '还书管理':
		// 创建书籍管理的tab
		var content = '<iframe scrolling="auto" frameborder="0"  src="' + basePath + 'returnBook" style="width:100%;height:100%;"></iframe>';
		createTab('还书管理', 'returnbook_mg', 'icon-book_return', content);
		break;
	}
}

function createTab(title, id, icon, content) {
	if (!$('#home_tab').tabs('exists', title)) {
		$('#home_tab').tabs('add', {
			id : id,
			title : title,
			iconCls : icon,
			bodyCls : 'bodycls',
			closable : true,
			content : content
		});
	} else {
		$('#home_tab').tabs('select', title);
	}
}

/**
 * 修改密码
 * 
 * @returns
 */
function alterPass() {
	var alterPassContent = '<iframe scrolling="auto" frameborder="0"  src="alterPass.jsp" style="width:100%;height:98%;"></iframe>';
	$('#alter_pass_dialog').dialog({
		title : '用户密码修改',
		width : 600,
		height : 480,
		closed : false,
		cache : false,
		content : alterPassContent,
		modal : true
	});
}