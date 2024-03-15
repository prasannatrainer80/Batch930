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
	<form method="post" action="CreateAccount.jsp">
		<table border="3" align=center>
			<tr>
				<th colspan="2">Create Account</th>
			</tr>
			<tr>
				<th> User Name</th>
				<td> <input type="text" name="userName" /> </td>
			</tr>
			<tr>
				<th> Password </th>
				<td> <input type="password" name="passWord" />  </td>
			</tr>
			<tr>
				<th>Re-Type Password </th>
				<td> <input type="password" name="retypePassword" /> </td>
			</tr>
			<tr>
				<th colspan="2">
					<input type="Submit" value="Create Account" />
				</th>
			</tr>
		</table>
	</form>
	<%
		if (request.getParameter("userName") !=null && 
		request.getParameter("passWord") !=null) {
			String user = request.getParameter("userName");
			String pwd = request.getParameter("passWord");
			String reType = request.getParameter("retypePassword");
			if (pwd.equals(reType)) {
				LibraryDao dao = new LibraryDaoImpl();
				out.println(dao.createUser(user, pwd));				
			} else {
				out.println("Passwod Mismatch...");
			}
			
		}
	%>
</body>
</html>