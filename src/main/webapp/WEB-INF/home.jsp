<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

	request.setAttribute("basePath", basePath);
%>
<!DOCTYPE html>
<html>

<head>
<title>Entor图书管理系统-后台管理</title>
<meta charset="utf-8" />
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

<!-- 自定义 -->
<link rel="stylesheet" type="text/css"
	href="${basePath}css/admin/home.css">
<script type="text/javascript" src="${basePath}js/admin/home.js"></script>
</head>
<body>
	<div id="home_layout" class="easyui-layout"
		data-options="border:false,fit:true">
		<div data-options="region:'north'"
			style="height: 100px; background: #E0ECFF;">
			<h1>Entor图书管理系统</h1>
			<ul class="north_ul">
				<li>欢迎[${user.name}]</li>
				<li><a href="javascript:void(0);" onclick="alterPass();">修改密码</a></li>
				<li>|</li>
				<li><a href="UserServlet?tp=logout"
					onclick="return confirm('确认退出吗');">退出登录</a></li>
			</ul>
		</div>
		<div data-options="region:'south'"
			style="height: 50px; line-height: 48px; text-align: center; background: #E0ECFF;">
			Copyright © 2010-2018 <a href="http://www.entor.com.cn">易唐科技</a>${message }
		</div>
		<div data-options="region:'west',split:true" title="导航菜单"
			style="width: 150px;">
			<div id="aa" class="easyui-accordion">
				<div title="系统管理" style="padding: 10px;"
					data-options="iconCls:'icon-cog'">
					<div class="menu-contrl">
						<span class="icon-user">&emsp;</span> <a
							href="javascript:void(0);">用户管理</a>
					</div>
				</div>
				<div title="书籍管理" style="padding: 10px;"
					data-options="iconCls:'icon-book'">
					<div class="menu-contrl">
						<span class="icon-book">&emsp;</span> <a
							href="javascript:void(0);">书籍管理</a>
					</div>
					<div class="menu-contrl">
						<span class="icon-book_rent">&emsp;</span> <a
							href="javascript:void(0);">借书管理</a>
					</div>
					<div class="menu-contrl">
						<span class="icon-book_return">&emsp;</span> <a
							href="javascript:void(0);">还书管理</a>
					</div>
				</div>
			</div>
		</div>
		<div data-options="region:'center'">
			<div id="home_tab" class="easyui-tabs"
				data-options="fit:true,bodyCls:'bodycls'">
				<div id="welcome" title="欢迎"
					data-options="iconCls:'icon-welcome',bodyCls:'bodycls'">
					<h1>欢迎使用Entor图书管理系统</h1>
				</div>
			</div>
		</div>
		<div id="alter_pass_dialog"></div>
	</div>
</body>

</html>
