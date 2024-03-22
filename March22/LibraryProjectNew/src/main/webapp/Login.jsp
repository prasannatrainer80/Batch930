<%@page import="com.java.lib.LibraryDaoImpl"%>
<%@page import="com.java.lib.LibraryDao"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<form method="post" action="Login.jsp">
		User Name : 
		<input type="text" name="userName" /> <br/><br/>
		Password : 
		<input type="password" name="passCode" /> <br/><br/>
		<input type="submit" value="Login" />
	</form> <br/><br/>
	<%
		if (request.getParameter("userName") !=null && request.getParameter("passCode")!=null) {
			String user = request.getParameter("userName");
			String pwd = request.getParameter("passCode");
			LibraryDao dao= new LibraryDaoImpl();
			int count = dao.loginCheck(user, pwd);
			if (count==1) {
				session.setAttribute("user", user);
	%>
		<jsp:forward page="Menu.jsp"/>
	<%
			} else {
				out.println("Invalid Credentials...");
			}
		}
	%>
	<a href="CreateAccount.jsp">Create Account</a>
</body>
</html>