package com.java.employ;

import java.sql.SQLException;
import java.util.List;

public interface EmployDao {
 	List<Employ> showEmployDao() throws ClassNotFoundException, SQLException;
 	Employ searchEmployDao(int empno) throws ClassNotFoundException, SQLException;
}
