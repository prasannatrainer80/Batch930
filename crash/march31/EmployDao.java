package com.example.demo;

import java.util.List;

public interface EmployDao {

	List<Employ> showEmployDao();
	Employ searchEmploy(int empno);
	String addEmploy(Employ employ);
}
