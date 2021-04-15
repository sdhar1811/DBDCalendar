package com.morganizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

	@PostMapping("/account")
	public void updateAccountDetails(@RequestBody UserModel userDetails) throws Exception {
		signUpService.registerUser(userDetails);
	}

}
