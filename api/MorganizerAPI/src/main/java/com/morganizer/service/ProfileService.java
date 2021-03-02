package com.morganizer.service;

import com.morganizer.dto.ProfileRequest;
import com.morganizer.entity.ProfileEntity;
import com.morganizer.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ProfileService {

    @Autowired
    public ProfileRepository profileRepository;

    public void deleteProfile(ProfileRequest profileReq) {

        try {
            profileRepository.deleteByProfileIdAndUserId(profileReq.getProfileId(), profileReq.getUserId());
        }
        catch (Exception ex){
                //code to handle if user does not own the profile.
        }

    }
}
