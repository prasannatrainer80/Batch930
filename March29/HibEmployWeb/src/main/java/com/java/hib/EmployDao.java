package com.java.hib;

import java.util.List;

public interface EmployDao {

	List<Employ> showEmployDao();
	Employ searchEmployDao(int empno);
	String addEmployDao(Employ employNew);
	String updateEmployDao(Employ employUpdated);
	String deleteEmployDao(int empno);
	int authenticate(String user, String pwd);
}
