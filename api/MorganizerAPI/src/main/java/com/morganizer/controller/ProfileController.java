package com.morganizer.controller;

import com.morganizer.dto.ProfileRequest;
import com.morganizer.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import sun.java2d.cmm.Profile;


public class ProfileController {

    @Autowired
    ProfileService profileService;

    @DeleteMapping("/deleteProfile")
    public void deleteProfile(@RequestBody ProfileRequest profileReq) {
        profileService.deleteProfile(profileReq);
    }

}
