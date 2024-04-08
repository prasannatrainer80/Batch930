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
	<table border="3" align="center">
		<tr>
			<th>Restaurant Id</th>
			<th>Resturant Name</th>
			<th>City</th>
			<th>Location</th>
			<th>Rating</th>
			<th>Show Menu</th>
		</tr>
	<jsp:useBean id="beanRestaurantDao" class="com.java.hib.RestaurantDaoImpl" />
	<c:set var="restaurantList" value="${beanRestaurantDao.showRestaurantDao()}" />
	<c:forEach var="restaurant" items="${restaurantList}">
		<tr>
			<td><c:out value="${restaurant.restaurantId}" /> </td>
			<td><c:out value="${restaurant.restaurantName}" /> </td>
			<td><c:out value="${restaurant.city}" /> </td>
			<td><c:out value="${restaurant.location}" /> </td>
			<td><c:out value="${restaurant.rating}" /> </td>
			<td><a href=MenuShow.jsp?rid=${restaurant.restaurantId}>Menu</a> </td>
		</tr>
	</c:forEach>
	</table>
</body>
</html>