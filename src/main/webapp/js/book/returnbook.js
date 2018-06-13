$(document).ready(function() {
	$('#uid').textbox({
		label : '用户id:',
		iconCls : 'icon-man',
		width : 300,
		prompt : 'please input uid...',
		required : true
	});
});

function queryUser() {
	var uid = $('#uid').val();
	if (isNaN(parseInt(uid))) {
		$.messager.alert('警告', '请输入正确的用户id，再点击查询按钮！');
		return false;
	}
	$.ajax({
		url : 'UserServlet?tp=get&uid=' + uid,
		dataType : 'json',
		success : function(data) {
			if (data && data.status != 0) {
				if (data.rentBooks.length > 0) {
					returnBookTb(data);
				} else {
					$.messager.alert('警告', '该用户没有借阅书籍！');
				}
			} else {
				$.messager.alert('警告', '该用户不存在或已被冻结使用！');
			}
		}
	});
}

function returnBookTb(user) {
	var returnbookgrid = {
		fit : true,
		data : [ user ],
		columns : [ [
				{
					field : 'uid',
					title : '用户ID',
					width : 100
				},
				{
					field : 'name',
					title : '姓名',
					width : 300
				},
				{
					field : 'idCard',
					title : '身份证',
					width : 100
				},
				{
					field : 'rentBooks',
					title : '借阅书籍ID',
					width : 100
				},
				{
					field : 'action',
					title : '操作',
					width : 100,
					align : 'center',
					formatter : function(value, row, index) {
						return '<a href="javascript:void(0)" onclick="returnBook('
								+ row.uid + ')">还书</a>&emsp;';
					}
				} ] ]
	}
	$('#dg_returnbook').datagrid(returnbookgrid);
}

function returnBook(uid) {
	$.messager.prompt({
		title : '提示',
		msg : '请输入借阅书籍ID',
		fn : function(bid) {
			if (bid) {
				$.ajax({
					url : 'BookServlet?tp=return',
					type : 'post',
					data : {
						bid : bid,
						uid : uid
					},
					dataType : 'json',
					success : function(data) {
						$.messager.alert('警告', data.msg);
						if (data.success) {
							$.ajax({
								url : 'UserServlet?tp=get&uid=' + uid,
								dataType : 'json',
								success : function(data) {
									if (data)
										returnBookTb(data);
								}
							});
						}
					}
				});
			}
		}
	});
}