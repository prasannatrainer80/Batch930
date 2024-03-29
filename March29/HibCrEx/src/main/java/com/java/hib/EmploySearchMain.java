package com.java.hib;

import java.util.Scanner;

public class EmploySearchMain {

	public static void main(String[] args) {
		int empno;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Employ No   ");
		empno = sc.nextInt();
		EmployDao dao = new EmployDaoImpl();
		Employ employ = dao.searchEmploy(empno);
		if (employ!=null) {
			System.out.println(employ);
		} else {
			System.out.println("Record Not Found...");
		}
	}
}
