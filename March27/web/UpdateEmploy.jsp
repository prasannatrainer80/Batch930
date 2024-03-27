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
	<c:set var="empno" value="${param.empno}" />
	<jsp:useBean id="beanEmployDao" class="com.java.hib.EmployDaoImpl"/>
	<c:set var="employ" value="${beanEmployDao.searchEmploy(empno)}" />
	<form method="get" action="UpdateEmploy.jsp">
		Employ No : 
		<input type="number" name="empno" value="${employ.empno}" /> <br/>
		Employ Name : 
		<input type="text" name="name" value="${employ.name}" /> <br/>
		Gender : 
		<input type="text" name="gender" value="${employ.gender}" /> <br/>
		Department : 
		<input type="text" name="dept" value="${employ.dept}" /> <br/>
		Designation : 
		<input type="text" name="desig" value="${employ.desig}" /> <br/>
		Basic : 
		<input type="text" name="basic" value="${employ.basic}" /> <br/>
		<input type="submit" value="Update" />
	</form>
	<c:if test="${param.empno !=null && param.basic !=null}">
		<jsp:useBean id="beanEmploy" class="com.java.hib.Employ" />
		<jsp:setProperty property="*" name="beanEmploy"/>
		<c:out value="${beanEmployDao.updateEmploy(beanEmploy)}" />
	</c:if>
</body>
</html>