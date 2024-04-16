package com.java.jdbc;

import java.util.List;

public interface EmployDao {

	List<Employ> showEmployDao();
	Employ searchEmploy(int empno);
	String addEmploy(Employ employ);
	String deleteEmploy(int empno);
	String updateEmploy(Employ employNew);
}
