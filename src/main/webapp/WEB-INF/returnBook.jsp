<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

	request.setAttribute("basePath", basePath);
%>
<!DOCTYPE html>
<html>
<head>
<!-- 基本 -->
<link rel="shortcut icon" href="img/bitbug_favicon.ico">
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
<script type="text/javascript" src="js/book/returnbook.js"></script>
<style>
.form-control {
	margin-bottom: 10px;
}
</style>
</head>
<body>
	<div class=".form-control">
		<input id="uid" name="uid"> <a href="javascript:void(0);"
			class="easyui-linkbutton" onclick="queryUser();">查询</a>
	</div>
	<div class="easyui-panel" title="借阅信息"
		data-options="width:720,height:300,iconCls:'icon-book_rent'">
		<table id="dg_returnbook"></table>
	</div>
</body>
</html>