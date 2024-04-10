package com.java.spr;

public class HelloWorld {

	private String welcomeText;
	private String bodyText;
	private String endNoteText;
	
	public String getWelcomeText() {
		return welcomeText;
	}
	public void setWelcomeText(String welcomeText) {
		this.welcomeText = welcomeText;
	}
	public String getBodyText() {
		return bodyText;
	}
	public void setBodyText(String bodyText) {
		this.bodyText = bodyText;
	}
	public String getEndNoteText() {
		return endNoteText;
	}
	public void setEndNoteText(String endNoteText) {
		this.endNoteText = endNoteText;
	}
	
	public String welcome(String name) {
		return welcomeText + name;
	}
	
	public String body(String name) {
		return bodyText + name;
	}
	
	public String end(String name) {
		return endNoteText + name;
	}
}
