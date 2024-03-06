package com.java.lms;

import java.sql.SQLException;

public class Test {

	public static void main(String[] args) {
		EmployDaoImpl impl = new EmployDaoImpl();
		try {
			System.out.println(impl.addUser("Akhil", "Adapala"));
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
