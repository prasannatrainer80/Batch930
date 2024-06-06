package com.java.spr;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class ComplaintDaoImpl implements ComplaintDao {

	private JdbcTemplate jdbcTemplate;
	
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public String generateComplaintId() {
		String cmd = "select case when max(ComplaintID) IS NULL THEN 'C0000' "
				+ " else Max(ComplaintId) end cid from Complaint";
		 String cid = (String) jdbcTemplate.queryForObject(
		            cmd, String.class);
		System.out.println("Object Value  " +cid);
		String str = (String)cid;
		int id = Integer.parseInt(str.substring(1));
		id++;
		String str1 = String.format("C%03d", id);
		return str1;
	}
	
	@Override
	public String addComplaint(Complaint complaint) {
		String cid = generateComplaintId();
		complaint.setComplaintId(cid);
		String cmd = "Insert into Complaint(complaintId, ComplaintType, CDescription,Severity)"
				+ " values(?,?,?,?)";
		jdbcTemplate.update(cmd, new Object[] {complaint.getComplaintId(), 
					complaint.getComplaintType(), complaint.getcDescription(), 
					complaint.getSeverity()
				});
		return "Complaint Registered...";
	}

}
