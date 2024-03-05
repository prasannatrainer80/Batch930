package com.java.lms;

import java.sql.SQLException;
import java.util.Scanner;

public class EmploySearchMain {

	public static void main(String[] args) {
		int empId;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Employee Id  ");
		empId = sc.nextInt();
		EmployDao dao = new EmployDaoImpl();
		try {
			Employee employee = dao.searchEmploy(empId);
			if (employee != null) {
				System.out.println(employee);
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
