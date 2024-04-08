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
<c:set var="rid" value="${param.restaurant}" />
<c:set var="cid" value="${sessionScope.custId}"/>
<jsp:useBean id="restaurantDao" class="com.java.hib.RestaurantDaoImpl" />
<jsp:useBean id="vendorDao" class="com.java.hib.VendorDaoImpl" />
<jsp:useBean id="customerDao" class="com.java.hib.CustomerDaoImpl" />
<c:set var="vendorList" value="${vendorDao.showVendors()}" />
<c:set var="menuList" value="${restaurantDao.showMenu(rid)}" />
<c:set var="walletList" value="${customerDao.showCustomerWallet(cid)}" />
	<form method="get" action="PlaceOrderConfirm.jsp">
		Customer Id : 
			<input type="text" name="cusId" value="${sessionScope.custId}" />
			<br/><br/>
		Menu Name :
			<select name="menId">
				<c:forEach var="m" items="${menuList}">
					<option value="${m.menuId}">${m.itemName}</option>
				</c:forEach>
			</select> <br/><br/>
		Vendor Name : 
		<select name="venId">
			<c:forEach var="v" items="${vendorList}">
				<option value="${v.venId}">${v.venName}</option>
			</c:forEach>
		</select> <br/><br/>
		Wallet List : 
		<select name="walSource">
			<c:forEach var="v" items="${walletList}">
				<option value="${v.walSource}">${v.walSource}</option>
			</c:forEach>
		</select> <br/><br/>
		Order Quantity : 
		<input type="number" name="ordQuantity" /> <br/><br/> 
		Order Comments : 
		<input type="text" name="ordComments" /><br/><br/>
		<input type="submit" value="Place Order" />
	</form>
	<c:if test="${param.cusId !=null && param.ordQuantity !=null}">
		<jsp:useBean id="beanOrder" class="com.java.hib.Orders" />
		<jsp:setProperty property="*" name="beanOrder"/>
		<c:out value="${customerDao.placeOrder(beanOrder)}" />
	</c:if>
</body>
</html>	