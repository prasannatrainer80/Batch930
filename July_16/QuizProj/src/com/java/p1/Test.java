package com.java.p1;

public class Test extends Data {

	public void show() {
		Test obj = new Test();
		System.out.println(obj.friendlyStr);
		System.out.println(obj.protectedStr);
		System.out.println(obj.publicStr);
	}
}
