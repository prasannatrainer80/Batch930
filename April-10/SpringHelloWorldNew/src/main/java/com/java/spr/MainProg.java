package com.java.spr;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainProg {

	public static void main(String[] args) {
		ApplicationContext ctx = 
				new ClassPathXmlApplicationContext("com/java/spr/Hello.xml");
		HelloWorld helloWorld = (HelloWorld)ctx.getBean("welcomeScreen");
		System.out.println(helloWorld.welcome("Manikantha"));
		System.out.println(helloWorld.body("Manikantha"));
		System.out.println(helloWorld.end("Manikantha"));
		
		System.out.println(helloWorld.welcome("Anil"));
		System.out.println(helloWorld.body("Anil"));
		System.out.println(helloWorld.end("Anil"));
	}
}
