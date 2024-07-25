package com.example.demo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerDAO {

	@Autowired  
    JdbcTemplate jdbc;  
	
	public Customer searchByCustomerUser(String user) {
		String cmd = "select * from Customer where Cus_UserName=?";
		List<Customer> customerLIst = jdbc.query(cmd,new Object[] {user}, new RowMapper<Customer>() {

			@Override
			public Customer mapRow(ResultSet rs, int rowNum) throws SQLException {
				Customer customer = new Customer();
				customer.setCusId(rs.getInt("CUS_ID"));
				customer.setCusName(rs.getString("CUS_NAME"));
				customer.setCusUsername("CUS_USERNAME");
				customer.setCusPassword(rs.getString("CUS_PASSWORD"));
				customer.setCusPhnNo(rs.getString("CUS_PHN_NO"));
				customer.setCusEmail(rs.getString("CUS_EMAIL"));
				return customer;
			}
		});
		if (customerLIst.size()!=0) {
			return customerLIst.get(customerLIst.size()-1);
		}
		return null;
	}
	

	public String authenticate(String user,String pwd) {
		String cmd = "select count(*) cnt from Customer where Cus_UserName=? "
				+ " AND Cus_Password=?";
		List str=jdbc.query(cmd,new Object[] {user,pwd}, new RowMapper() {

			@Override
			public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				return rs.getInt("cnt");
			}
			
		});
		return str.get(0).toString();
	}
}