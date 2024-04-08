package com.java.hib;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

public class RestaurantDaoImpl implements RestaurantDao {

	SessionFactory sessionFactory;
	
	@Override
	public List<Restaurant> showRestaurantDao() {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Restaurant.class);
		return cr.list();
	}

	@Override
	public List<Menu> showMenu(String restaurantId) {
		sessionFactory = SessionHelper.getConnection();
		Session session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(Menu.class);
		cr.add(Restrictions.eq("restaurantId", restaurantId));
		return cr.list();
	}

}
