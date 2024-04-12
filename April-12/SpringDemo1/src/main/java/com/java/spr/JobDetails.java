package com.java.spr;

public class JobDetails {

	private String desig;
	private String manager;
	private String location;
	private String workmode;
	
	public String getDesig() {
		return desig;
	}
	public void setDesig(String desig) {
		this.desig = desig;
	}
	public String getManager() {
		return manager;
	}
	public void setManager(String manager) {
		this.manager = manager;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getWorkmode() {
		return workmode;
	}
	public void setWorkmode(String workmode) {
		this.workmode = workmode;
	}
	
	public void show(int empId, String name) {
		System.out.println("Employ Id "+empId + " Name " +name);
		System.out.println("Desig  " +desig + " Manager " +manager);
		System.out.println("Location " +location + " Work Mode " +workmode);
		
	}
}
