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
	<form method="get" action="EmploySearch.jsp">
		<center>
			Employ No :
			<input type="number" name="empno" /> <Br/><br/>
			<input type="submit" value="Search" /> <Br/><Br/>
			
		</center>
	</form>
	<%
		if (request.getParameter("empno") != null) {
			int empno = Integer.parseInt(request.getParameter("empno"));
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/practice", 
						"root", "root");
			
			String cmd = "select * from Employ where empno = ?";
			PreparedStatement pst = conn.prepareStatement(cmd);
			pst.setInt(1, empno);
			ResultSet rs = pst.executeQuery();
			if (rs.next()) {
				out.println("Employ No  " +rs.getInt("empno") + "<br/>");
				out.println("Employ Name  " +rs.getString("name") + "<br/>");
				out.println("Gender  " +rs.getString("gender") + "<br/>");
				out.println("Department  " +rs.getString("dept") + "<br/>");
				out.println("Designation  " +rs.getString("desig") + "<br/>");
				out.println("Salary  " +rs.getDouble("basic") + "<br/><hr/>");
			} else {
				out.println("Record Not Found...");
			}
		}
	%>
</body>
</html>