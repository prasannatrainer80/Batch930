package com.java.spr;

public class NameBean {

	private String welcome;
	private String support;
	private String bye;
	
	public String getWelcome() {
		return welcome;
	}
	public void setWelcome(String welcome) {
		this.welcome = welcome;
	}
	public String getSupport() {
		return support;
	}
	public void setSupport(String support) {
		this.support = support;
	}
	public String getBye() {
		return bye;
	}
	public void setBye(String bye) {
		this.bye = bye;
	}
	
	public void show(String name) {
		System.out.println(welcome + name + "\n" + support + "\n" + bye);
	}
}
