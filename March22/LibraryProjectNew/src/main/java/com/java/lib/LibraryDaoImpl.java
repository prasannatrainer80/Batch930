package com.java.lib;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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
	@Override
	public int loginCheck(String user, String password) throws ClassNotFoundException, SQLException {
		connection = ConnectionHelper.getConnection();
		String cmd = "select count(*) cnt from libusers where username = ? AND Password = ?";
		pst = connection.prepareStatement(cmd);
		pst.setString(1, user);
		pst.setString(2, password);
		ResultSet rs = pst.executeQuery();
		rs.next();
		int count = rs.getInt("cnt");
		return count;
	}
	@Override
	public List<Books> searchBooks(String searchType, String searchValue) throws ClassNotFoundException, SQLException {
		String cmd = "";
		boolean flag = false;
		if (searchType.equals("id")) {
			cmd = "select * from Books where id = ?";
			flag = true;
		} else if (searchType.equals("dept")) {
			cmd = "select * from Books where dept = ?";
			flag = true;
		} else if (searchType.equals("bookname")) {
			cmd = "select * from Books where name = ?";
			flag = true;
		} else if (searchType.equals("authorname")) {
			cmd = "select * from Books where author = ?";
			flag = true;
		} else {
			cmd = "select * from Books";
		}
		connection = ConnectionHelper.getConnection();
		pst = connection.prepareStatement(cmd);
		if (flag==true) {
			pst.setString(1, searchValue);
		}
		ResultSet rs = pst.executeQuery();
		Books books = null;
		List<Books> booksList = new ArrayList<Books>();
		while(rs.next()) {
			books = new Books();
			books.setId(rs.getInt("id"));
			books.setName(rs.getString("name"));
			books.setAuthor(rs.getString("Author"));
			books.setEdition(rs.getString("Edition"));
			books.setDept(rs.getString("dept"));
			books.setTotalBooks(rs.getInt("TotalBooks"));
			booksList.add(books);
		}
		return booksList;
	}
	@Override
	public String issueBook(String user, int bookId) throws ClassNotFoundException, SQLException {
		connection = ConnectionHelper.getConnection();
		String cmd = "Insert into TranBook(UserName,BookId) values(?, ?)";
		pst = connection.prepareStatement(cmd);
		pst.setString(1, user);
		pst.setInt(2, bookId);
		pst.executeUpdate();
		cmd = "Update Books set TotalBooks = TotalBooks - 1 where id = ?";
		pst = connection.prepareStatement(cmd);
		pst.setInt(1, bookId);
		pst.executeUpdate();
		return "Book with id " +bookId + " Issued Successfully...";
	}

}
