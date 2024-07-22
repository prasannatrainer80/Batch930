package com.java.st;

public class Student {

	int sid;
	String name;
	String city;
	double cgp;
	
	public Student() {

	}

	public Student(int sid, String name, String city, double cgp) {
		this.sid = sid;
		this.name = name;
		this.city = city;
		this.cgp = cgp;
	}

	@Override
	public String toString() {
		return "Student [sid=" + sid + ", name=" + name + ", city=" + city + ", cgp=" + cgp + "]";
	}
	
}
