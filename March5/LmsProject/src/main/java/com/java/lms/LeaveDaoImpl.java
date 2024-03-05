package com.java.lms;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

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
		return "Leave Applied Successfully...Balance Updated...";
	}

	@Override
	public String approveDeny(int leaveId, int managerId, String status, String managerComments) {
		// TODO Auto-generated method stub
		return null;
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
		}
	}
}
