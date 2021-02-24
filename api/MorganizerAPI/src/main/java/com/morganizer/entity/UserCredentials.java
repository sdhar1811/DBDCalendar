package com.morganizer.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "login_cred")
public class UserCredentials {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "logincredid")
	private long id;
	private String username;
	@Column(name = "passhash")
	private String hash;
	private String salt;
	
	private String email;
	
	

	public UserCredentials() {
		
	}

	public UserCredentials(String username, String hash, String salt, String email) {
		this.username = username;
		this.hash = hash;
		this.salt = salt;
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
