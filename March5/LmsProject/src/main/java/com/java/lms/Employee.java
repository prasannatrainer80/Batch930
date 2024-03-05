package com.java.lms;

import java.sql.Date;

public class Employee {

	private int empId;
	private String empName;
	private String empEmail;
	private String empMobileNo;
	private Date empDtJoin;
	private String empDept;
	private int empManagerId;
	private int empLeaveBalance;
	public int getEmpId() {
		return empId;
	}
	public void setEmpId(int empId) {
		this.empId = empId;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getEmpEmail() {
		return empEmail;
	}
	public void setEmpEmail(String empEmail) {
		this.empEmail = empEmail;
	}
	public String getEmpMobileNo() {
		return empMobileNo;
	}
	public void setEmpMobileNo(String empMobileNo) {
		this.empMobileNo = empMobileNo;
	}
	public Date getEmpDtJoin() {
		return empDtJoin;
	}
	public void setEmpDtJoin(Date empDtJoin) {
		this.empDtJoin = empDtJoin;
	}
	public String getEmpDept() {
		return empDept;
	}
	public void setEmpDept(String empDept) {
		this.empDept = empDept;
	}
	public int getEmpManagerId() {
		return empManagerId;
	}
	public void setEmpManagerId(int empManagerId) {
		this.empManagerId = empManagerId;
	}
	public int getEmpLeaveBalance() {
		return empLeaveBalance;
	}
	public void setEmpLeaveBalance(int empLeaveBalance) {
		this.empLeaveBalance = empLeaveBalance;
	}
	@Override
	public String toString() {
		return "Employee [empId=" + empId + ", empName=" + empName + ", empEmail=" + empEmail + ", empMobileNo="
				+ empMobileNo + ", empDtJoin=" + empDtJoin + ", empDept=" + empDept + ", empManagerId=" + empManagerId
				+ ", empLeaveBalance=" + empLeaveBalance + "]";
	}
	public Employee() {
		// TODO Auto-generated constructor stub
	}
	public Employee(int empId, String empName, String empEmail, String empMobileNo, Date empDtJoin, String empDept,
			int empManagerId, int empLeaveBalance) {
		this.empId = empId;
		this.empName = empName;
		this.empEmail = empEmail;
		this.empMobileNo = empMobileNo;
		this.empDtJoin = empDtJoin;
		this.empDept = empDept;
		this.empManagerId = empManagerId;
		this.empLeaveBalance = empLeaveBalance;
	}
	
	
}
