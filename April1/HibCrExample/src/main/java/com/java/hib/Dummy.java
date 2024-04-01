package com.java.hib;

import java.util.List;

public class Dummy {

	public static void main(String[] args) {
		System.out.println(new EmployDaoImpl().showUsers());
		System.out.println(new EmployDaoImpl().validateUser("Karthik", "Karanam"));
	//	System.out.println(new EmployDaoImpl().validateUser("Karthik", "Karanam"));
	}
}
