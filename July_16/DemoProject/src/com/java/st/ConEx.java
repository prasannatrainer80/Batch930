package com.java.st;

public class ConEx {

	int a, b;
	
	ConEx() {
		a = 5;
		b = 7;
	}
	
	ConEx(int a, int b) {
		this.a = a;
		this.b = b;
	}

	@Override
	public String toString() {
		return "ConEx [a=" + a + ", b=" + b + "]";
	}
	
	public static void main(String[] args) {
		ConEx obj1 = new ConEx();
		System.out.println(obj1);
		ConEx obj2 = new ConEx(53, 22);
		System.out.println(obj2);
	}
}
