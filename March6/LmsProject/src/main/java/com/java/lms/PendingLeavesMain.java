package com.java.lms;

import java.sql.SQLException;
import java.util.List;
import java.util.Scanner;

public class PendingLeavesMain {

	public static void main(String[] args) {
		int managerId;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Manager Id  ");
		managerId = sc.nextInt();
		LeaveDao dao = new LeaveDaoImpl();
		try {
			List<LeaveHistory> pendingLeaves  = dao.pendingLeaves(managerId);
			for (LeaveHistory leaveHistory : pendingLeaves) {
				System.out.println(leaveHistory);
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
