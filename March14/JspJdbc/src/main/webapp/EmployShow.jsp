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
<%
	Class.forName("com.mysql.cj.jdbc.Driver");
	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/practice", 
				"root", "root");
	
	String cmd = "select * from Employ";
	PreparedStatement pst = conn.prepareStatement(cmd);
	ResultSet rs = pst.executeQuery();
	while(rs.next()) {
		out.println("Employ No  " +rs.getInt("empno") + "<br/>");
		out.println("Employ Name  " +rs.getString("name") + "<br/>");
		out.println("Gender  " +rs.getString("gender") + "<br/>");
		out.println("Department  " +rs.getString("dept") + "<br/>");
		out.println("Designation  " +rs.getString("desig") + "<br/>");
		out.println("Salary  " +rs.getDouble("basic") + "<br/><hr/>");
	}
%>
</body>
</html>