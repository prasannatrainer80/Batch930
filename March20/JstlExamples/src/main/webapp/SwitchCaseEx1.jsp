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
	<c:set var="choice" value="2" />
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
</body>
</html>