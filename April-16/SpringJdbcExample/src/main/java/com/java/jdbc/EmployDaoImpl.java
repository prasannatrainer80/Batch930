package com.java.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class EmployDaoImpl implements EmployDao {

	JdbcTemplate jdbcTemplate;
	
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
	public Employ searchEmploy(int empno) {
		String cmd = "select * from Employ where empno = ?";
		List<Employ> employList = jdbcTemplate.query(cmd, new Object[] {empno}, new RowMapper<Employ>() {

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
		if (employList.size() == 0) {
			return null;
		} 
		return employList.get(0);
	}

	@Override
	public String addEmploy(Employ employ) {
		String cmd = "Insert into Employ(empno, name, gender, dept, desig, basic) "
				+ " values(?,?,?,?,?,?)";
		jdbcTemplate.update(cmd, new Object[] {employ.getEmpno(), employ.getName(), 
				employ.getGender(), employ.getDept(), employ.getDesig(), 
					employ.getBasic()
			});
		return "Record Inserted...";
	}

	@Override
	public String deleteEmploy(int empno) {
		String cmd = "Delete From Employ where empno = ?";
		jdbcTemplate.update(cmd, new Object[] {empno});
		return "Employ Record Deleted...";
	}

	@Override
	public String updateEmploy(Employ employNew) {
		String cmd = "Update Employ set Name = ?, Gender = ?, Dept = ?, Desig = ?, "
				+ " Basic = ? Where Empno = ?";
		jdbcTemplate.update(cmd, new Object[] {employNew.getName(), 
				employNew.getGender(), employNew.getDept(), 
				employNew.getDesig(), employNew.getBasic(), employNew.getEmpno()
			});
		return "Employ Record Updated...";
	}
}

