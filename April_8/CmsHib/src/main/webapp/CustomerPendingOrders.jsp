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
<jsp:include page="CustomerDashBoard.jsp" /> <br/><hr/>
	<c:set var="custId" value="${sessionScope.custId}" />
	<jsp:useBean id="beanCustomerDao" class="com.java.hib.CustomerDaoImpl"/>
	<c:set var="customerOrders" value="${beanCustomerDao.showCustomerPendingOrders(custId)}"/>
	<table border="3">
		<tr>
			<th>Order Id</th>
			<th>Customer Id</th>
			<th>Vendor Id</th>
			<th>Wallet Source</th>
			<th>Menu Id</th>
			<th>Order Date</th>
			<th>Order Quantity</th>
			<th>Order Bill Amount</th>
			<th>Order Status</th>
			<th>Order Comments</th>
		</tr>
		<c:forEach var="orders" items="${customerOrders}">
			<tr>
				<td><c:out value="${orders.ordId}" /> </td>
				<td><c:out value="${orders.cusId}" /> </td>
				<td><c:out value="${orders.venId}" /> </td>
				<td><c:out value="${orders.walSource}" /> </td>
				<td><c:out value="${orders.menId}" /> </td>
				<td><c:out value="${orders.ordDate}" /> </td>
				<td><c:out value="${orders.ordQuantity}" /> </td>
				<td><c:out value="${orders.ordBillAmount}" /> </td>
				<td><c:out value="${orders.ordStatus}" /> </td>
				<td><c:out value="${orders.ordComments}" /> </td>
			</tr>
		</c:forEach>
	</table>
</body>
</html>