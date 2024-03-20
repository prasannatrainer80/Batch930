package com.java.jstl;

public class Employ {

	private int empno;
	private String gender;
	private String name;
	private String dept;
	private String desig;
	private double basic;
	public int getEmpno() {
		return empno;
	}
	public void setEmpno(int empno) {
		this.empno = empno;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	public String getDesig() {
		return desig;
	}
	public void setDesig(String desig) {
		this.desig = desig;
	}
	public double getBasic() {
		return basic;
	}
	public void setBasic(double basic) {
		this.basic = basic;
	}
	public Employ(int empno, String gender, String name, String dept, String desig, double basic) {
		this.empno = empno;
		this.gender = gender;
		this.name = name;
		this.dept = dept;
		this.desig = desig;
		this.basic = basic;
	}
	public Employ() {

	}
	
	
}
