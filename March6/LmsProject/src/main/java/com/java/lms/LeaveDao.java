package com.java.lms;

import java.sql.SQLException;
import java.util.List;

public interface LeaveDao {
	String applyLeave(LeaveHistory leaveHistory) throws ClassNotFoundException, SQLException;
	String approveDeny(int leaveId, int managerId, String status, String managerComments) throws ClassNotFoundException, SQLException;
	LeaveHistory searchByLeaveId(int leaveId) throws ClassNotFoundException, SQLException;
	List<LeaveHistory> showEmployLeaveHistory(int empId) throws ClassNotFoundException, SQLException;
	List<LeaveHistory> pendingLeaves(int managerId) throws ClassNotFoundException, SQLException;
}
