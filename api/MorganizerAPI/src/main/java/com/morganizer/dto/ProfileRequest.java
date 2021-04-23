package com.morganizer.dto;

public class ProfileRequest {

    private long userId;
    private Long profileId;
    private String name;
    private String email;
    private String gender;
    private String phoneNumber;
    private String birthdate;
    private String color;
    private boolean selected;
    
    
    public ProfileRequest() {
    	
    }
    public ProfileRequest(long userId, long profileId) {
        this.userId = userId;
        this.profileId = profileId;
    }
    
    public ProfileRequest(long userId, String name, String email, String gender, String phoneNumber, String birthdate,
			String color, boolean selected) {
		super();
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.gender = gender;
		this.phoneNumber = phoneNumber;
		this.birthdate = birthdate;
		this.color = color;
		this.selected = selected;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public long getUserId() {
        return userId;
    }

    public Long getProfileId() {
        return profileId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	
	
    
    
}
