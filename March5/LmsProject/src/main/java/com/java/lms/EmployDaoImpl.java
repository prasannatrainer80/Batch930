package com.java.lms;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EmployDaoImpl implements EmployDao {

	Connection connection;
	PreparedStatement pst;
	
	@Override
	public List<Employee> showEmployDao() throws ClassNotFoundException, SQLException {
		connection = ConnectionHelper.getConnection();
		String cmd = "select * from Employee";
		pst = connection.prepareStatement(cmd);
		ResultSet rs = pst.executeQuery();
		List<Employee> employList = new ArrayList<Employee>();
		Employee employee = null;
		while(rs.next()) {
			employee = new Employee();
			employee.setEmpId(rs.getInt("EMP_ID"));
			employee.setEmpName(rs.getString("EMP_NAME"));
			employee.setEmpEmail(rs.getString("EMP_MAIL"));
			employee.setEmpMobileNo(rs.getString("EMP_MOB_NO"));
			employee.setEmpDtJoin(rs.getDate("EMP_DT_JOIN"));
			employee.setEmpDept(rs.getString("EMP_DEPT"));
			employee.setEmpManagerId(rs.getInt("EMP_MANAGER_ID"));
			employee.setEmpLeaveBalance(rs.getInt("EMP_AVAIL_LEAVE_BAL"));
			employList.add(employee);
		}
		return employList;
	}

	@Override
	public Employee searchEmploy(int empId) throws ClassNotFoundException, SQLException {
		connection = ConnectionHelper.getConnection();
		String cmd = "select * from Employee where Emp_ID = ?";
		pst = connection.prepareStatement(cmd);
		pst.setInt(1, empId);
		ResultSet rs = pst.executeQuery();
		Employee employee = null;
		if (rs.next()) {
			employee = new Employee();
			employee.setEmpId(rs.getInt("EMP_ID"));
			employee.setEmpName(rs.getString("EMP_NAME"));
			employee.setEmpEmail(rs.getString("EMP_MAIL"));
			employee.setEmpMobileNo(rs.getString("EMP_MOB_NO"));
			employee.setEmpDtJoin(rs.getDate("EMP_DT_JOIN"));
			employee.setEmpDept(rs.getString("EMP_DEPT"));
			employee.setEmpManagerId(rs.getInt("EMP_MANAGER_ID"));
			employee.setEmpLeaveBalance(rs.getInt("EMP_AVAIL_LEAVE_BAL"));
		}
		return employee;
	}

}
