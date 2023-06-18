package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.example.model.Client;

@Component
public interface ClientRepository extends JpaRepository<Client, Long>{

}
