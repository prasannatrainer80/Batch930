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
	<jsp:include page="Menu.jsp" /><br/>
	<jsp:useBean id="beanLibraryDao" class="com.java.lib.LibraryDaoImpl" />
	<c:set var="searchType" value="${param.searchtype}" />
	<c:set var="searchValue" value="${param.searchvalue}" />
	<c:set var="booksList" value="${beanLibraryDao.searchBooks(searchType, searchValue)}" />
	<form method="get" action="Issue.jsp">
	<table border="3">
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Author</th>
			<th>Edition</th>
			<th>Dept</th>
			<th>TotalBooks</th>
			<th>Select</th>
		</tr>
	<c:forEach var="book" items="${booksList}">
		<tr> 
			<td><c:out value="${book.id}" /> </td>
			<td><c:out value="${book.name}" /> </td>
			<td><c:out value="${book.author}" /> </td>
			<td><c:out value="${book.edition}" /> </td>
			<td><c:out value="${book.dept}" /> </td>
			<td><c:out value="${book.totalBooks}" /> </td>
			<td>
				<c:if test="${book.totalBooks <= 0}">
					<input type='checkbox' name='bookid' disabled='true' value="${book.totalBooks}" >
				</c:if>
				<c:if test="${book.totalBooks >= 1}">
					<input type='checkbox' name='bookid' value="${book.id}" >
				</c:if>
				
			</td>
		</tr>
	</c:forEach>
	</table>
	<input type="submit" value="Issue Books" />
	</form>
</body>	
</html>