package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class EmployController {

	@Autowired
	EmployDaoImpl impl;
	
	@GetMapping(value="/showEmploy")
	public List<Employ> showEmploy() {
		return impl.showEmployDao();
	}
	
	@GetMapping(value="/searchEmploy/{empno}")
	public Employ searchEmploy(@PathVariable int empno) {
		return impl.searchEmploy(empno);
	}
	
	@PostMapping("/addEmploy")
	public String add(@RequestBody Employ employ) {
		 impl.addEmploy(employ);
		 return "Employ Record Inserted...";
	}
}
