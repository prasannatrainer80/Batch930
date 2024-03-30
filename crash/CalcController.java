package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalcController {

	@GetMapping(value="/sum/{a}/{b}")
	public String sum(@PathVariable int a, @PathVariable int b) {
		String result ="";
		int c = a+b;
		result+="Sum is  " +c;
		return result;
	}
	
	@GetMapping(value="/sub/{a}/{b}")
	public String sub(@PathVariable int a, @PathVariable int b) {
		String result ="";
		int c = a - b;
		result+="Sub is  " +c;
		return result;
	}
	
	@GetMapping(value="/mult/{a}/{b}")
	public String mult(@PathVariable int a, @PathVariable int b) {
		String result = "";
		int c = a * b;
		result+="Mult is  " +c;
		return result;
	}
	
	
	
}
