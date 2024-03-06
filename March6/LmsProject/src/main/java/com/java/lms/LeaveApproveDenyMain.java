package com.java.lms;

import java.sql.SQLException;
import java.util.Scanner;

public class LeaveApproveDenyMain {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int leaveId, managerId;
		String status, managerComments;
		System.out.println("Enter Leave Id  ");
		leaveId = sc.nextInt();
		System.out.println("Enter Manager Id  ");
		managerId = sc.nextInt();
		System.out.println("Enter Status (Yes/No)   ");
		status = sc.next();
		System.out.println("Enter Manager Comments  ");
		managerComments = sc.next();
		LeaveDao dao = new LeaveDaoImpl();
		try {
			System.out.println(dao.approveDeny(leaveId, managerId, status, managerComments));
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
