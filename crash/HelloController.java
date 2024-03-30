package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class HelloController {

	@GetMapping(value="/")
	public String sayHello() {
		return "Welcome to Spring Boot...";
	}
	
	@GetMapping(value="/chandra")
	public String getMethodName() {
		return "Hi I am ChandraSekhar...";
	}
	
}
