package com.example.demo;

import java.util.List;

import javax.persistence.NamedQueries;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository  extends JpaRepository<Customer, Integer> {
	
}
