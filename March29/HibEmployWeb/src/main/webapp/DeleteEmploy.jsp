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
	<jsp:useBean id="beanEmployDao" class="com.java.hib.EmployDaoImpl" />
	<c:set var="empno" value="${param.empno}" />
	<c:set var="res" value="${beanEmployDao.deleteEmployDao(empno)}" />
	<jsp:forward page="EmployTable.jsp" />
</body>
</html>