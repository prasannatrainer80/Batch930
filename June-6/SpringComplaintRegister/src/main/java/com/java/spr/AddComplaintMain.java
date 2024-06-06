package com.java.spr;

import java.util.Scanner;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AddComplaintMain {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		Complaint complaint = new Complaint();
		System.out.println("Enter Complaint Type   ");
		complaint.setComplaintType(sc.nextLine());
		System.out.println("Enter Complaint Description  ");
		complaint.setcDescription(sc.nextLine());
		System.out.println("Enter Severity    ");
		complaint.setSeverity(sc.nextLine());
		ApplicationContext ctx = new ClassPathXmlApplicationContext("com/java/spr/jdbc.xml");
		ComplaintDao dao = (ComplaintDao)ctx.getBean("complaintDao");
		System.out.println(dao.addComplaint(complaint));
	}
}
