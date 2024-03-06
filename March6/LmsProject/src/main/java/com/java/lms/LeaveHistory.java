package com.java.lms;

import java.sql.Date;

public class LeaveHistory {

	private int leaveId;
	private int noOfDays;
	private String managerComments;
	private int empId;
	private Date leaveStartDate;
	private Date leaveEndDate;
	private String leaveType;
	private String leaveStatus;
	private String leaveReason;
	public int getLeaveId() {
		return leaveId;
	}
	public void setLeaveId(int leaveId) {
		this.leaveId = leaveId;
	}
	public int getNoOfDays() {
		return noOfDays;
	}
	public void setNoOfDays(int noOfDays) {
		this.noOfDays = noOfDays;
	}
	public String getManagerComments() {
		return managerComments;
	}
	public void setManagerComments(String managerComments) {
		this.managerComments = managerComments;
	}
	public int getEmpId() {
		return empId;
	}
	public void setEmpId(int empId) {
		this.empId = empId;
	}
	public Date getLeaveStartDate() {
		return leaveStartDate;
	}
	public void setLeaveStartDate(Date leaveStartDate) {
		this.leaveStartDate = leaveStartDate;
	}
	public Date getLeaveEndDate() {
		return leaveEndDate;
	}
	public void setLeaveEndDate(Date leaveEndDate) {
		this.leaveEndDate = leaveEndDate;
	}
	public String getLeaveType() {
		return leaveType;
	}
	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}
	public String getLeaveStatus() {
		return leaveStatus;
	}
	public void setLeaveStatus(String leaveStatus) {
		this.leaveStatus = leaveStatus;
	}
	public String getLeaveReason() {
		return leaveReason;
	}
	public void setLeaveReason(String leaveReason) {
		this.leaveReason = leaveReason;
	}
	@Override
	public String toString() {
		return "LeaveHistory [leaveId=" + leaveId + ", noOfDays=" + noOfDays + ", managerComments=" + managerComments
				+ ", empId=" + empId + ", leaveStartDate=" + leaveStartDate + ", leaveEndDate=" + leaveEndDate
				+ ", leaveType=" + leaveType + ", leaveStatus=" + leaveStatus + ", leaveReason=" + leaveReason + "]";
	}
	public LeaveHistory() {
		// TODO Auto-generated constructor stub
	}
	public LeaveHistory(int leaveId, int noOfDays, String managerComments, int empId, Date leaveStartDate,
			Date leaveEndDate, String leaveType, String leaveStatus, String leaveReason) {
		this.leaveId = leaveId;
		this.noOfDays = noOfDays;
		this.managerComments = managerComments;
		this.empId = empId;
		this.leaveStartDate = leaveStartDate;
		this.leaveEndDate = leaveEndDate;
		this.leaveType = leaveType;
		this.leaveStatus = leaveStatus;
		this.leaveReason = leaveReason;
	}
	
	
}
