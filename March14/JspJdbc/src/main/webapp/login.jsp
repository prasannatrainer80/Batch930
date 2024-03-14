<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<form method="post" action="login.jsp">
		<center>
			User Name : 
			<input type="text" name="userName" /> <br/> <br/>
			Password : 
			<input type="password" name="passCode" /> <Br/><Br/>
			<input type="submit" value="Login" /> <Br/><br/>
		</center>
	</form>
	<%
		if (request.getParameter("userName") != null && 
		request.getParameter("passCode") !=null) {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/practice", 
						"root", "root");
			String cmd = "select count(*) cnt from Users where UserName = ? AND PassCode = ?";
			PreparedStatement pst = conn.prepareStatement(cmd);
			pst.setString(1, request.getParameter("userName"));
			pst.setString(2, request.getParameter("passCode"));
			ResultSet rs = pst.executeQuery();
			rs.next();
			int count = rs.getInt("cnt");
			if (count==1) {
		%>
			<jsp:forward page="Menu.jsp"/>
		<%
			} else {
				out.println("Invalid Credentials...");
			}
		}
	%>
</body>
</html>