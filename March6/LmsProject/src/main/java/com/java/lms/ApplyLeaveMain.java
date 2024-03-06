package com.java.lms;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public class ApplyLeaveMain {

	public static void main(String[] args) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		LeaveHistory leaveHistory = new LeaveHistory();
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Employ Id  ");
		leaveHistory.setEmpId(sc.nextInt());
		System.out.println("Enter Leave-Start Date (yyyy-MM-dd) ");
		Date sdate = sdf.parse(sc.next());
		java.sql.Date sqlDate = new java.sql.Date(sdate.getTime());
		leaveHistory.setLeaveStartDate(sqlDate);
		System.out.println("Enter Leave-End Date (yyyy-MM-dd)  ");
		Date endDate = sdf.parse(sc.next());
		java.sql.Date sqlEndDate = new java.sql.Date(endDate.getTime());
		leaveHistory.setLeaveEndDate(sqlEndDate);
		System.out.println("Enter Leave-Type   ");
		leaveHistory.setLeaveType(sc.next());
		System.out.println("Enter Leave-Reason  ");
		leaveHistory.setLeaveReason(sc.next());
		LeaveDao dao = new LeaveDaoImpl();
		try {
			System.out.println(dao.applyLeave(leaveHistory));
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
