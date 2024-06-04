package com.java.spr;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainProg {

	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext("com/java/spr/policy.xml");
		Policy policy1 = (Policy)ctx.getBean("policy1");
		policy1.showInfo();
		
		Policy policy2 = (Policy)ctx.getBean("policy2");
		policy2.showInfo();
		
		Policy policy3 = (Policy)ctx.getBean("policy3");
		policy3.showInfo();
	}
}
