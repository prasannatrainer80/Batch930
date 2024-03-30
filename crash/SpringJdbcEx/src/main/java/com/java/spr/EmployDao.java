package com.java.spr;

import java.util.List;

public interface EmployDao {

	List<Employ> showEmployDao();
	Employ searchEmployDao(int empno);
	String addEmployDao(Employ employNew);
	String deleteEmployDao(int empno);
}
