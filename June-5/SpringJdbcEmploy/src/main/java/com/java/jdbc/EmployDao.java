package com.java.jdbc;

import java.util.List;

public interface EmployDao {
	List<Employ> showEmployDao();
	Employ searchEmployDao(int empno);
	String addEmployDao(Employ employ);
	String deleteEmployDao(int empno);
	String updateEmployDao(Employ employUpdated);
	UserData authenticate(String user, String pwd);
}
