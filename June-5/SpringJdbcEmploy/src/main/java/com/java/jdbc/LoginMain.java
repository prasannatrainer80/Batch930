package com.java.jdbc;

import java.util.Scanner;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LoginMain {

	public static void main(String[] args) {
		String user, pwd;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter UserName  ");
		user = sc.next();
		System.out.println("Enter Password  ");
		pwd = sc.next();
		ApplicationContext ctx = new ClassPathXmlApplicationContext("com/java/jdbc/jdbc.xml");
		EmployDaoImpl impl = (EmployDaoImpl)ctx.getBean("employDao");
		UserData userdata = impl.authenticate(user, pwd);
		if (userdata !=null) {
			System.out.println("Correct Credentials...");
		}
	}
}
