package com.java.lib;

import java.sql.SQLException;
import java.util.List;

public interface LibraryDao {

	String createUser(String user, String password) throws ClassNotFoundException, SQLException;
	int loginCheck(String user, String password) throws ClassNotFoundException, SQLException;
	List<Books> searchBooks(String searchType, String searchValue) throws ClassNotFoundException, SQLException;
}
