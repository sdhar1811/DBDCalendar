package com.morganizer.controller;

import com.morganizer.dto.ProfileRequest;
import com.morganizer.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sun.java2d.cmm.Profile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    ProfileService profileService;

    @DeleteMapping("/deleteProfile")
    public void deleteProfile(@RequestBody ProfileRequest profileReq) {
        profileService.deleteProfile(profileReq);
    }
    
    @GetMapping("/fetchAll/{userId}")
    public void deleteProfile(@PathVariable Long userId) {
        profileService.fetchAll(userId);
    }
}
