package com.morganizer.dto;


public class TaskRequest {
	private String title;
	private Long userId;
	
	
	public TaskRequest(String title, Long userId) {
		this.title=title;
		this.userId=userId;
	}
	
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	
	
	

}
