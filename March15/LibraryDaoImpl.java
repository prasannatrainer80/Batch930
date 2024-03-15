package com.java.lib;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LibraryDaoImpl implements LibraryDao {

	Connection connection;
	PreparedStatement pst;
	
	public int userExists(String user) throws ClassNotFoundException, SQLException {
		connection = ConnectionHelper.getConnection();
		String cmd = "select count(*) cnt from libusers where userName=?";
		pst = connection.prepareStatement(cmd);
		pst.setString(1, user);
		ResultSet rs = pst.executeQuery();
		rs.next();
		int count = rs.getInt("cnt");
		return count;
	}
	@Override
	public String createUser(String user, String password) throws ClassNotFoundException, SQLException {
		if (userExists(user)==1) {
			return "User-Name Already Exists...";
		}
		connection = ConnectionHelper.getConnection();
		String cmd = "Insert into libusers(Username,Password) values(?, ?)";
		pst = connection.prepareStatement(cmd);
		pst.setString(1, user);
		pst.setString(2, password);
		pst.executeUpdate();
		return "Login Created Successfully...";
	}

}
