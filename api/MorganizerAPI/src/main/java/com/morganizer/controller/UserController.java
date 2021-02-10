package com.morganizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.morganizer.model.UserModel;
import com.morganizer.service.LoginService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	LoginService loginService;
	
	
	@PostMapping("/login")
	public void validateUserCredentials(@RequestBody UserModel userDetails) {
		System.out.println(loginService.validateUser(userDetails));
		
	}
	@PostMapping("/register")
	public void registerUser(@RequestBody UserModel userDetails) throws Exception {
		loginService.registerUser(userDetails);
	}

}
