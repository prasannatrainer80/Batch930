package com.java.spr;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainProg {

	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext("com/java/spr/Greeting.xml");
		Greeting greeting = (Greeting)ctx.getBean("beanGreeting");
		greeting.greetMe("Prasanna");
	}
}
