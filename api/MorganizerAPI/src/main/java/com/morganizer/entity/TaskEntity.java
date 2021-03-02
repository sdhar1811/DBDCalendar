package com.morganizer.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name="task")
public class TaskEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private int id;
	private String title;
	
	@ManyToOne
	@JoinColumn(name="userId",referencedColumnName="user_id")
	private UserDetailsEntity user;
	
	public TaskEntity() {
		
	}
	public TaskEntity(String title, UserDetailsEntity user) {
		this.title=title;
		this.user=user;
	}
	

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}


	public UserDetailsEntity getUser() {
		return user;
	}


	public void setUser(UserDetailsEntity user) {
		this.user = user;
	}
	
	
	
	

}
