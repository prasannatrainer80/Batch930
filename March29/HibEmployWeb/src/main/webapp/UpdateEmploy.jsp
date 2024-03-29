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
	<jsp:useBean id="beanEmployDao" class="com.java.hib.EmployDaoImpl" />
	<c:set var="employ" value="${beanEmployDao.searchEmployDao(empno)}" />
	<form method="get" action="UpdateEmploy.jsp">
		<center>
			Employ No : 
			<input type="number" name="empno" value=${employ.empno} /> <br/> <br/>
			Employ Name : 
			<input type="text" name="name" value=${employ.name} /> <br/> <br/>
			Gender : 
			<input type="text" name="gender" value=${employ.gender} /> <br/> <br/>
			Department : 
			<input type="text" name="dept" value=${employ.dept} /> <br/> <br/>
			Designation : 
			<input type="text" name="desig" value=${employ.desig} /> <br/> <br/>
			Basic : 
			<input type="number" name="basic" value=${employ.basic} /> <br/> <br/>
			<input type="submit" value="Update" />
		</center>
	</form>
	<c:if test="${param.empno !=null && param.basic !=null}">
		<jsp:useBean id="beanEmploy" class="com.java.hib.Employ" />
		<jsp:setProperty property="*" name="beanEmploy"/>
		<c:set var="res" value="${beanEmployDao.updateEmployDao(beanEmploy)}" />
		<jsp:forward page="EmployTable.jsp" />
	</c:if>
</body>
</html>