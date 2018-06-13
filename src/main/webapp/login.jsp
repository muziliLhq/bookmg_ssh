<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

	request.setAttribute("basePath", basePath);
%>
<!DOCTYPE html>
<html>
<head>
<title>Entor图书管理系统-登录</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 基本 -->
<link rel="shortcut icon" href="${basePath}img/bitbug_favicon.ico">
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
<script type="text/javascript" src="${basePath}js/datagrid-filter.js"></script>
<script type="text/javascript" src="${basePath}js/easyui-lang-zh_CN.js"></script>
<!-- 自定义 -->
<script type="text/javascript" src="${basePath}/js/user/login.js"></script>
<style type="text/css">
.form-control {
	margin-bottom: 20px;
}
</style>
</head>
<body>
	<!-- 请求方式: get/post，默认get -->
	<form id="form" action="${basePath}user/login.action" method="post"
		style="border: 1px solid black; width: 800px; margin: 0 auto; text-align: center;">
		<div class="form-control">
			<h1>
				欢迎使用Entor图书管理系统<sup>v2018</sup>
			</h1>
		</div>
		<div class="form-control">
			<c:if test="${messageStore.message} != null}">
				<span style="color: red">${messageStore.message}</span>
			</c:if>
		</div>
		<div class="form-control">
			<input id="idCard" name="idCard" /><span
				style="display: none; color: red" id="idCard_err_msg">用户名不存在</span>
		</div>
		<div class="form-control">
			<input id="password" name="password" />
		</div>
		<div class="form-control ">
			<a href="javascript:void(0);" class="easyui-linkbutton"
				style="width: 100px;" onclick="loginSubmit(); ">登&emsp;录</a>
		</div>
	</form>
</body>
</html>