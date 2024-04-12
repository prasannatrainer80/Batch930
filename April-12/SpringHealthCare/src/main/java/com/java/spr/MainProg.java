package com.java.spr;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainProg {

	public static void main(String[] args) {
		ApplicationContext ctx = 
				new ClassPathXmlApplicationContext("com/java/spr/Appointment.xml");
		Appointment appointment1 = (Appointment)ctx.getBean("beanAppointmentCardio");
		appointment1.show("Ramarao");
		
		Appointment appointment2 = (Appointment)ctx.getBean("beanAppointmentKidney");
		appointment2.show("Rama");
		
		Appointment appointment3 = (Appointment)ctx.getBean("beanAppointmentBones");
		appointment3.show("Naresh");
	}
}
