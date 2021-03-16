package com.morganizer.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name="todo_list")
public class TodoListEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Long id;
	private String title;
	
	@ManyToOne
	@JoinColumn(name="userId",referencedColumnName="user_id")
	private UserDetailsEntity user;
	
	public TodoListEntity() {
		
	}
	public TodoListEntity(String title, UserDetailsEntity user) {
		this.title=title;
		this.user=user;
	}
	

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
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
