package com.java.spr;

public class Agent {

	private String agentName;
	private String city;
	private int agentId;
	private int maritalStatus;
	
	public String getAgentName() {
		return agentName;
	}
	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public int getAgentId() {
		return agentId;
	}
	public void setAgentId(int agentId) {
		this.agentId = agentId;
	}
	public int getMaritalStatus() {
		return maritalStatus;
	}
	public void setMaritalStatus(int maritalStatus) {
		this.maritalStatus = maritalStatus;
	}
	@Override
	public String toString() {
		return "Agent [agentName=" + agentName + ", city=" + city + ", agentId=" + agentId + ", maritalStatus="
				+ maritalStatus + "]";
	}
	public Agent() {

	}
	public Agent(String agentName, String city, int agentId, int maritalStatus) {
		this.agentName = agentName;
		this.city = city;
		this.agentId = agentId;
		this.maritalStatus = maritalStatus;
	}
	
	
}
