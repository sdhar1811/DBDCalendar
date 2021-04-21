package com.morganizer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.morganizer.entity.ResetQuestionsEntity;
import com.morganizer.entity.UserCredentials;
import com.morganizer.entity.UserDetailsEntity;
import com.morganizer.model.UserModel;
import com.morganizer.service.LoginService;
import com.morganizer.service.UserSignupService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	LoginService loginService;
	@Autowired
	UserSignupService signUpService;
	
	@Autowired
	UserSignupService userSignupService;
	
	
	@PostMapping("/login")
	public UserDetailsEntity validateUserCredentials(@RequestBody UserModel userDetails) throws Exception {
		return loginService.validateUser(userDetails);
		
	}
	@PostMapping("/register")
	public void registerUser(@RequestBody UserModel userDetails) throws Exception {	 
		signUpService.registerUser(userDetails);
		
	}
	
	@GetMapping("/role")
	public void fetchRoles(@RequestParam String username) throws Exception {
		userSignupService.fetchUserRole(username);
	}

	@PostMapping("/user/account")
	public void updateAccountDetails(@RequestBody UserModel userDetails) throws Exception {
		signUpService.registerUser(userDetails);
	}
	
	@GetMapping("/questions")
	public List<ResetQuestionsEntity> getAllResetQuestions() throws Exception {
		return userSignupService.fetchAllSecurityQuestions();
	}
	
	@PostMapping("/checkusername")
	public UserCredentials fetchResetQnA(@RequestBody UserModel userDetails) throws Exception {
		return userSignupService.fetchSecurityQnA(userDetails);
	}

	@PostMapping("/resetpassword")
	public void resetPassword(@RequestBody UserModel userDetails) throws Exception {
		userSignupService.saveResetPassword(userDetails);
	}

}
