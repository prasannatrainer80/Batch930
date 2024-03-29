package com.java.hib;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

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

	@Override
	public Employ searchEmploy(int empno) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("from Employ where empno="+empno);
		Employ employ = (Employ)query.uniqueResult();
		return employ;
	}

	@Override
	public String updateEmploy(Employ employUpdated) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Transaction trans = session.beginTransaction();
		session.saveOrUpdate(employUpdated);
		trans.commit();
		return "Employ Record Updated...";
	}

}
