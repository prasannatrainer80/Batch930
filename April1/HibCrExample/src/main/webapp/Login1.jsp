<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<form method="post" action="Login1.jsp">
		<center>
			User Name : 
			<input type="text" name="userName" /> <br/><br/>
			Password : 
			<input type="password" name="passCode" /> <br/><br/>
			<input type="submit" value="Login" />
		</center>
	</form>
	<jsp:useBean id="beanLogin" class="com.java.hib.EmployDaoImpl" />
	<c:if test="${param.userName !=null && param.passCode !=null}">
		<c:set var="userFound" 
			value="${beanLogin.validateUser(param.userName, param.passCode)}" />
		<c:if test="${userFound !=null}">
			<c:out value="Correct Credentials..." />
		</c:if>
		<c:if test="${userFound ==null}">
			<c:out value="Invalid Credentials..." />
		</c:if>
	</c:if>
</body>
</html>