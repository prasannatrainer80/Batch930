package com.java.p1;

public class Data {

	private String privateStr="Welcome";
	public String publicStr = "Java";
	protected String protectedStr = "Oops";
	String friendlyStr = "Test";
	
	public void show() {
		System.out.println(privateStr);
		System.out.println(publicStr);
		System.out.println(protectedStr);
		System.out.println(friendlyStr);
	}
}
