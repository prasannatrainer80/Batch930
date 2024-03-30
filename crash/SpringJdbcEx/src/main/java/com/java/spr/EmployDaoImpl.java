package com.java.spr;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
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
	public Employ searchEmployDao(int empno) {
		String cmd = "select * from Employ where empno=?";
		Employ employ = jdbcTemplate.queryForObject(cmd, new Object[]{empno},
				new BeanPropertyRowMapper<Employ>(Employ.class));
		if (employ!=null) {
			return employ;
		}
		return null;
	}


	@Override
	public String addEmployDao(Employ employNew) {
		String cmd = "Insert into Employ(empno, name, gender, dept, desig, "
				+ "basic) values(?, ?, ?, ?, ?, ?)";
		jdbcTemplate.update(cmd, new Object[] {employNew.getEmpno(),
				employNew.getName(),employNew.getGender().toString(),
				employNew.getDept(),employNew.getDesig(),employNew.getBasic()
});
return "Employ Record Inserted...";
	}


	@Override
	public String deleteEmployDao(int empno) {
		String cmd = "Delete from Employ where empno = ?";
		jdbcTemplate.update(cmd, new Object[] {empno});
		return "Employ Record Deleted...";
	}

}
