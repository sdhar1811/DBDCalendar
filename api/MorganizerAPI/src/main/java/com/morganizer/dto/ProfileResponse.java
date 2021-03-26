package com.morganizer.dto;

public class ProfileResponse {	
	private String name;
	private String gender;
	private String phoneNumber;
	private String birthdate;
	private String email;
	private Long profileId;
	private long userId;
	private String color;
	private boolean selected;
	
	
	
	
	
	public ProfileResponse() {
		
	}
	
	
	public ProfileResponse(String name, String gender, String phoneNumber, String birthdate, String email,
			Long profileId, long userId, String color, boolean selected) {
		super();
		this.name = name;
		this.gender = gender;
		this.phoneNumber = phoneNumber;
		this.birthdate = birthdate;
		this.email = email;
		this.profileId = profileId;
		this.userId = userId;
		this.color = color;
		this.selected = selected;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getProfileId() {
		return profileId;
	}
	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	
	

}
