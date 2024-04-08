package com.java.hib;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Wallet")
public class Wallet {

	@Column(name="Cus_Id")
	private int custId;
	@Id
	@Column(name="Wal_id")
	private int walId;
	@Column(name="Wal_Amount")
	private double walAmount;
	@Column(name="Wal_Source")
	private String walSource;
	public int getCustId() {
		return custId;
	}
	public void setCustId(int custId) {
		this.custId = custId;
	}
	public int getWalId() {
		return walId;
	}
	public void setWalId(int walId) {
		this.walId = walId;
	}
	public double getWalAmount() {
		return walAmount;
	}
	public void setWalAmount(double walAmount) {
		this.walAmount = walAmount;
	}
	public String getWalSource() {
		return walSource;
	}
	public void setWalSource(String walSource) {
		this.walSource = walSource;
	}
	
	
}
