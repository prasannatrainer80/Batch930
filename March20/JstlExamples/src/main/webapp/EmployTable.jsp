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
	<jsp:useBean id="beanEmploy" class="com.java.jstl.EmployBean" />
	<c:set var="employList" value="${beanEmploy.showEmploy()}" />
	<table border="3" align="center">
		<tr>
			<th>Employ No</th>
			<th>Employ Name</th>
			<th>Gender</th>
			<th>Department</th>
			<th>Designation</th>
			<th>Basic</th>
		</tr>
	<c:forEach var="employ" items="${employList}">
		<tr>
			<td> <c:out value="${employ.empno}" /> </td>
			<td> <c:out value="${employ.name}" /> </td>
			<td> <c:out value="${employ.gender}" /> </td>
			<td> <c:out value="${employ.dept}" /> </td>
			<td> <c:out value="${employ.desig}" /> </td>
			<td> <c:out value="${employ.basic}" /> </td>
		</tr>
	</c:forEach>
	</table>
</body>
</html>