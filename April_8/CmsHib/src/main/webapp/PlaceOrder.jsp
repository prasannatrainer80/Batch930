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
<jsp:include page="CustomerDashBoard.jsp" />
<br/><hr/>
<jsp:useBean id="restaurantDao" class="com.java.hib.RestaurantDaoImpl" />
<c:set var="rlist" value="${restaurantDao.showRestaurantDao()}" />
	<form method="get" action="PlaceOrderConfirm.jsp">
		<center>
			Customer Id : 
			<input type="text" name="custId" value="${sessionScope.custId}" />
			<br/><br/>
			Resturant Name :
			<select name="restaurant" onchange="this.form.submit()">
				<c:forEach var="restaurant" items="${rlist}">
					<option value="${restaurant.restaurantId}">${restaurant.restaurantName}</option>
				</c:forEach>
			</select>
		</center>
	</form>

</body>
</html>