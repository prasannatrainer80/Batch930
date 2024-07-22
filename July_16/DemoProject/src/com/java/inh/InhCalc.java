package com.java.inh;

class Input {
	
	int a,b;
	
	public void getData(int a, int b) {
		this.a = a;
		this.b = b;
	}
	
}

class Calc extends Input {

	public void show() {
		int c = a + b;
		System.out.println("Sum is  " +c);
		c = a - b;
		System.out.println("Sub is  " +c);
		c = a * b;
		System.out.println("Mult is  " +c);
	}
}

public class InhCalc {
	public static void main(String[] args) {
		Calc calc = new Calc();
		calc.getData(12, 5);
		calc.show();
	}
}
