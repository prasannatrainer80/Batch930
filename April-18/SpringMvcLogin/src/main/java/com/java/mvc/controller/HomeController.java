package com.java.mvc.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	@RequestMapping(value="/")
	public ModelAndView test(HttpServletResponse response) throws IOException{
		return new ModelAndView("home");
	}
	
	@RequestMapping(value="/login")
	public ModelAndView login(HttpServletRequest request) throws IOException{
		String user = request.getParameter("userName");
		String pwd = request.getParameter("passWord");
		if (user.equals("Prasanna") && pwd.equals("Prasanna")) {
			return new ModelAndView("Menu");
		} else {
			return new ModelAndView("home","error","Invalid Credentials...");
		}
	}
	
	
}
