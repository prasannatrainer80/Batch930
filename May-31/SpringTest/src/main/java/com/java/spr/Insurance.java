package com.java.spr;

public class Insurance {

	private String insuranceCompany;
	private String city;
	private String state;
	public String getInsuranceCompany() {
		return insuranceCompany;
	}
	public void setInsuranceCompany(String insuranceCompany) {
		this.insuranceCompany = insuranceCompany;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	public void show(String name) {
		System.out.println("Hi I am "+name + " Working in " +insuranceCompany + " Located in \n" +
				city + state );
	}
}
