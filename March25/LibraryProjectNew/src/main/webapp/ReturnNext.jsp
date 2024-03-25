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
<jsp:include page="Menu.jsp"/>
	<br/>
	<jsp:useBean id="beanLibraryDao" class="com.java.lib.LibraryDaoImpl" />
	<c:forEach var='parameter' items='${paramValues}'> 
     <ul>
        <%-- Show the key, which is the request parameter
             name --%>
        <li><b><c:out value='${parameter.key}'/></b>:</li>
          <c:forEach var='value' items='${parameter.value}'>
           <%-- Show the String value --%>
           <c:out value='${value}'/>  
             <c:set var="userName" value="${sessionScope.user}" /> 
           <c:out value="${sessionScope.user}" />
           <c:out value="${beanLibraryDao.returnProcess(userName, value)}" />
         </c:forEach>
      </ul>
     </c:forEach>
</body>
</html>