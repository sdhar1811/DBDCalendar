package com.morganizer.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="users")
public class UserDetailsEntity {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)	
	@Column(name="user_id")
	private long id;
	
	private String firstName;
	private String lastName;
	private String middleName;
	private String userName;
	private String email;
	private String birthdate;
	
	@Column(name = "mobile")
	private String phoneNumber;
	private String gender;
	
	private long roleId = 1;
	
	
	private Long defaultCalendarId;
	
	private Long defaultProfileId;

	public long getRoleid() {
		return roleId;
	}

	public void setRoleid(long roleid) {
		this.roleId = roleid;
	}

	public UserDetailsEntity() {
		
	}
	public UserDetailsEntity(String firstName, String lastName, String middleName, String userName,
			String email, String birthdate, String phoneNumber, String gender) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.middleName = middleName;
		this.userName = userName;
		this.email = email;
		this.birthdate = birthdate;
		this.phoneNumber = phoneNumber;
		this.gender = gender;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
	
	
	public Long getDefaultCalendarId() {
		return defaultCalendarId;
	}

	public void setDefaultCalendarId(Long defaultCalendarId) {
		this.defaultCalendarId = defaultCalendarId;
	}

	public Long getDefaultProfileId() {
		return defaultProfileId;
	}

	public void setDefaultProfileId(Long defaultProfileId) {
		this.defaultProfileId = defaultProfileId;
	}
	
	
}
