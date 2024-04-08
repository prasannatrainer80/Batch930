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
	<jsp:useBean id="beanCustomerDao" class="com.java.hib.CustomerDaoImpl" />
	<c:set var="user" value="${sessionScope.userName}" />
	<c:set var="userInfo" value="${beanCustomerDao.showCustomerInfo(user)}" />
	<c:set var="custId" value="${userInfo.custId}" scope="session"  />
	Customer Id : 
	<c:out value="${userInfo.custId}" /> <br/>
	Customer Name : 
	<c:out value="${userInfo.custName}" /> <br/>
	Customer Phone No : 
	<c:out value="${userInfo.custPhoneNo}"/> <br/>
	Customer User Name : 
	<c:out value="${userInfo.custUserName}"/> <br/>
	Customer Email : 
	<c:out value="${userInfo.custEmail}"/> <br/>
</body>
</html>