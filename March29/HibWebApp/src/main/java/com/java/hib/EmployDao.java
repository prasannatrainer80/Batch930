package com.java.hib;

import java.util.List;

public interface EmployDao {

	List<Employ> showEmployDao();
	Employ searchEmploy(int empno);
	String updateEmploy(Employ employUpdated);
}
