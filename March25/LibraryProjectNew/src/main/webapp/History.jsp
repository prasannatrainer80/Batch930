<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<jsp:include page="Menu.jsp"/> <br/>
<sql:setDataSource var="conn" driver="com.mysql.cj.jdbc.Driver" 
			url="jdbc:mysql://localhost:3306/library" user="root" password="root"/>
	  <c:set var="userName" value="${sessionScope.user}" /> 
	<sql:query var="tranbookQuery" dataSource="${conn}">
		select * from transreturn where username=?;
		<sql:param value="${userName}" />
	</sql:query>
	<table border="3">
		<tr>
			<th>User Name</th>
			<th>Book Id</th>
			<th>From Date</th>
			<th>To Date</th>
		</tr>
	<c:forEach var="tranBook" items="${tranbookQuery.rows}">
		<tr>
			<td> <c:out value="${tranBook.UserName}"/></td>
			<td> <c:out value="${tranBook.BookId}"/></td>
			<td> <c:out value="${tranBook.Fromdate}"/></td>
			<td> <c:out value="${tranBook.toDate}"/></td>
		</tr>
	</c:forEach>
	</table>
</body>
</html>