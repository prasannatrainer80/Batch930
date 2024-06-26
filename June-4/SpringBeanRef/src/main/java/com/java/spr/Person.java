package com.java.spr;

public class Person {

	private int id;
	private String name;
	private JobDetails jobDetails;
	private Family family;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public JobDetails getJobDetails() {
		return jobDetails;
	}
	public void setJobDetails(JobDetails jobDetails) {
		this.jobDetails = jobDetails;
	}
	public Family getFamily() {
		return family;
	}
	public void setFamily(Family family) {
		this.family = family;
	}
	
	public void showAllInfo() {
		System.out.println("Id  " +id+ " Name  " +name);
		jobDetails.showJobInfo();
		family.showFamily();
	}
}
