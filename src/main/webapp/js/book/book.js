$(document).ready(function() {
	listInit();
});

function listInit() {
	var grid = {
		url : 'BookServlet?tp=list',
		method : 'get',
		singleSelect : false, // 多行可选，如果是true，单行可选
		fit : false,
		fitColumns : true,
		striped : true,
		rownumbers : true, // 显示行号
		pagination : true, // 打开分页栏
		loadFilter : pageFilter,// 在数据加载到控件之前，过滤数据的处理
		columns : [ [
				{
					field : 'ck',
					checkbox : true
				// 显示多选框
				},
				{
					field : 'bid',
					title : '书籍ID',
					width : 50
				},
				{
					field : 'bookName',
					title : '书名',
					width : 100
				},
				{
					field : 'amount',
					title : '数量',
					width : 50
				},
				{
					field : 'thumbnail',
					title : '书籍缩略图',
					width : 50,
					height : 50,
					formatter : function(value, row, index) {
						var thumbnail = '<img width=100 height=50 src="img/books/'
								+ value + '?' + Math.random() + '">';
						return thumbnail;
					}
				},
				{
					field : 'status',
					title : '状态',
					width : 50,
					formatter : function(value, row, index) {
						switch (value) {
						case 0:
							return "下架";
						case 1:
							return "上架";
						}
					},
					styler : function(value, row, index) {
						switch (value) {
						case 0:
							return "color:red";
						case 1:
							return "color:green";
						}
					}
				},
				{
					field : 'action',
					title : '操作',
					width : 70,
					align : 'center',
					formatter : function(value, row, index) {
						var look = '<a href="javascript:void(0)" onclick="look(this)">查看</a>&emsp;';
						var update = '<a href="javascript:void(0)" onclick="update(this);">更新</a>&emsp;';
						var undercarriage;
						if (row.status == 0)
							undercarriage = '<a href="javascript:void(0)" onclick="grounding(this)">上架</a>&emsp;';
						else
							undercarriage = '<a href="javascript:void(0)" onclick="undercarriage(this);">下架</a>&emsp;';

						var del = '<a href="javascript:void(0)" onclick="deleteUser(this)">删除</a>';
						return look + update + undercarriage + del;
					}
				} ] ],
		toolbar : '#book_toolbar'
	};
	$('#dg_book').datagrid(grid);
}

// 假分页： 先获得所有数据，然后分页
function pageFilter(data) {
	// 获得当前datagrid
	var dg = $(this);
	// 获得当前datagrid的options选项
	var opts = dg.datagrid('options');
	// 获得当前datagrid的分页对象
	var pager = dg.datagrid('getPager');
	console.log(dg, opts);
	console.log(pager);

	// 分页对象的onSelectPage事件
	pager.pagination({
		onSelectPage : function(pageNum, pageSize) {
			opts.pageNumber = pageNum;// 新的页码
			opts.pageSize = pageSize;// 新的每页记录数量
			console.log(pageNum + ',' + pageSize);
			// 刷新分页栏信息
			pager.pagination('refresh', {
				pageNumber : pageNum,
				pageSize : pageSize
			});
			// 重新加载data记录
			dg.datagrid('loadData', data);
		}
	});

	// 将原始记录保存到originalRows中
	if (!data.originalRows) {
		data.originalRows = data.rows;
	}
	console.log(data.originalRows);

	// 分页的起始位置
	var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);

	// 结束分页位置
	var end = start + parseInt(opts.pageSize);

	// 将原始记录从start->end部分的数据提取出来，放到rows中并返回data，这样就完成了分页
	data.rows = data.originalRows.slice(start, end);
	return data;
}

/**
 * 根据操作获取相应的书籍id
 * 
 * @param that
 * @returns
 */
function getActionBid(that) {
	return $(that).parent().parent().siblings().eq(1).children().eq(0).text();
}

/**
 * 下架
 * 
 * @param that
 * @returns
 */
function look(that) {
	var bid = getActionBid(that);
	var lookUserContent = '<iframe scrolling="auto" frameborder="0"  src="BookServlet?tp=look&bid='
			+ bid + '" style="width:100%;height:98%;"></iframe>';
	$('#update_user_dialog').dialog({
		title : '查看用户',
		width : 500,
		height : 300,
		closed : false,
		cache : false,
		content : lookUserContent,
		modal : true,// 模态框
		onClose : function() {
			$('#dg_book').datagrid('reload');
		}
	});
}

/**
 * 下架
 * 
 * @param that
 * @returns
 */
function undercarriage(that) {
	$.messager.confirm('确认', '确定下架该用户吗?', function(r) {
		if (r) {
			var bid = getActionBid(that);
			// ajax基于get方式的请求
			$.get("BookServlet", {
				bid : bid,
				tp : 'undercarriage'
			}, function(data) {
				// 刷新grid
				$.messager.alert('操作提示', data);
				$('#dg_book').datagrid('reload');
			});
		}
	});
}

/**
 * 上架
 * 
 * @param that
 * @returns
 */
function grounding(that) {
	$.messager.confirm('确认', '确定下架吗?', function(r) {
		if (r) {
			var bid = getActionBid(that);
			// ajax基于get方式的请求
			$.get("BookServlet", {
				bid : bid,
				tp : 'grounding'
			}, function(data) {
				// 刷新grid
				$.messager.alert('操作提示', data);
				$('#dg_book').datagrid('reload');
			});
		}
	});
}

/**
 * 删除
 * 
 * @param that
 * @returns
 */
function deleteUser(that) {
	$.messager.confirm('确认', '确定删除该用户吗?', function(r) {
		if (r) {
			var bid = getActionBid(that);
			// ajax基于get方式的请求
			$.get("BookServlet", {
				bid : bid,
				tp : 'delete'
			}, function(data) {
				// 刷新grid
				$.messager.alert('操作提示', data);
				$('#dg_book').datagrid('reload');
			});
		}
	});
}

/**
 * 更新
 * 
 * @param that
 * @returns
 */
function addUser(that) {
	var addUserContent = '<iframe scrolling="auto" frameborder="0"  src="addUser.jsp" style="width:100%;height:98%;"></iframe>';
	$('#update_user_dialog').dialog({
		title : '添加用户',
		width : 500,
		height : 350,
		closed : false,
		cache : false,
		content : addUserContent,
		modal : true,// 模态框
		onClose : function() {
			$('#dg_book').datagrid('reload');
		}
	});
}

/**
 * 更新
 * 
 * @param that
 * @returns
 */
function update(that) {
	var bid = getActionBid(that);
	var updateUserContent = '<iframe scrolling="auto" frameborder="0"  src="BookServlet?tp=update&bid='
			+ bid + '" style="width:100%;height:98%;"></iframe>';
	$('#update_user_dialog').dialog({
		title : '更新用户',
		width : 500,
		height : 350,
		closed : false,
		cache : false,
		content : updateUserContent,
		modal : true,// 模态框
		onClose : function() {
			$('#dg_book').datagrid('reload');
		}
	});
}

/**
 * 批量删除
 * 
 * @param rows
 * @returns
 */
function batchDel() {
	var rows = $('#dg_book').datagrid('getSelections');
	if (rows.length == 0)
		$.messager.alert('提示', '请选中行...');
	else {
		$.messager.confirm('确认', '确定批量删除' + rows.length + '个用户吗?', function(r) {
			if (r) {
				var bids = [];
				for ( var index in rows) {
					bids.push(rows[index].bid);
				}
				// ajax基于post方式的请求
				$.ajax({
					url : 'BookServlet',
					data : {
						bids : bids,
						tp : 'batchDel'
					},
					dataType : "json",
					type : "POST",
					traditional : true,// 这里设为true就可以了
					success : function(data) {
						// 刷新grid
						$.messager.alert('操作提示', data.msg);
						$('#dg_book').datagrid('reload');
					}
				});
			}
		});
	}
}

/**
 * 搜索用户
 * 
 * @returns
 */
function searchUser() {
	$.ajax({
		url : 'BookServlet',
		data : {
			tp : 'search',
			keywords : $('#keywords').val()
		},
		type : "POST",
		dataType : 'json',
		success : function(data) {
			$("#dg_book").datagrid("loadData", data); // 动态取数据
		}
	});
}