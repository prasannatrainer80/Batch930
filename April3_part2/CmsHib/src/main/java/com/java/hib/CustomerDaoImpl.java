package com.java.hib;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
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
	
	
}
