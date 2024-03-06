package com.java.lms;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LeaveDaoImpl implements LeaveDao{

	Connection connection;
	PreparedStatement pst;
	
	@Override
	public String applyLeave(LeaveHistory leaveHistory) throws ClassNotFoundException, SQLException {
		leaveHistory.setLeaveStatus("PENDING");
		long ms = leaveHistory.getLeaveEndDate().getTime() - leaveHistory.getLeaveStartDate().getTime();
		int days = (int) ms / (1000 * 60 * 60 * 24);
		days++;
		leaveHistory.setNoOfDays(days);
		EmployDao dao = new EmployDaoImpl();
		Employee employee = dao.searchEmploy(leaveHistory.getEmpId());
		int balance = employee.getEmpLeaveBalance();
		
		Date today = new Date();
		long ms1 = leaveHistory.getLeaveStartDate().getTime() - today.getTime();
		int day1 = (int) ms1 / (1000 * 60 * 60 * 24);
		day1++;
		System.out.println(day1);
		
		long ms2 = leaveHistory.getLeaveEndDate().getTime() - today.getTime();
		int day2 = (int) ms2 / (1000 * 60 * 60 * 24);
		day2++;
		
		long ms3 = leaveHistory.getLeaveEndDate().getTime() - leaveHistory.getLeaveStartDate().getTime();
		int day3 = (int) ms3 / (1000 * 60 * 60 * 24);
		day3++;
		
		if (day1 <= 0) {
			return "Leave-StartDate cannot be Yesterday's Date...";
		} else if (day2 <= 0) {
			return "Leave-EndDate Cannot be Yesterday's Date...";
		} else if (day3 <= 0) {
			return "Leave-Start Date cannot be Greater Than Leave-End Date...";
		} else if (balance - days < 0) {
			return "Insufficient Leave Balance...";
		}
		String cmd = "Insert into leave_history(EMP_ID, LEAVE_START_DATE, LEAVE_END_DATE, "
				+ "LEAVE_TYPE, LEAVE_STATUS, LEAVE_NO_OF_DAYS, LEAVE_REASON) "
				+ " values(?, ?, ?, ?, ?, ?, ?) ";
		connection = ConnectionHelper.getConnection();
		pst = connection.prepareStatement(cmd);
		pst.setInt(1, leaveHistory.getEmpId());
		pst.setDate(2, leaveHistory.getLeaveStartDate());
		pst.setDate(3, leaveHistory.getLeaveEndDate());
		pst.setString(4, leaveHistory.getLeaveType());
		pst.setString(5, leaveHistory.getLeaveStatus());
		pst.setInt(6, leaveHistory.getNoOfDays());
		pst.setString(7, leaveHistory.getLeaveReason());
		pst.executeUpdate();
		cmd = "Update Employee set EMP_AVAIL_LEAVE_BAL = EMP_AVAIL_LEAVE_BAL - ? "
				+ " Where EMP_ID = ?";
		pst = connection.prepareStatement(cmd);
		pst.setInt(1, days);
		pst.setInt(2, leaveHistory.getEmpId());
		pst.executeUpdate();
		MailSend.mailOtp("akhiladapala29@gmail.com", "Mail From Java Program", "Leave Applied...");
		return "Leave Applied Successfully...Balance Updated...";
	}

	@Override
	public String approveDeny(int leaveId, int managerId, String status, String managerComments) throws ClassNotFoundException, SQLException {
		LeaveHistory leaveHistory = searchByLeaveId(leaveId);
		int empId = leaveHistory.getEmpId();
		EmployDao dao = new EmployDaoImpl();
		Employee employee = dao.searchEmploy(empId);
		int actualManager = employee.getEmpManagerId();
		if (managerId != actualManager) {
			return "You are Unauthorized Manager...";
		}
		connection = ConnectionHelper.getConnection();
		if (status.toUpperCase().equals("YES")) {
			String cmd = "Update LEAVE_HISTORY SET LEAVE_STATUS='APPROVED', LEAVE_MNGR_COMMENTS = ? WHERE Leave_ID = ?";
			pst = connection.prepareStatement(cmd);
			pst.setString(1, managerComments);
			pst.setInt(2, leaveId);
			pst.executeUpdate();
			return "Leave Approved...";
		} else {
			String cmd = "Update LEAVE_HISTORY SET LEAVE_STATUS='DENIED', LEAVE_MNGR_COMMENTS = ? WHERE Leave_ID = ?";
			pst = connection.prepareStatement(cmd);
			pst.setString(1, managerComments);
			pst.setInt(2, leaveId);
			pst.executeUpdate();
			int leaveApplied = leaveHistory.getNoOfDays();
			cmd = "Update Employee SET EMP_AVAIL_LEAVE_BAL = EMP_AVAIL_LEAVE_BAL + ? WHERE EMP_ID = ?";
			pst = connection.prepareStatement(cmd);
			pst.setInt(1, leaveApplied);
			pst.setInt(2, empId);
			pst.executeUpdate();
			return "Leave Rejected...Sorry";
		}
		
		
	}

	@Override
	public LeaveHistory searchByLeaveId(int leaveId) throws ClassNotFoundException, SQLException {
		connection = ConnectionHelper.getConnection();
		String cmd = "select * from leave_history where Leave_id = ?";
		pst = connection.prepareStatement(cmd);
		pst.setInt(1, leaveId);
		ResultSet rs = pst.executeQuery();
		LeaveHistory leaveHistory = null;
		if (rs.next()) {
			leaveHistory = new LeaveHistory();
			leaveHistory.setLeaveId(rs.getInt("LEAVE_ID"));
			leaveHistory.setEmpId(rs.getInt("EMP_ID"));
			leaveHistory.setNoOfDays(rs.getInt("LEAVE_NO_OF_DAYS"));
			leaveHistory.setManagerComments(rs.getString("LEAVE_MNGR_COMMENTS"));
			leaveHistory.setLeaveStartDate(rs.getDate("LEAVE_START_DATE"));
			leaveHistory.setLeaveEndDate(rs.getDate("LEAVE_END_DATE"));
			leaveHistory.setLeaveType(rs.getString("LEAVE_TYPE"));
			leaveHistory.setLeaveStatus(rs.getString("LEAVE_STATUS"));
			leaveHistory.setLeaveReason(rs.getString("LEAVE_REASON"));
		}
		return leaveHistory;
	}

	@Override
	public List<LeaveHistory> showEmployLeaveHistory(int empId) throws ClassNotFoundException, SQLException {
		String cmd = "select * from leave_history where emp_id = ?";
		connection = ConnectionHelper.getConnection();
		pst = connection.prepareStatement(cmd);
		pst.setInt(1, empId);
		ResultSet rs = pst.executeQuery();
		LeaveHistory leaveHistory = null;
		List<LeaveHistory> listHistory  = new ArrayList<LeaveHistory>();
		while(rs.next()) {
			leaveHistory = new LeaveHistory();
			leaveHistory.setLeaveId(rs.getInt("LEAVE_ID"));
			leaveHistory.setEmpId(rs.getInt("EMP_ID"));
			leaveHistory.setNoOfDays(rs.getInt("LEAVE_NO_OF_DAYS"));
			leaveHistory.setManagerComments(rs.getString("LEAVE_MNGR_COMMENTS"));
			leaveHistory.setLeaveStartDate(rs.getDate("LEAVE_START_DATE"));
			leaveHistory.setLeaveEndDate(rs.getDate("LEAVE_END_DATE"));
			leaveHistory.setLeaveType(rs.getString("LEAVE_TYPE"));
			leaveHistory.setLeaveStatus(rs.getString("LEAVE_STATUS"));
			leaveHistory.setLeaveReason(rs.getString("LEAVE_REASON"));
			listHistory.add(leaveHistory);
		}
		return listHistory;
	}

	@Override
	public List<LeaveHistory> pendingLeaves(int managerId) throws ClassNotFoundException, SQLException {
		String cmd = "select * from leave_history where emp_id IN("
				+ "select Emp_Id from Employee where Emp_Manager_Id = ?) AND Leave_STATUS='PENDING'";
		connection = ConnectionHelper.getConnection();
		pst = connection.prepareStatement(cmd);
		pst.setInt(1, managerId);
		ResultSet rs = pst.executeQuery();
		LeaveHistory leaveHistory = null;
		List<LeaveHistory> listHistory  = new ArrayList<LeaveHistory>();
		while(rs.next()) {
			leaveHistory = new LeaveHistory();
			leaveHistory.setLeaveId(rs.getInt("LEAVE_ID"));
			leaveHistory.setEmpId(rs.getInt("EMP_ID"));
			leaveHistory.setNoOfDays(rs.getInt("LEAVE_NO_OF_DAYS"));
			leaveHistory.setManagerComments(rs.getString("LEAVE_MNGR_COMMENTS"));
			leaveHistory.setLeaveStartDate(rs.getDate("LEAVE_START_DATE"));
			leaveHistory.setLeaveEndDate(rs.getDate("LEAVE_END_DATE"));
			leaveHistory.setLeaveType(rs.getString("LEAVE_TYPE"));
			leaveHistory.setLeaveStatus(rs.getString("LEAVE_STATUS"));
			leaveHistory.setLeaveReason(rs.getString("LEAVE_REASON"));
			listHistory.add(leaveHistory);
		}
		return listHistory;
	}
}
