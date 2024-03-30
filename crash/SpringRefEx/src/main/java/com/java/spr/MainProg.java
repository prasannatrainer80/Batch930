package com.java.spr;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainProg {
	public static void main(String[] args) {
		ApplicationContext ctx = 
			new ClassPathXmlApplicationContext("com/java/spr/Person.xml");
		Person person1 = (Person)ctx.getBean("personVigneshwar");
		person1.showAll();
		Person person2 = (Person)ctx.getBean("personAkhil");
		person2.showAll();
		Person person3 = (Person)ctx.getBean("personChandra");
		person3.showAll();
	}
}
