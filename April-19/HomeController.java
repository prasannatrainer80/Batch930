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
		return new ModelAndView("Calc");
	}
	
	@RequestMapping(value="/calc")
	public ModelAndView calc(HttpServletRequest request) {
		int firstNo, secondNo;
		firstNo = Integer.parseInt(request.getParameter("firstNo"));
		secondNo = Integer.parseInt(request.getParameter("secondNo"));
		int sum = firstNo + secondNo;
		String result = "";
		result += sum;
		return new ModelAndView("result", "result", result);
	}
}
