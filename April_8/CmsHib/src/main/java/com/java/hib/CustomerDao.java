package com.java.hib;

import java.util.List;

public interface CustomerDao {

	int validateCustomer(String userName, String passWord);
	Customer showCustomerInfo(String userName);
	List<Wallet> showCustomerWallet(int cusId);
	List<Orders> showCustomerOrders(int custId);
	List<Orders> showCustomerPendingOrders(int custId);
	String placeOrder(Orders order);
}
