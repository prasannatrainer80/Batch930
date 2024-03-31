package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class EmployController {

	
	@Autowired
	EmployService service;
	
	@GetMapping(value="/showEmploy")
	public List<Employ> showEmploy() {
		return service.showEmploy(); 
	}
	
	@GetMapping(value="/searchEmploy/{id}")
	public Employ searchEmploy(@PathVariable int id) {
		return service.searchEmploy(id);
	}
	
	@PostMapping(value="/addEmploy")
	public String addEmploy(@RequestBody Employ employ) {
		return service.addEmploy(employ);
	}

	@PostMapping(value="/updateEmploy")
	public String updateEmploy(@RequestBody Employ employ) {
		return service.updateEmploy(employ);
	}
	
}
