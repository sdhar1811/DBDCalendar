package com.morganizer.service;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.entity.UserCredentials;
import com.morganizer.model.UserModel;
import com.morganizer.repository.UserCredentailsRepository;
import com.morganizer.utils.PasswordUtil;
import com.morganizer.utils.SecurePassword;

@Service
public class LoginService {

	@Autowired
	UserCredentailsRepository userCredentialsRepo;

	@Autowired
	SecurePassword securePassword;

	public boolean validateUser(UserModel enteredDetails) {
		Optional<UserCredentials> userCredentials = userCredentialsRepo.findById(enteredDetails.getUsername());
		if (userCredentials.isPresent()) {
			UserCredentials dbCredentails = userCredentials.get();
			try {				
				return securePassword.verifyPassword(enteredDetails.getPassword(), Base64.getDecoder().decode(dbCredentails.getSalt()),
						dbCredentails.getHash());
			} catch (NoSuchAlgorithmException ex) {
				ex.printStackTrace();
			}
		}
		return false;

	}

	public void registerUser(UserModel userDetails) throws Exception {
		byte[] salt = PasswordUtil.getSalt(20);
		String hashedPassword = securePassword.generateSecurePassword(userDetails.getPassword(), salt);
				userCredentialsRepo.save(new UserCredentials(userDetails.getUsername(), hashedPassword,
				Base64.getEncoder().encodeToString(salt)));
	}

}
