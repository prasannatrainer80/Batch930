package com.java.hib;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class VendorDaoImpl implements VendorDao {

	SessionFactory sessionFactory;
	
	@Override
	public List<Vendor> showVendors() {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Vendor.class);
		List<Vendor> vendorList = cr.list();
		return vendorList;
	}

}
