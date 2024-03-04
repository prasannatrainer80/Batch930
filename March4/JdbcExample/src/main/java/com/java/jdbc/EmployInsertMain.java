package com.java.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;

public class EmployInsertMain {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Employ No  ");
		int empno = sc.nextInt();
		System.out.println("Enter Name  ");
		String name = sc.next();
		System.out.println("Enter Gender  ");
		String gender = sc.next();
		System.out.println("Enter Department  ");
		String dept = sc.next();
		System.out.println("Enter Designation  ");
		String desig = sc.next();
		System.out.println("Enter Basic  ");
		double basic = sc.nextDouble();
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/practice930", 
						"root", "root");
			String cmd = "Insert into Employ(empno, name, gender, dept, desig, basic) values(?, ?, ?, ?, ?, ?)";
			PreparedStatement pst = connection.prepareStatement(cmd);
			pst.setInt(1, empno);
			pst.setString(2, name);
			pst.setString(3, gender);
			pst.setString(4, dept);
			pst.setString(5, desig);
			pst.setDouble(6, basic);
			pst.executeUpdate();
			System.out.println("*** Record Inserted ***");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
