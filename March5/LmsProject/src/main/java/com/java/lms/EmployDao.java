package com.java.lms;

import java.sql.SQLException;
import java.util.List;

public interface EmployDao {

	List<Employee> showEmployDao() throws ClassNotFoundException, SQLException;
	Employee searchEmploy(int empId) throws ClassNotFoundException, SQLException;
}
