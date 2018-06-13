<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("basePath", basePath);
%>
<meta charset="utf-8" />
<!-- 基本 -->
<link rel="stylesheet" type="text/css"
	href="${basePath}css/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${basePath}css/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${basePath}css/themes/color.css">
<link rel="stylesheet" type="text/css"
	href="${basePath}css/demo/demo.css">
<script type="text/javascript" src="${basePath}js/jquery.min.js"></script>
<script type="text/javascript" src="${basePath}js/jquery.easyui.min.js"></script>
<!-- 自定义 -->
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript" src="js/user/alterPass.js"></script>
<style>
.form-control {
	margin-bottom: 10px;
}
</style>
<body style="text-align: center;">
	<!-- 请求方式: get/post，默认get -->
	<div class="form-control">
		<a id="sendEmail" href="javascript:void(0);">给老吴发送一封赞美的邮件</a>
	</div>
	<form id="uploadForm" enctype="multipart/form-data">
		<input type="hidden" id="uid" value="${user.uid }">
		<div class="form-control">
			<img id="pic" width="200" height="100"
				style="border: 1px solid gray;"
				src="UserServlet?tp=pic&uid=${user.uid }"
				onerror="defaultImg(this,'${basePath}/img/noting.jpg')">
		</div>
		<div class="form-control">
			<input id="uploadFile" name="uploadFile" /><a
				href="javascript:void(0);" class="easyui-linkbutton"
				style="width: 100px; text-align: center;" onclick="uploadSubmit();">上&emsp;传</a>
		</div>
	</form>
	<form id="alterPassForm" action="AlterPassServlet" method="post">
		<div class="form-control">
			<input id="name" name="name" value="${user.name }" readonly />
		</div>
		<div class="form-control">
			<input id="idCard" name="idCard" value="${user.idCard }" readonly />
		</div>
		<div class="form-control">
			<input id="oldpass" name="oldpass" />
		</div>
		<div class="form-control">
			<input id="newpass" name="newpass" />
		</div>
		<div class="form-control ">
			<a href="javascript:void(0);" class="easyui-linkbutton"
				style="width: 100px; text-align: center;" onclick="alterSubmit(); ">提&emsp;交</a>
		</div>
	</form>
</body>