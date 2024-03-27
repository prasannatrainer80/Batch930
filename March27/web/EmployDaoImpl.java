package com.java.hib;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class EmployDaoImpl implements EmployDao {

	SessionFactory sessionFactory;
	
	@Override
	public List<Employ> showEmployDao() {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("from Employ");
		List<Employ> employList = query.list();
		return employList;
	}

}
