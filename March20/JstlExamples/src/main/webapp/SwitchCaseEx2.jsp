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
	<p>Options</p>
	<p>1. Karthik</p>
	<p>2. Ananth</p>
	<p>3. Satish</p>
	<form method="get" action="SwitchCaseEx2.jsp">
		<center>
			Choice : 
			<input type="text" name="choice" /> <br/><br/>
			<input type="submit" value="Show" />
		</center>
	</form>
	<c:if test="${param.choice !=null}">
		<c:set var="choice" value="${param.choice}" />
		<c:choose>
		<c:when test="${choice==1}">
			<c:out value="Karthik Karanam" />
		</c:when>
		<c:when test="${choice==2}">
			<c:out value="Ananth M" />
		</c:when>
		<c:when test="${choice == 3}">
			<c:out value="Satish G" />
		</c:when>
		<c:otherwise>
			<c:out value="Invalid Choice..." />
		</c:otherwise>
	</c:choose>
	</c:if>
</body>
</html>