package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmployService {

	@Autowired
	EmployRepository repo;
	
	public List<Employ> showEmploy() {
		return repo.findAll();
	}
	
	public Employ searchEmploy(int empno) {
		return repo.findById(empno).get();
	}
	
	public String addEmploy(Employ employ) {
		repo.save(employ);
		return "Employ Record Inserted...";
	}
	
	public String updateEmploy(Employ employ) {
		repo.save(employ);
		return "Employ Record Updated...";
	}
	
	public String deleteEmploy(int empno) {
		Employ employ = searchEmploy(empno);
		repo.delete(employ);
		return "Employ Record Deleted...";
	}
}
