$(document).ready(function() {
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
	$('#oldpass').textbox({
		label : '旧密码:',
		iconCls : 'icon-lock',
		type : 'password',
		width : 300,
		required : true
	});
	$('#newpass').textbox({
		label : '新密码:',
		iconCls : 'icon-lock',
		type : 'password',
		width : 300,
		required : true
	});
	$('#sendEmail').click(function(event) {
		$.ajax({
			url : 'SendEmailServlet',
			dataType : 'json',
			success : function(data) {
				$.messager.alert('提示', data.msg);
			}
		});
	});
	$('#uploadFile').filebox({
		buttonText : '选择一个文件:',
		width : 300,
		buttonAlign : 'left',
		required : true,
		onChange : function(newValue, oldValue) {
			// 获得上传的文件对象
			var file = $('#filebox_file_id_1')[0].files[0];
			// 创建一个文件读取器对象
			var freader = new FileReader();
			// 读取新的文件的URL
			freader.readAsDataURL(file);
			// 当新文件加载的时候，进行回显操作
			freader.onload = function(e) {
				$("#pic").attr("src", e.target.result);
			}
		}
	});
});

/**
 * 默认图片
 * 
 * @param that
 * @param src
 * @returns
 */
function defaultImg(that, src) {
	that.onerror = null;// 将onerror置空防止死循环
	that.src = src + '?' + Math.random();
}

/**
 * 上传提交
 * 
 * @returns
 */
function uploadSubmit() {
	$('#uploadForm').form('submit', {
		onSubmit : function() { // 提交动作发生时，回调的函数
			var isValid = $(this).form('validate');
			if (!isValid) {
				$.messager.progress('close'); // 验证失败，隐藏进度条
				return false;
			}
			// 利用ajax方式进行个人相片上传
			ajaxUpload();
			return false;
		}
	});
}

/**
 * 通过ajax技术实现文件上传
 * 
 * @returns
 */
function ajaxUpload() {
	// 利用FormData封装文件数据
	var formData = new FormData();
	formData.append('file', $('#filebox_file_id_1')[0].files[0]);
	$.ajax({
		url : 'UserServlet?tp=upload&uid=' + $('#uid').val(),
		type : 'POST',
		cache : false,// 上传不需要缓存
		data : formData,
		dataType : 'json',
		processData : false,// 上传不需要做处理
		contentType : false,// 上传不指定类型
		success : function(data) {
			$.messager.alert('提示', data.msg);
		}
	});
}

/**
 * 修改密码表单提交
 * 
 * @returns
 */
function alterSubmit() {
	$('#alterPassForm').form('submit', {
		onSubmit : function() { // 提交动作发生时，回调的函数
			var isValid = $(this).form('validate');
			if (!isValid) {
				$.messager.progress('close'); // 验证失败，隐藏进度条
				return false;
			}
			// 利用ajax方式提交表单
			ajaxAlterSubmit();
			return false;
		}
	});
}

/**
 * ajax方式提交表单
 * 
 * @returns
 */
function ajaxAlterSubmit() {
	// 将表单参数转换成表单的js对象
	// 将表单的js对象转换成json字符串
	$.ajax({
		url : 'UserServlet',
		method : 'post',
		data : {
			tp : 'alterpass',
			formData : JSON.stringify(formDataToJson())
		},
		dataType : 'json',
		success : function(data) {
			$.messager.alert('提示', data.msg);
		}
	})
}

/**
 * 将表单参数数组转成json对象
 * 
 * @returns
 */
function formDataToJson() {
	var formArray = $('#alterPassForm').serializeArray();
	var formJsonObject = {};
	for (var index = 0; index < formArray.length; index++) {
		var temp = formArray[index];
		formJsonObject[temp.name] = temp.value;
	}
	return formJsonObject;
}
