package com.java.lib;

import java.sql.SQLException;
import java.util.List;

public interface LibraryDao {

	String createUser(String user, String password) throws ClassNotFoundException, SQLException;
	int loginCheck(String user, String password) throws ClassNotFoundException, SQLException;
	List<Books> searchBooks(String searchType, String searchValue) throws ClassNotFoundException, SQLException;
	String issueBook(String user, int bookId) throws ClassNotFoundException, SQLException;
	List<TranBook> returnBook(String userName) throws ClassNotFoundException, SQLException;
	String returnProcess(String userName, String bookId) throws ClassNotFoundException, SQLException;
}
