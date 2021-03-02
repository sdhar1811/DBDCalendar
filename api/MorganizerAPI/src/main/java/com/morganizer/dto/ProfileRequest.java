package com.morganizer.dto;

public class ProfileRequest {

    private long userId;
    private long profileId;

    public ProfileRequest(long userId, long profileId) {
        this.userId = userId;
        this.profileId = profileId;
    }

    public long getUserId() {
        return userId;
    }

    public long getProfileId() {
        return profileId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setProfileId(long profileId) {
        this.profileId = profileId;
    }
}
