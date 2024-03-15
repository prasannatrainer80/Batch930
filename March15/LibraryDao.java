package com.java.lib;

import java.sql.SQLException;

public interface LibraryDao {

	String createUser(String user, String password) throws ClassNotFoundException, SQLException;
}
