package com.java.mvc.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class HomeController {

	@RequestMapping(value="/")
	public ModelAndView test(HttpServletResponse response) throws IOException{
		return new ModelAndView("home");
	}
	
	@RequestMapping(value="/prasanna")
	public ModelAndView show() {
		return new ModelAndView("prasanna");
	}
	
	@RequestMapping(value="/karthik")
	public ModelAndView karthik() {
		return new ModelAndView("karthik");
	}
	
	@RequestMapping(value="/ananth")
	public ModelAndView ananth() {
		return new ModelAndView("ananth");
	}
	
	
}
