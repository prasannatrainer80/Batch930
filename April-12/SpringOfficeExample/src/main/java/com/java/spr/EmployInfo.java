package com.java.spr;

public class EmployInfo {

	private OfficeAddress officeAddress;

	public OfficeAddress getOfficeAddress() {
		return officeAddress;
	}

	public void setOfficeAddress(OfficeAddress officeAddress) {
		this.officeAddress = officeAddress;
	}
	
	public void showInfo(int empId, String empName) {
		System.out.println("Your Id " +empId + " You " +empName + " Report at ");
		System.out.println(officeAddress);
	}
	
}
