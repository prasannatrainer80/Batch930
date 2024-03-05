package com.java.lms;

import java.sql.SQLException;

public interface LeaveDao {
	String applyLeave(LeaveHistory leaveHistory) throws ClassNotFoundException, SQLException;
	String approveDeny(int leaveId, int managerId, String status, String managerComments);
	LeaveHistory searchByLeaveId(int leaveId);
}
