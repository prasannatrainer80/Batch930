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
<jsp:include page="Menu.jsp" /> <br/>
	  <c:set var="userName" value="${sessionScope.user}" /> 
<jsp:useBean id="beanLibDao" class="com.java.lib.LibraryDaoImpl"/>
<c:set var="listBooks" value="${beanLibDao.returnBook(userName)}" />
<form method="get" action="ReturnNext.jsp">
	<table border="3">
		<tr>
			<th>User Name</th>
			<th>Book Id</th>
			<th>From Date</th>
			<th>Select</th>
		</tr>
	<c:forEach var="tranBook" items="${listBooks}">
		<tr>
			<td> <c:out value="${tranBook.userName}"/></td>
			<td> <c:out value="${tranBook.bookId}"/></td>
			<td> <c:out value="${tranBook.fromDate}"/></td>
			<td>
			<input type='checkbox' name='bookid' value="${tranBook.bookId}" >
			</td>
		</tr>
	</c:forEach>
	</table> <br/>
	<input type="submit" value="Return Book(s)" />
</form>
</body>
</html>