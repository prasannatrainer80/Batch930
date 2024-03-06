package com.java.lms;

import java.sql.SQLException;
import java.util.List;
import java.util.Scanner;

public class EmployHistoryMain {

	public static void main(String[] args) {
		int empId;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Employee Id  ");
		empId = sc.nextInt();
		LeaveDao dao = new LeaveDaoImpl();
		try {
			List<LeaveHistory> leaveHistory = dao.showEmployLeaveHistory(empId);
			for (LeaveHistory lh : leaveHistory) {
				System.out.println(lh);
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
