package com.java.spr;

import org.springframework.beans.factory.annotation.Autowired;

public class Person {

	private int id;
	private String name;
	@Autowired
	private JobDetails jobDetails;
	private Family familyDetails;
	
	public Person(int id, String name, JobDetails jobDetails, Family familyDetails) {
		this.id = id;
		this.name = name;
		this.jobDetails = jobDetails;
		this.familyDetails = familyDetails;
	}

	public Person() {
		// TODO Auto-generated constructor stub
	}

	public void showAllInfo() {
		System.out.println(familyDetails);
		System.out.println(jobDetails);
		System.out.println("Id  " +id+ " Name  " +name);
	}
	
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

	public Family getFamilyDetails() {
		return familyDetails;
	}

	public void setFamilyDetails(Family familyDetails) {
		this.familyDetails = familyDetails;
	}
	
	
}
