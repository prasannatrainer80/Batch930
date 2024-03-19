<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<jsp:useBean id="obj" class="com.java.beans.Employ"/>
<!-- 	<jsp:setProperty property="empno" name="obj"/>
	<jsp:setProperty property="name" name="obj"/>
	<jsp:setProperty property="gender" name="obj"/>
	<jsp:setProperty property="dept" name="obj"/>
	<jsp:setProperty property="desig" name="obj"/>
	<jsp:setProperty property="basic" name="obj"/>  -->
	<jsp:setProperty property="*" name="obj"/>
	Employ No : 
	<jsp:getProperty property="empno" name="obj"/> <br/>
	Employ Name : 
	<jsp:getProperty property="name" name="obj"/> <br/>
	Gender : 
	<jsp:getProperty property="gender" name="obj"/> <br/>
	Department : 
	<jsp:getProperty property="dept" name="obj"/> <br/>
	Designation : 
	<jsp:getProperty property="desig" name="obj"/> <br/>
	Basic : 
	<jsp:getProperty property="basic" name="obj"/>
</body>
</html>