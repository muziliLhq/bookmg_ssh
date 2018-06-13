$(document).ready(function() {
	$('#idCard').textbox({
		label : 'ID Card:',
		iconCls : 'icon-man',
		width : 300,
		prompt : 'please input idcard...',
		required : true
	});
	$('#password').textbox({
		label : 'Password:',
		iconCls : 'icon-lock',
		type : 'password',
		width : 300,
		required : true
	});
});

// 表单提交
function loginSubmit() {
	$('#form').form('submit', {
		onSubmit : function() { // 提交动作发生时，回调的函数
			var isValid = $(this).form('validate');
			if (!isValid) {
				$.messager.progress('close'); // 验证失败，隐藏进度条
			}
			// 当form验证通过，利用jq的方式进行传统的表单提交
			console.log($('#form').serialize());
			$('#form').submit();
			return false;
		}
	});
}