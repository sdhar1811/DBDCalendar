package com.morganizer.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "user_profile_map")
public class UserProfileMapEntity {
	
	@ManyToOne
	@JoinColumn(name="userid",referencedColumnName = "user_id")
	private UserDetailsEntity user;
	
	@ManyToOne
	@JoinColumn(name="profileid",referencedColumnName = "profile_id")
	private ProfileEntity profile;

}