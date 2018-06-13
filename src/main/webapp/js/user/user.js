$(document).ready(function () {
    basePath = $(':hidden').val();
    listInit();
});

function listInit() {
    var grid = {
        url: basePath + 'user/list',
        method: 'get',
        singleSelect: false, // 多行可选，如果是true，单行可选
        fit: false,
        fitColumns: true,
        striped: true,
        rownumbers: true, // 显示行号
        pagination: true, // 打开分页栏
        loadFilter: pageFilter,// 在数据加载到控件之前，过滤数据的处理
        columns: [[
            {
                field: 'ck',
                checkbox: true
                // 显示多选框
            },
            {
                field: 'uid',
                title: '用户ID',
                width: 50
            },
            {
                field: 'name',
                title: '姓名',
                width: 50
            },
            {
                field: 'idCard',
                title: '身份证',
                width: 50
            },
            {
                field: 'rentBooks',
                title: '租赁书籍',
                width: 50
            },
            {
                field: 'status',
                title: '状态',
                width: 50,
                formatter: function (value, row, index) {
                    switch (value) {
                        case 0:
                            return "冻结";
                        case 1:
                            return "正常";
                        case 2:
                            return "管理员";
                    }
                },
                styler: function (value, row, index) {
                    switch (value) {
                        case 0:
                            return "color:red";
                        case 1:
                            return "color:green";
                        case 2:
                            return "color:orange";
                    }
                }
            },
            {
                field: 'action',
                title: '操作',
                width: 70,
                align: 'center',
                formatter: function (value, row, index) {
                    var look = '<a href="javascript:void(0)" onclick="look(this)">查看</a>&emsp;';
                    var update = '<a href="javascript:void(0)" onclick="update(this);">更新</a>&emsp;';
                    var froze;
                    if (row.status == 0)
                        froze = '<a href="javascript:void(0)" onclick="unfroze(this)">解冻</a>&emsp;';
                    else
                        froze = '<a href="javascript:void(0)" onclick="froze(this);">冻结</a>&emsp;';

                    var del = '<a href="javascript:void(0)" onclick="deleteUser(this)">删除</a>';
                    return look + update + froze + del;
                }
            }]],
        toolbar: '#user_toolbar'
        /*
         * , footer : '#ft'
         */
    };
    $('#dg_user').datagrid(grid);
    $('.datagrid-cell').css('font-size', '14px');
}

// 假分页： 先获得所有数据，然后分页
function pageFilter(data) {
    data = JSON.parse(data);
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
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;// 新的页码
            opts.pageSize = pageSize;// 新的每页记录数量
            console.log(pageNum + ',' + pageSize);
            // 刷新分页栏信息
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            // 重新加载data记录
            dg.datagrid('loadData', data);
        }
    });

    // 将原始记录保存到originalRows中
    if (!data.originalRows) {
        data.originalRows = data.rows;
    }

    // 分页的起始位置
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);

    // 结束分页位置
    var end = start + parseInt(opts.pageSize);

    // 将原始记录从start->end部分的数据提取出来，放到rows中并返回data，这样就完成了分页
    data.rows = data.originalRows.slice(start, end);
    return data;
}

/**
 * 根据操作获取相应的用户id
 *
 * @param that
 * @returns
 */
function getActionUid(that) {
    return $(that).parent().parent().siblings().eq(1).children().eq(0).text();
}

/**
 * 冻结
 *
 * @param that
 * @returns
 */
function look(that) {
    var uid = getActionUid(that);
    var lookUserContent = '<iframe scrolling="auto" frameborder="0"  src="' + basePath + 'user/lookPage?uid='
        + uid + '" style="width:100%;height:98%;"></iframe>';
    $('#update_user_dialog').dialog({
        title: '查看用户',
        width: 500,
        height: 300,
        closed: false,
        cache: false,
        content: lookUserContent,
        modal: true,// 模态框
        onClose: function () {
            $('#dg_user').datagrid('reload');
        }
    });
}

/**
 * 冻结
 *
 * @param that
 * @returns
 */
function froze(that) {
    $.messager.confirm('确认', '确定冻结该用户吗?', function (r) {
        if (r) {
            var uid = getActionUid(that);
            // ajax基于get方式的请求
            $.get(basePath + "user/froze", {
                uid: uid,
                status: 0
            }, function (data) {
                // 刷新grid
                $.messager.alert('操作提示', JSON.parse(data).message);
                $('#dg_user').datagrid('reload');
            });
        }
    });
}

/**
 * 解冻
 *
 * @param that
 * @returns
 */
function unfroze(that) {
    $.messager.confirm('确认', '确定解除冻结吗?', function (r) {
        if (r) {
            var uid = getActionUid(that);
            // ajax基于get方式的请求
            $.get(basePath + "user/unfroze", {
                uid: uid,
                status: 1
            }, function (data) {
                // 刷新grid
                $.messager.alert('操作提示', JSON.parse(data).message);
                $('#dg_user').datagrid('reload');
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
    $.messager.confirm('确认', '确定删除该用户吗?', function (r) {
        if (r) {
            var uid = getActionUid(that);
            // ajax基于get方式的请求
            $.get(basePath + "user/delete", {
                uid: uid,
            }, function (data) {
                // 刷新grid
                $.messager.alert('操作提示', JSON.parse(data).message);
                $('#dg_user').datagrid('reload');
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
    var addUserContent = '<iframe scrolling="auto" frameborder="0"  src="' + basePath + 'user/addPage" style="width:100%;height:98%;"></iframe>';
    $('#update_user_dialog').dialog({
        title: '添加用户',
        width: 500,
        height: 350,
        closed: false,
        cache: false,
        content: addUserContent,
        modal: true,// 模态框
        onClose: function () {
            $('#dg_user').datagrid('reload');
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
    var uid = getActionUid(that);
    var updateUserContent = '<iframe scrolling="auto" frameborder="0"  src="' + basePath + 'user/updatePage?uid='
        + uid + '" style="width:100%;height:98%;"></iframe>';
    $('#update_user_dialog').dialog({
        title: '更新用户',
        width: 500,
        height: 350,
        closed: false,
        cache: false,
        content: updateUserContent,
        modal: true,// 模态框
        onClose: function () {
            $('#dg_user').datagrid('reload');
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
    var rows = $('#dg_user').datagrid('getSelections');
    if (rows.length == 0)
        $.messager.alert('提示', '请选中行...');
    else {
        $.messager.confirm('确认', '确定批量删除' + rows.length + '个用户吗?', function (r) {
            if (r) {
                var uids = [];
                for (var index in rows) {
                    uids.push(rows[index].uid);
                }
                // ajax基于post方式的请求
                $.ajax({
                    url: basePath + 'user/batchDelete',
                    data: {
                        uids: uids,
                    },
                    dataType: "json",
                    type: "post",
                    traditional: true,// 这里设为true就可以了
                    success: function (data) {
                        // 刷新grid
                        $.messager.alert('操作提示', JSON.parse(data).message);
                        $('#dg_user').datagrid('reload');
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
        url: basePath + 'user/search',
        data: {
            name: $('#name').val()
        },
        type: "post",
        dataType: 'json',
        success: function (data) {
            $("#dg_user").datagrid("loadData", data); // 动态取数据
        }
    });
}