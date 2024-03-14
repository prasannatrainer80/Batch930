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
	<form method="get" action="EmployInsert.jsp">
		<center>
			Employ No : 
			<input type="number" name="empno" /> <br/><br/>
			Employ Name : 
			<input type="text" name="name" /> <br/> <Br/>
			 Gender : 
			<select name="gender">
				<option value="MALE">MALE</option>
				<option value="FEMALE">FEMALE</option>
			</select> <br/><br/>
			Department : 
			<select name="dept">
				<option value="DOTNET">Dotnet</option>
				<option value="JAVA">Java</option>
				<option value="SQL">Sql</option>
			</select> <br/><br/>
			Designation : 
			<select name="desig">
				<option value="Programmer">Programmer</option>
				<option value="TeamLead">TeamLead</option>
				<option value="Manager">Manager</option>
			</select><br/><br/>
			Basic : 
			<input type="number" name="basic" /> <br/> <Br/>
			<input type="submit" value="Insert" />
		</center>
	</form>
	<%
		if (request.getParameter("empno") !=null && 
				request.getParameter("basic") !=null) {
			int empno = Integer.parseInt(request.getParameter("empno"));
			String name = request.getParameter("name");
			String gen = request.getParameter("gender");
			String dept = request.getParameter("dept");
			String desig = request.getParameter("desig");
			double basic = Double.parseDouble(request.getParameter("basic"));
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/practice", 
						"root", "root");
			String cmd = "Insert into Employ(empno, name, gender, dept, desig, basic) " + 
					 " values(?, ?, ?, ?, ?, ?) ";
			PreparedStatement pst = conn.prepareStatement(cmd);
			pst.setInt(1, empno);
			pst.setString(2, name);
			pst.setString(3, gen);
			pst.setString(4, dept);
			pst.setString(5, desig);
			pst.setDouble(6, basic);
			pst.executeUpdate();
			out.println("*** Record Inserted ***");
		}
	%>
</body>
</html>