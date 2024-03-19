<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	
	<jsp:useBean id="obj" class="com.java.beans.NameBean"/> 
	<jsp:setProperty property="firstName" name="obj"/>
	<jsp:setProperty property="lastName" name="obj"/>
	First Name : 
	<b>
		<jsp:getProperty property="firstName" name="obj"/> <br/>
	</b>
	Last Name : 
		<jsp:getProperty property="lastName" name="obj"/>
	</body>
</html>