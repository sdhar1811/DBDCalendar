package com.morganizer.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "user_credentials")
public class UserCredentials {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)	
	private long id;
	private String username;
	private String hash;
	private String salt;
	
	public UserCredentials() {
		
	}

	public UserCredentials(String username, String hash, String salt) {
		this.username = username;
		this.hash = hash;
		this.salt = salt;
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

}
