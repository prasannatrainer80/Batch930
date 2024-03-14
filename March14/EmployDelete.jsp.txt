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
<form method="get" action="EmployDelete.jsp">
		<center>
			Employ No :
			<input type="number" name="empno" /> <Br/><br/>
			<input type="submit" value="Delete" /> <Br/><Br/>
			
		</center>
	</form>
	<%
	if (request.getParameter("empno") != null) {
		int empno = Integer.parseInt(request.getParameter("empno"));
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/practice", 
					"root", "root");
		String cmd = "Delete From Employ Where Empno = ?";
		PreparedStatement pst = conn.prepareStatement(cmd);
		pst.setInt(1, empno);
		pst.executeUpdate();
		out.println("*** Record Deleted ***");
	}
	%>
</body>
</html>