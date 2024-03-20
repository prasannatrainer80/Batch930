package com.java.jstl;

import java.util.ArrayList;
import java.util.List;

public class EmployBean {

	static List<Employ> employList;
	static {
		employList = new ArrayList<Employ>();
		employList.add(new Employ(1, "Sravani", "Female", "Java", "Programmer", 84234.22));
		employList.add(new Employ(2, "Karthik", "Male", "React", "Developer", 90005.22));
		employList.add(new Employ(3, "Rajesh", "Male", "Angular", "Expert", 98866.23));
		employList.add(new Employ(4, "Meghana", "Female", "Java", "Analyst", 77751.44));
		employList.add(new Employ(5, "Akhil", "Male", "Angular", "Tester", 78899.24));
		employList.add(new Employ(6, "Maneesh", "Male", "Dotnet", "Developer", 84234.22));
	}
	
	public List<Employ> showEmploy() {
		return employList;
	}
}
