package com.morganizer.service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.entity.UserCredentials;
import com.morganizer.entity.UserDetailsEntity;
import com.morganizer.entity.UserRolesEntity;
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

	public void storeUserDetails(UserModel userInfo) throws Exception {
		if (userInfo != null) {
			UserDetailsEntity user = new UserDetailsEntity(userInfo.getFirstName(), userInfo.getLastName(), userInfo.getMiddelName()
					, userInfo.getUsername(), userInfo.getEmail(), userInfo.getBirthdate(), userInfo.getPhoneNumber(),
					userInfo.getGender());
			userDetailsRepo.save(user);
			encryptPassword(userInfo);
		}

	}

	public void encryptPassword(UserModel userDetails) throws Exception {
		byte[] salt = PasswordUtil.getSalt(20);
		String hashedPassword = securePassword.generateSecurePassword(userDetails.getPassword(), salt);
		userCredentialsRepo.save(new UserCredentials(userDetails.getUsername(), hashedPassword,
				Base64.getEncoder().encodeToString(salt)));
	}

	public void fetchUserRole(String username) throws Exception {
		List<UserDetailsEntity> userRoleList = userDetailsRepo.findByUserName(username);

		if (userRoleList.size() > 0) {
			Optional<UserRolesEntity> userRolesOptional = userRolesRepo.findById(userRoleList.get(0).getRoleid());
			
			if (userRolesOptional.isPresent()) {
				System.out.println(userRolesOptional.get().getRoleType());
			}
		}
	}
}
