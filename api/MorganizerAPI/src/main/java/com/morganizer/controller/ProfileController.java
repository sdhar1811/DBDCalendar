package com.morganizer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.morganizer.dto.ProfileRequest;
import com.morganizer.dto.ProfileResponse;
import com.morganizer.service.ProfileService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    ProfileService profileService;

    @DeleteMapping("/remove/{id}")
    public void deleteProfile(@PathVariable Long id) {
        profileService.deleteProfile(id);
    }
    
    @GetMapping("/fetchAll/{userId}")
    public List<ProfileResponse> fetchAll(@PathVariable Long userId) {
        return profileService.fetchAll(userId);
    }
    @PostMapping("/add")
    public ProfileResponse addProfile(@RequestBody ProfileRequest profileRequest) {
    	return profileService.addProfile(profileRequest);
    }
}
