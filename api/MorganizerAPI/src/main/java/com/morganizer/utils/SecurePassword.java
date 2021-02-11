package com.morganizer.utils;

import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Component;

@Component
public class SecurePassword {

	String algorithm = "MD5";

	public SecurePassword() {

	}

	public String generateSecurePassword(String password,byte[] salt) throws Exception {		
		try {
			return PasswordUtil.generateSecurePassword(password, salt, algorithm);			
		} catch (NoSuchAlgorithmException ex) {
			throw new Exception("Algorithm :" + this.algorithm + " not supported");
		}
	}
	
	public boolean verifyPassword(String password, byte[] salt, String hash) throws NoSuchAlgorithmException  {
		
		return PasswordUtil.verifyPassword(password,salt ,hash,algorithm);
	}
	
}
