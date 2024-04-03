package com.java.hib;

import java.util.List;

public interface RestaurantDao {
	List<Restaurant> showRestaurantDao();
	List<Menu> showMenu(String restaurantId);
}
