<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>   
<body>
	<jsp:useBean id="obj" class="com.java.beans.Greeting" />
	Default Message : 
	<jsp:getProperty property="message" name="obj"/> <br />
	<jsp:setProperty property="message" name="obj" value="Good Evening..."/>
	Updated Message : 
	<B>
		<jsp:getProperty property="message" name="obj"/>
	</B>
</body>
</html>