package com.java.jdbc;

import java.util.Scanner;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class EmploySearchMain {

	public static void main(String[] args) {
		int empno;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Employ No   ");
		empno = sc.nextInt();
		ApplicationContext ctx = new ClassPathXmlApplicationContext("com/java/jdbc/Employ.xml");
		EmployDaoImpl employDao = (EmployDaoImpl)ctx.getBean("employDao");
		Employ employ = employDao.searchEmploy(empno);
		if (employ!=null) {
			System.out.println(employ);
		} else {
			System.out.println("*** Record Not Found ***");
		}
	}
}
