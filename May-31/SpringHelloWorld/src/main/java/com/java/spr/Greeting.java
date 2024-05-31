package com.java.spr;

public class Greeting {

	private String saluation;
	private String endNote;
	
	public String getSaluation() {
		return saluation;
	}
	public void setSaluation(String saluation) {
		this.saluation = saluation;
	}
	public String getEndNote() {
		return endNote;
	}
	public void setEndNote(String endNote) {
		this.endNote = endNote;
	}
	
	public void greetMe(String name) {
		System.out.println(saluation + name + " Thank You " +endNote);
	}
}
