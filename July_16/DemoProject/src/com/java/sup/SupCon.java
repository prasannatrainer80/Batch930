package com.java.sup;

import com.java.st.Emp;

class Employ {
	
	int empno;
	String name;
	double basic;
	
	public Employ(int empno, String name, double basic) {
		this.empno = empno;
		this.name = name;
		this.basic = basic;
	}

	@Override
	public String toString() {
		return "Employ [empno=" + empno + ", name=" + name + ", basic=" + basic + "]";
	}

}

class Uday extends Employ {

	public Uday(int empno, String name, double basic) {
		super(empno, name, basic);
		// TODO Auto-generated constructor stub
	}
	
}
public class SupCon {
	public static void main(String[] args) {
		Uday obj = new Uday(1, "Uday", 99434);
		System.out.println(obj);
	}
}
