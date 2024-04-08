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
<form method="post" action="CustomerLogin.jsp">
	<center>
		User Name :
		<input type="text" name="custUserName" /> <br/><br/>
		Password : 
		<input type="password" name="custPassword" /> <br/><br/>
		<input type="submit" value="Login" />
	</center>
</form>
<c:if test="${param.custUserName !=null && param.custPassword !=null}">
<jsp:useBean id="beanCustomerDao" class="com.java.hib.CustomerDaoImpl" />
<jsp:useBean id="beanCustomer" class="com.java.hib.Customer"/>

<jsp:setProperty property="*" name="beanCustomer"/>
<c:set var="count" value="${beanCustomerDao.validateCustomer(beanCustomer.custUserName,
		beanCustomer.custPassword)}" />
<c:if test="${count==1}">
	<c:set var="userName" value="${param.custUserName}" scope="session"  />
	<jsp:forward page="CustomerDashBoard.jsp"/>
</c:if>
<c:if test="${count==0}">
	<c:out value="Invalid Credentials..." />
</c:if>
</c:if>

</body>
</html>