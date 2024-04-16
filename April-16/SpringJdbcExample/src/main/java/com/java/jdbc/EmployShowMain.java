package com.java.jdbc;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class EmployShowMain {

	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext("com/java/jdbc/Employ.xml");
		EmployDao dao = (EmployDao)ctx.getBean("employDao");
		List<Employ> employList = dao.showEmployDao();
		for (Employ employ : employList) {
			System.out.println(employ);
		}
	}
}
