package com.java.spr;

public class Product {

	private String product;
	private int quantityavail;
	private int price;
	
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public int getQuantityavail() {
		return quantityavail;
	}
	public void setQuantityavail(int quantityavail) {
		this.quantityavail = quantityavail;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	
	public void showInfo() {
		System.out.println("Product Name " +product 
				+ " Quantity Avail " +quantityavail + " Price  " +price);
	}

}
