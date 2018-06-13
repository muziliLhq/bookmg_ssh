$(document).ready(function() {
	$('#bid').textbox({
		label : '书籍id:',
		iconCls : 'icon-book',
		width : 300,
		prompt : 'please input bid...',
		required : true
	});
});

function queryBook() {
	var bid = $('#bid').val();
	if (isNaN(parseInt(bid))) {
		$.messager.alert('警告', '请输入正确的书籍id，再点击查询按钮！');
		return false;
	}
	$.ajax({
		url : 'BookServlet?tp=get&bid=' + bid,
		dataType : 'json',
		success : function(data) {
			if (data && data.amount > 0) {
				rentBookTb(data);
			} else {
				$.messager.alert('警告', '没有可供借阅的书籍！');
			}
		}
	});
}

function rentBookTb(book) {
	var rentbookgrid = {
		fit : true,
		data : [ book ],
		columns : [ [
				{
					field : 'bid',
					title : '书籍ID',
					width : 100
				},
				{
					field : 'bookName',
					title : '书籍名称',
					width : 300
				},
				{
					field : 'amount',
					title : '书籍数量',
					width : 100,
					align : 'right'
				},
				{
					field : 'action',
					title : '操作',
					width : 100,
					align : 'center',
					formatter : function(value, row, index) {
						return '<a href="javascript:void(0)" onclick="rentBook('
								+ row.bid + ')">借阅</a>&emsp;';
					}
				} ] ]
	}
	$('#dg_rentbook').datagrid(rentbookgrid);
}

function rentBook(bid) {
	$.messager.prompt({
		title : '提示',
		msg : '请输入借阅人ID',
		fn : function(uid) {
			if (uid) {
				$.ajax({
					url : 'BookServlet?tp=rent',
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
								url : 'BookServlet?tp=get&bid=' + bid,
								dataType : 'json',
								success : function(data) {
									if (data)
										rentBookTb(data);
								}
							});
						}
					}
				});
			}
		}
	});
}