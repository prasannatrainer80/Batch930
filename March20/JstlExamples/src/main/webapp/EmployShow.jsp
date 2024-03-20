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
	<jsp:useBean id="employBean" class="com.java.jstl.EmployBean" />
	<c:set var="employList" value="${employBean.showEmploy()}" />
	<c:forEach var="employ" items="${employList}">
		Employ No : 
		<c:out value="${employ.empno}" /> <br/><br/>
		Employ Name : 
		<c:out value="${employ.name}" /> <br/><br/>
		Gender : 
		<c:out value="${employ.gender}" /> <br/><br/>
		Department :
		<c:out value="${employ.dept}" /> <br/><Br/>
		Designation : 
		<c:out value="${employ.desig}" /> <br/><br/>
		Salary : 
		<c:out value="${employ.basic}" /> <hr/>
	</c:forEach>
</body>
</html>