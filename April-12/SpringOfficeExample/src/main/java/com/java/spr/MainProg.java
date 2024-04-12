package com.java.spr;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainProg {

	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext("com/java/spr/Employ.xml");
		EmployInfo emp1 = (EmployInfo)ctx.getBean("employSet1");
		EmployInfo emp2 = (EmployInfo)ctx.getBean("employSet2");
		
		emp1.showInfo(1, "Maneesh");
		emp2.showInfo(2, "Meghana");
	}
}
