package com.morganizer.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class PasswordUtil {

	public static byte[] getSalt(int length) {
		byte[] saltByte = new byte[length];
		SecureRandom random = new SecureRandom();
		random.nextBytes(saltByte);
		return saltByte;
	}

	public static String generateSecurePassword(String password, byte[] salt, String algorithm)
			throws NoSuchAlgorithmException {

		byte[] hashValue = generateHash(password.getBytes(), algorithm, salt);
		String securePassword = Base64.getEncoder().encodeToString(hashValue);

		return securePassword;
	}

	public static byte[] generateHash(byte[] passwordBytes, String algorithm, byte[] salt)
			throws NoSuchAlgorithmException {
		MessageDigest messageDigest = MessageDigest.getInstance(algorithm);
		messageDigest.reset();
		messageDigest.update(salt);
		return messageDigest.digest(passwordBytes);
	}

	public static boolean verifyPassword(String providedPassword, byte[] salt, String securePassword, String algorithm)
			throws NoSuchAlgorithmException {
		String providedPasswordHash = generateSecurePassword(providedPassword, salt, algorithm);
		return securePassword.equals(providedPasswordHash);
	}

}
