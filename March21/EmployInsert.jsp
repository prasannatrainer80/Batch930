<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<form method="get" action="EmployInsert.jsp">
		<center>
			Employ No : 
			<input type="number" name="empno" /> <br/><br/>
			Employ Name : 
			<input type="text" name="name" /> <br/> <Br/>
			 Gender : 
			<select name="gender">
				<option value="MALE">MALE</option>
				<option value="FEMALE">FEMALE</option>
			</select> <br/><br/>
			Department : 
			<select name="dept">
				<option value="DOTNET">Dotnet</option>
				<option value="JAVA">Java</option>
				<option value="SQL">Sql</option>
			</select> <br/><br/>
			Designation : 
			<select name="desig">
				<option value="Programmer">Programmer</option>
				<option value="TeamLead">TeamLead</option>
				<option value="Manager">Manager</option>
			</select><br/><br/>
			Basic : 
			<input type="number" name="basic" /> <br/> <Br/>
			<input type="submit" value="Insert" />
		</center>
	</form>
<c:if test="${param.empno !=null && param.basic!=null}">
		<sql:setDataSource var="conn" driver="com.mysql.cj.jdbc.Driver" 
			url="jdbc:mysql://localhost:3306/practice" user="root" password="root"/>
		<sql:update var="employUpdate" dataSource="${conn}">
			Insert into Employ(empno, Name, Gender, dept, Desig, Basic) values(?,?,?,?,?,?)
			<sql:param value="${param.empno}" />
			<sql:param value="${param.name}" />
			<sql:param value="${param.gender}" />
			<sql:param value="${param.dept}" />
			<sql:param value="${param.desig}" />
			<sql:param value="${param.basic}" />
		</sql:update>
		<c:out value="Record Inserted..." />
</c:if>










</body>
</html>