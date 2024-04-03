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
<jsp:useBean id="beanRestaurantDao" class="com.java.hib.RestaurantDaoImpl" />
<c:set var="menuList" value="${beanRestaurantDao.showMenu(param.rid)}" />
	<table border="3" align="center">
		<tr>
			<th>Menu ID</th>
			<th>Restaurant Id</th>
			<th>Item Name</th>
			<th>Price</th>
			<th>Speciality</th>
		</tr>
		<c:forEach var="menu" items="${menuList}">
			<tr>
				<td><c:out value="${menu.menuId}" /> </td>
				<td><c:out value="${menu.restaurantId}" /> </td>
				<td><c:out value="${menu.itemName}" /> </td>
				<td><c:out value="${menu.price}" /> </td>
				<td><c:out value="${menu.speciality}" /> </td>
			</tr>
		</c:forEach>
	</table>
</body>
</html>