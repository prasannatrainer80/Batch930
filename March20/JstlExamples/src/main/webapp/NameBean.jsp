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
	<form action="NameBean.jsp" method="get">
		<center>
			First Name : 
			<input type="text" name="firstName" /> <br/><br/>
			Last Name : 
			<input type="text" name="lastName" /> <br/><br/>
			<input type="submit" value="Show" />
		</center>
	</form>
	<c:if test="${param.firstName !=null && param.lastName !=null}">
		<jsp:useBean id="obj" class="com.java.jstl.NameBean" />
		<jsp:setProperty property="*" name="obj" />
		First Name : 
		<b>
			<c:out value="${param.firstName}" />
		</b> <br/><br/>
		Last Name : 
		<b>
			<c:out value="${param.lastName}" /> <br/><br/>
		</b>
		Full Name is : 
		<c:out value="${obj.fullName()}" />
	</c:if>
</body>
</html>