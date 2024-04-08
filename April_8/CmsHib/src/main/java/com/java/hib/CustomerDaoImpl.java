package com.java.hib;


import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

public class CustomerDaoImpl implements CustomerDao {

	SessionFactory sessionFactory;

	@Override
	public int validateCustomer(String userName, String passWord) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Customer.class);
		cr.add(Restrictions.eq("custUserName", userName));
		cr.add(Restrictions.eq("custPassword", passWord));
		Customer customer = (Customer)cr.uniqueResult();
		if (customer !=null) {
			return 1;
		}
		return 0;
	}

	@Override
	public Customer showCustomerInfo(String userName) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Customer.class);
		cr.add(Restrictions.eq("custUserName", userName));
		Customer customer = (Customer)cr.uniqueResult();
		return customer;
	}

	@Override
	public List<Wallet> showCustomerWallet(int cusId) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Wallet.class);
		cr.add(Restrictions.eq("custId", cusId));
		return cr.list();
	}

	@Override
	public List<Orders> showCustomerOrders(int custId) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Orders.class);
		cr.add(Restrictions.eq("cusId", custId));
		return cr.list();
	}

	@Override
	public List<Orders> showCustomerPendingOrders(int custId) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Orders.class);
		cr.add(Restrictions.eq("cusId", custId));
		cr.add(Restrictions.eq("ordStatus", "PENDING"));
		return cr.list();
	}

	@Override
	public String placeOrder(Orders order) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Wallet.class);
		cr.add(Restrictions.eq("custId", order.getCusId()));
		cr.add(Restrictions.eq("walSource", order.getWalSource()));
		Wallet wallet = (Wallet)cr.uniqueResult();
		double balance = wallet.getWalAmount();
		cr = session.createCriteria(Menu.class);
		cr.add(Restrictions.eq("menuId", order.getMenId()));
		Menu menu = (Menu)cr.uniqueResult();
		double price = menu.getPrice();
		double billAmount = price * order.getOrdQuantity();
		if (balance - billAmount < 0) {
			return "Insufficient Funds...";
		}
		order.setOrdBillAmount(billAmount);
		order.setOrdStatus("PENDING");
		Transaction trans = session.beginTransaction();
		cr = session.createCriteria(Orders.class);
		session.save(order);
		trans.commit();
		trans = session.beginTransaction();
		cr = session.createCriteria(Wallet.class);
		cr.add(Restrictions.eq("custId", order.getCusId()));
		cr.add(Restrictions.eq("walSource", order.getWalSource()));
		wallet = (Wallet)cr.uniqueResult();
		wallet.setWalAmount(balance - billAmount);
		session.saveOrUpdate(wallet);
		trans.commit();
		return "Order Placed Successfully...Balance Updated...";
		
	}
	
	
}
