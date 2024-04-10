package com.java.spr;

public class OfficeAddress {

	private String streetName;
	private String landMark;
	private String floor;
	private String city;
	public String getStreetName() {
		return streetName;
	}
	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}
	public String getLandMark() {
		return landMark;
	}
	public void setLandMark(String landMark) {
		this.landMark = landMark;
	}
	public String getFloor() {
		return floor;
	}
	public void setFloor(String floor) {
		this.floor = floor;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	@Override
	public String toString() {
		return "OfficeAddress [streetName=" + streetName + ", landMark=" + landMark + ", floor=" + floor + ", city="
				+ city + "]";
	}
	
	
}
