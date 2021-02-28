package com.morganizer.service;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.entity.UserCredentials;
import com.morganizer.entity.UserDetailsEntity;
import com.morganizer.model.UserModel;
import com.morganizer.repository.UserCredentailsRepository;
import com.morganizer.repository.UserDetailsRepository;
import com.morganizer.utils.PasswordUtil;
import com.morganizer.utils.SecurePassword;

@Service
public class LoginService {

	@Autowired
	UserCredentailsRepository userCredentialsRepo;
	@Autowired
	UserDetailsRepository userDetailsRepo;

	@Autowired
	SecurePassword securePassword;

	public UserDetailsEntity validateUser(UserModel enteredDetails) throws Exception {
		List<UserCredentials> userCredentials = userCredentialsRepo.findByUsername(enteredDetails.getUsername());
		if (userCredentials.size()>0) {
			UserCredentials dbCredentails = userCredentials.get(0);
			try {				
				if(securePassword.verifyPassword(enteredDetails.getPassword(), Base64.getDecoder().decode(dbCredentails.getSalt()),
						dbCredentails.getHash())) {
					List<UserDetailsEntity> user = userDetailsRepo.findByUserName(enteredDetails.getUsername());
					return user==null?null:user.get(0);
				}
			} catch (NoSuchAlgorithmException ex) {
				ex.printStackTrace();
			}
		}
		throw new Exception("Invalid Credentials");
	}

	public void registerUser(UserModel userDetails) throws Exception {
		byte[] salt = PasswordUtil.getSalt(20);
		String hashedPassword = securePassword.generateSecurePassword(userDetails.getPassword(), salt);
				userCredentialsRepo.save(new UserCredentials(userDetails.getUsername(), hashedPassword,
				Base64.getEncoder().encodeToString(salt), userDetails.getEmail()));
	}

}
