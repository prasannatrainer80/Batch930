package com.java.p2;

import com.java.p1.Data;
import com.java.p1.Demo;

public class Testing extends Data {

	public void tests() {
		Testing obj= new Testing();
		System.out.println(obj.protectedStr);
		System.out.println(obj.publicStr);
	}
}
