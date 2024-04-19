package com.java.mvc.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
	
	@RequestMapping(value="/showNames")
	public ModelAndView show() {
		List<String> names= new ArrayList<String>();
		names.add("Ananth");
		names.add("Maneesh");
		names.add("Leela");
		names.add("Meghana");
		names.add("Karthik");
		names.add("Ramana");
		return new ModelAndView("result","names",names);
	}
}
