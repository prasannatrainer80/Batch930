package com.java.st;

public class StEx {

	static {
		System.out.println("Static Constructor...");
	}
	
	StEx() {
		System.out.println("Instance Constructor...");
	}
	
	public static void main(String[] args) {
		StEx obj = new StEx();
	}
}
