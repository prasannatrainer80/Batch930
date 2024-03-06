package com.java.lms;

import java.sql.SQLException;
import java.util.List;

public class EmployShowMain {

	public static void main(String[] args) {
		EmployDao dao = new EmployDaoImpl();
		try {
			List<Employee> employeeList = dao.showEmployDao();
			for (Employee employee : employeeList) {
				System.out.println(employee);
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
