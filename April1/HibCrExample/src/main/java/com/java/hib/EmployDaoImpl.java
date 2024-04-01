package com.java.hib;

import java.util.List;

import org.apache.catalina.User;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

public class EmployDaoImpl implements EmployDao {

	SessionFactory sessionFactory;
	
	public List<Users> showUsers() {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		//Criteria cr = session.createCriteria(Users.class);
		Query query = session.createQuery("from Users");
		return query.list();
	}
	public Users validateUser(String userName, String passCode) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Users.class);
	
		cr.add(Restrictions.eq("userName", userName.trim()));
		cr.add(Restrictions.eq("passCode", passCode.trim()));
		System.out.println(userName);
		System.out.println(passCode);
		Users userFound = (Users)cr.uniqueResult();
		System.out.println("Result is  " +userFound);
		return userFound;
	}
	
	@Override
	public List<Employ> showEmployDao() {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Employ.class);
		List<Employ> employList = cr.list();
		return employList;
	}

	@Override
	public List<Employ> showEmployByNameDao() {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Employ.class);
		cr.addOrder(Order.asc("name"));
		List<Employ> employList = cr.list();
		return employList;
	}

	@Override
	public Employ searchEmployDao(int empno) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Employ.class);
		cr.add(Restrictions.eq("empno", empno));
		Employ employ = (Employ)cr.uniqueResult();
		return employ;
	}

}
