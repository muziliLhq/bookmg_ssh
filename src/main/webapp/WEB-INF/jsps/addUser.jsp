<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    request.setAttribute("basePath", basePath);
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
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
    <script type="text/javascript" src="${basePath}js/user/addUser.js"></script>
    <style>
        .form-control {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
<input type="hidden" value="${basePath}">
<!-- 请求方式: get/post，默认get -->
<form id="userForm" action="${basePath}user/add" method="post" style="width: 400px; margin: 0 auto;">
    <p>${messageStore.message}</p>
    <div class="form-control">
        <input id="name" name="name"/>*必须
    </div>
    <div class="form-control">
        <input id="idCard" name="idCard"/>*必须
    </div>
    <div class="form-control">
        <select id="status" name="status">
            <option value="0">冻结</option>
            <option value="1">普通用户</option>
            <option value="2">管理员</option>
        </select>*必须
    </div>
    <div class="form-control ">
        <a href="javascript:void(0);" class="easyui-linkbutton"
           style="width: 300px; text-align: center;" onclick="addUser();">提&emsp;交</a>
    </div>
</form>
</body>
</html>