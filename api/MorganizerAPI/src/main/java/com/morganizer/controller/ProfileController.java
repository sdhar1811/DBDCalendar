package com.morganizer.controller;

import com.morganizer.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sun.java2d.cmm.Profile;

public class ProfileController {

    @Autowired
    ProfileService profileService;

    @DeleteMapping("/profilename")
    public void deleteProfile(@RequestParam String profileId) throws Exception{
        profileService.deleteProfile(profileId);
    }

}
