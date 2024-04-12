package com.java.spr;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainProg {

	public static void main(String[] args) {
		ApplicationContext ctx = 
				new ClassPathXmlApplicationContext("com/java/spr/JobDetails.xml");
		JobDetails jobDetails1 = (JobDetails)ctx.getBean("javaDeveloper2");
		jobDetails1.show(1, "Meghana");
		
		JobDetails jobDetails2 = (JobDetails)ctx.getBean("javaDeveloper1");
		jobDetails2.show(2, "Ananth");
		
		JobDetails jobDetails3 = (JobDetails)ctx.getBean("hrEmploy");
		jobDetails3.show(3, "Mythri");
	}
}
