package com.java.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class EmployDaoImpl implements EmployDao {

	private JdbcTemplate jdbcTemplate;
	
	
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}


	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}


	@Override
	public List<Employ> showEmployDao() {
		String cmd = "select * from Employ";
		List<Employ> employList = jdbcTemplate.query(cmd, new RowMapper<Employ>() {
			@Override
			public Employ mapRow(ResultSet rs, int rowNum) throws SQLException {
				Employ employ = new Employ();
				employ.setEmpno(rs.getInt("empno"));
				employ.setName(rs.getString("name"));
				employ.setGender(rs.getString("gender"));
				employ.setDept(rs.getString("dept"));
				employ.setDesig(rs.getString("desig"));
				employ.setBasic(rs.getDouble("basic"));
				return employ;
			}
		});
		return employList;
	}


	@Override
	public Employ searchEmployDao(int empno) {
		String cmd = "select * from Employ where empno = ?";
		Employ employ = jdbcTemplate.queryForObject(cmd, new Object[] {empno}, 
				new BeanPropertyRowMapper<Employ>(Employ.class));
		return employ;
	}


	@Override
	public String addEmployDao(Employ employ) {
		String cmd = "Insert into Employ(empno, name, gender, dept, desig, basic) "
				+ " values(?,?,?,?,?,?)";
		jdbcTemplate.update(cmd, new Object[] {employ.getEmpno(), employ.getName(), 
					employ.getGender(), employ.getDept(), employ.getDesig(), employ.getBasic()
				});
		return "Employ Record Inserted...";
	}


	@Override
	public String deleteEmployDao(int empno) {
		Employ employ = searchEmployDao(empno);
		if (employ!=null) {
			String cmd = "delete from Employ where empno = ?";
			jdbcTemplate.update(cmd, new Object[] {empno});
			return "Employ Record Deleted...";
		}
		return "Employ Record Not Found...";
	}


	@Override
	public String updateEmployDao(Employ employUpdated) {
		String cmd = "Update Employ set Name = ?, Gender = ?, Dept = ?, Desig = ?, Basic = ? "
				+ " Where Empno = ?";
		jdbcTemplate.update(cmd, new Object[] {employUpdated.getName(), employUpdated.getGender(),
				employUpdated.getDept(), employUpdated.getDesig(), employUpdated.getBasic(),
				employUpdated.getEmpno()
					});
		return "Employ Record Updated...";
	}


	@Override
	public UserData authenticate(String user, String pwd) {
		String cmd = "select * from UserData where userName = ? AND PassCode = ?";
		UserData userData = jdbcTemplate.queryForObject(cmd, new Object[] {user, pwd}, 
				new BeanPropertyRowMapper<UserData>(UserData.class));
		return userData;
	}

}
