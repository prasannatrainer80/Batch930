package com.java.spr;

public class HelloImpl implements Hello {

	private String message;
	
	
	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	@Override
	public String greeting(String name) {
		// TODO Auto-generated method stub
		return message + name;
	}

}
