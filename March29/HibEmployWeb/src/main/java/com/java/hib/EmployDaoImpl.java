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
	public Employ searchEmployDao(int empno) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("from Employ where empno = " +empno);
		Employ employ = (Employ) query.uniqueResult();
		return employ;
	}

	@Override
	public String addEmployDao(Employ employNew) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Transaction trans = session.beginTransaction();
		session.save(employNew);
		trans.commit();
		return "Employ Record Inserted...";
	}

	@Override
	public String updateEmployDao(Employ employUpdated) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Transaction trans = session.beginTransaction();
		session.saveOrUpdate(employUpdated);
		trans.commit();
		return "Employ Record Inserted...";
	}

	@Override
	public String deleteEmployDao(int empno) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Employ employ = searchEmployDao(empno);
		Transaction trans = session.beginTransaction();
		session.delete(employ);
		trans.commit();
		return "Employ Record Deleted...";
	}

	@Override
	public int authenticate(String user, String pwd) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		String cmd = "from Users where userName = '" +user+ "' and passCode = '" +pwd + "'";
		Query query = session.createQuery(cmd);
		Users users = (Users)query.uniqueResult();
		if (users !=null) {
			return 1;
		}
		return 0;
	}
}
