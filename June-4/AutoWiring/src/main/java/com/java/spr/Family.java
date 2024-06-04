package com.java.spr;

public class Family {

	private String city;
	private String state;
	
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
	@Override
	public String toString() {
		return "Family [city=" + city + ", state=" + state + "]";
	}
	public Family() {

	}
	public Family(String city, String state) {
		this.city = city;
		this.state = state;
	}
	
	
}
