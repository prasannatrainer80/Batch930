package com.java.hib;

import java.util.List;

public interface EmployDao {

	List<Employ> showEmployDao();
	List<Employ> showEmployByNameDao();
	Employ searchEmployDao(int empno);
}
