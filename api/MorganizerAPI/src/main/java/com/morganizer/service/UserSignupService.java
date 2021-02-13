package com.morganizer.service;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.entity.UserCredentials;
import com.morganizer.entity.UserDetailsEntity;
import com.morganizer.model.UserModel;
import com.morganizer.repository.UserCredentailsRepository;
import com.morganizer.repository.UserDetailsRepository;
import com.morganizer.repository.UserRolesRepository;
import com.morganizer.utils.PasswordUtil;
import com.morganizer.utils.SecurePassword;

@Service
public class UserSignupService {
	
	@Autowired
	UserDetailsRepository userDetailsRepo;
	
	@Autowired
	SecurePassword securePassword;
	
	@Autowired
	UserCredentailsRepository userCredentialsRepo;
	
	@Autowired
	UserRolesRepository userRolesRepo;
	
	
	public void registerUser(UserModel userInfo) throws Exception {
		storeUserDetails(userInfo);		
	}
	
	public void storeUserDetails(UserModel userInfo) {
		if(userInfo!=null) {
			UserDetailsEntity user = new UserDetailsEntity(userInfo.getFirstName(),userInfo.getLastName(),userInfo.getEmail(),userInfo.getGender(),userInfo.getBirthdate(),userInfo.getPhoneNumber());
		}
	}
	
	public void encryptPassword(UserModel userDetails) throws Exception {
		byte[] salt = PasswordUtil.getSalt(20);
		String hashedPassword = securePassword.generateSecurePassword(userDetails.getPassword(), salt);
				userCredentialsRepo.save(new UserCredentials(userDetails.getUsername(), hashedPassword,
				Base64.getEncoder().encodeToString(salt)));
	}
	
	public void fetchUserRole(UserModel userRoles) throws Exception {
		if(userRoles!=null) {
			
		}
		
	}
	


}
