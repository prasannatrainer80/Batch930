package com.java.jdbc;

public class UserData {

	private String userName;
	private String passCode;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassCode() {
		return passCode;
	}
	public void setPassCode(String passCode) {
		this.passCode = passCode;
	}
	public UserData(String userName, String passCode) {
		this.userName = userName;
		this.passCode = passCode;
	}
	public UserData() {
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "UserData [userName=" + userName + ", passCode=" + passCode + "]";
	}
	
	
}
