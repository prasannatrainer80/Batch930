package com.java.lms;

import java.sql.SQLException;
import java.util.Scanner;

public class LeaveSearchMain {

	public static void main(String[] args) {
		int leaveId;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Leave Id  ");
		leaveId = sc.nextInt();
		LeaveDao dao = new LeaveDaoImpl();
		try {
			System.out.println(dao.searchByLeaveId(leaveId));
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
