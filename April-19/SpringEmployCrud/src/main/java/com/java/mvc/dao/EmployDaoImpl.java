package com.java.mvc.dao;

import java.util.ArrayList;
import java.util.List;

import com.java.mvc.model.Employ;

public class EmployDaoImpl implements EmployDao {

	static List<Employ> employList = new ArrayList<Employ>();
	
	static {
		employList.add(new Employ(1, "Ananth", "Male", "Java", "Programmer", 48234));
		employList.add(new Employ(2, "Maneesh", "Male", "Java", "Programmer", 88234));
		employList.add(new Employ(3, "Karthik", "Male", "React", "Expert", 46334));
		employList.add(new Employ(4, "Ramana", "Male", "Java", "TeamLead", 78234));
		employList.add(new Employ(5, "Sravani", "Female", "Dotnet", "Tester", 69234));
		employList.add(new Employ(6, "Leela", "Female", "Java", "Manager", 90423));
		employList.add(new Employ(7, "Meghana", "Female", "Dotnet", "Developer", 98323));
	}
	
	@Override
	public List<Employ> showEmployDao() {
		return employList;
	}

}
