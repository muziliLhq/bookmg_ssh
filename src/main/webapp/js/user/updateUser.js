$(document).ready(function() {
	$('#uid').textbox({
		label : '用户id:',
		iconCls : 'icon-man',
		width : 300,
		prompt : 'please input uid...',
		required : true
	});
	$('#name').textbox({
		label : '姓名:',
		iconCls : 'icon-man',
		width : 300,
		prompt : 'please input name...',
		required : true
	});
	$('#idCard').textbox({
		label : '身份证:',
		iconCls : 'icon-man',
		width : 300,
		prompt : 'please input idcard...',
		required : true
	});
	$('#password').textbox({
		label : '密码:',
		iconCls : 'icon-lock',
		type : 'password',
		width : 300,
		required : true
	});
	$('#status').combobox({
		valueField : 'status',
		textField : 'text',
		width : 300,
		panelHeight : 100
	});
});

/**
 * 更新用户表单提交
 * 
 * @returns
 */
function updateUser() {
	$('#userForm').form('submit', {
		onSubmit : function() { // 提交动作发生时，回调的函数
			var isValid = $(this).form('validate');
			if (!isValid) {
				$.messager.progress('close'); // 验证失败，隐藏进度条
				return false;
			}
			// 利用ajax方式提交表单
			// ajaxUpdateSubmit();
            $('#userForm').submit();
			return false;
		}
	});
}