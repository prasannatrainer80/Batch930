package com.java.spr;

public class Appointment {

	private String disease;
	private String doctorName;
	private String timing;
	private double consultionFee;
	public String getDisease() {
		return disease;
	}
	public void setDisease(String disease) {
		this.disease = disease;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public String getTiming() {
		return timing;
	}
	public void setTiming(String timing) {
		this.timing = timing;
	}
	public double getConsultionFee() {
		return consultionFee;
	}
	public void setConsultionFee(double consultionFee) {
		this.consultionFee = consultionFee;
	}
	
	public void show(String patientName) {
		System.out.println("Patient Name  " +patientName);
		System.out.println("Disease  " +disease + " Doctor Name  " +doctorName);
		System.out.println("Timing  " +timing + " Consultion Fee " +consultionFee);
	}
}
