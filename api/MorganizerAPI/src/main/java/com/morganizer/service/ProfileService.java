package com.morganizer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.dto.ProfileRequest;
import com.morganizer.entity.ProfileEntity;
import com.morganizer.repository.ProfileRepository;
@Service
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

	public List<ProfileEntity> fetchAll(Long userId) {
		
		return profileRepository.findByUserId(userId);
		
	}
}
