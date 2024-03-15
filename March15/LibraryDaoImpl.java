package com.java.lib;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class LibraryDaoImpl implements LibraryDao {

	Connection connection;
	PreparedStatement pst;
	
	@Override
	public String createUser(String user, String password) throws ClassNotFoundException, SQLException {
		connection = ConnectionHelper.getConnection();
		String cmd = "Insert into libusers(Username,Password) values(?, ?)";
		pst = connection.prepareStatement(cmd);
		pst.setString(1, user);
		pst.setString(2, password);
		pst.executeUpdate();
		return "Login Created Successfully...";
	}

}
