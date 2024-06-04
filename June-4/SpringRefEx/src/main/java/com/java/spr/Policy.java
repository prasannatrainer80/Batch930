package com.java.spr;

public class Policy {

	private int policyId;
	private String policyName;
	private double premiumAmount;
	private Agent agent;
	
	
	public int getPolicyId() {
		return policyId;
	}
	public void setPolicyId(int policyId) {
		this.policyId = policyId;
	}
	public String getPolicyName() {
		return policyName;
	}
	public void setPolicyName(String policyName) {
		this.policyName = policyName;
	}
	public double getPremiumAmount() {
		return premiumAmount;
	}
	public void setPremiumAmount(double premiumAmount) {
		this.premiumAmount = premiumAmount;
	}
	public Agent getAgent() {
		return agent;
	}
	public void setAgent(Agent agent) {
		this.agent = agent;
	}
	@Override
	public String toString() {
		return "Policy [policyId=" + policyId + ", policyName=" + policyName + ", premiumAmount=" + premiumAmount
				+ ", agent=" + agent + "]";
	}
	public Policy() {

	}
	public Policy(int policyId, String policyName, double premiumAmount, Agent agent) {
		this.policyId = policyId;
		this.policyName = policyName;
		this.premiumAmount = premiumAmount;
		this.agent = agent;
	}
	
	public void showInfo() {
		System.out.println(agent);
		System.out.println("Policy Id  " +policyId);
		System.out.println("Policy Name  " +policyName);
		System.out.println("Premium Amount  " +premiumAmount);
	}
}
