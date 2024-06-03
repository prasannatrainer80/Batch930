package com.java.spr;

import java.util.List;

public class OrderLogic {

	private List<Order> orderList;

	public List<Order> getOrderList() {
		return orderList;
	}

	public void setOrderList(List<Order> orderList) {
		this.orderList = orderList;
	}
	
	public void show() {
		for (Order order : orderList) {
			order.showOrder();
			int diff = order.getQtyOrd() - order.getProduct().getQuantityavail();
			if (diff > 0) {
				System.out.println("Total Amount   " +order.getProduct().getPrice() * order.getQtyOrd());
			} else {
				System.out.println("Insufficient Quantity...");
			}
		}
	}
}
