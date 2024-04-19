package com.java.mvc.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.java.mvc.dao.EmployDao;
import com.java.mvc.dao.EmployDaoImpl;
import com.java.mvc.model.Employ;

@Controller
public class HomeController {

	@RequestMapping(value="/")
	public ModelAndView test(HttpServletResponse response) throws IOException{
		EmployDao dao = new EmployDaoImpl();
		List<Employ> employList = dao.showEmployDao();
		return new ModelAndView("home", "employList", employList);
	}
}
