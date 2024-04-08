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
	<c:set var="walletList" value="${beanCustomerDao.showCustomerWallet(custId)}" />
	<table border="3">
		<tr>
			<th>Customer Id</th>
			<th>Wallet Id</th>
			<th>Wallet Amount</th>
			<th>Wallet Source</th>
		</tr>
	<c:forEach var="wallet" items="${walletList}">
		<tr>
			<td><c:out value="${wallet.custId}" /></td>
			<td><c:out value="${wallet.walId}" /></td>
			<td><c:out value="${wallet.walAmount}" /></td>
			<td><c:out value="${wallet.walSource}" /></td>
		</tr>
	</c:forEach>
	</table>
</body>
</html>