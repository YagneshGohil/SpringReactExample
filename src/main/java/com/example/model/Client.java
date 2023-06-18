package com.example.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "client")
@Data
@Getter
@Setter
public class Client {
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private String email;
}
