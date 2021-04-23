package com.morganizer.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

//TODO
//@Entity(name = "user_profile_map")
public class UserProfileMapEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="userid",referencedColumnName = "user_id")
	private UserDetailsEntity user;
	
	@ManyToOne
	@JoinColumn(name="profileid",referencedColumnName = "profile_id")
	private ProfileEntity profile;

}