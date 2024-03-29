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
	<form method="get" action="AddEmploy.jsp">
		<center>
			Employ No :
			<input type="number" name="empno" /> <br/> <br/>
			Employ Name : 
			<input type="text" name="name" > <br/><br/>
			Gender : 
			<select name="gender">
				<option value="MALE">MALE</option>
				<option value="FEMALE">FEMALE</option>
			</select> <br/><br/>
			Department : 
			<select name="dept">
				<option value="Dotnet">Dotnet</option>
				<option value="Java">Java</option>
				<option value="React">React</option>
			</select> <br/><br/>
			Designation : 
			<select name="desig">
				<option value="Programmer">Programmer</option>
				<option value="TeamLead">TeamLead</option>
				<option value="Manager">Manager</option>
			</select> <br/><br/>
			Basic : 
			<input type="number" name="basic" /> <br/><br/>
			<input type="submit" value="Add Employ" />
		</center>
	</form>
	<c:if test="${param.empno !=null && param.basic !=null}">
		<jsp:useBean id="employ" class="com.java.hib.Employ" />
		<jsp:setProperty property="*" name="employ"/>
		<jsp:useBean id="beanEmployDao" class="com.java.hib.EmployDaoImpl" />
		<c:set var="res" value="${beanEmployDao.addEmployDao(employ)}" />
		<jsp:forward page="EmployTable.jsp" />
	</c:if>
</body>
</html>