package com.java.hib;

public interface CustomerDao {

	int validateCustomer(String userName, String passWord);
	Customer showCustomerInfo(String userName);
}
