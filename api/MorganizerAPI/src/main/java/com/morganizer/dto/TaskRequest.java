package com.morganizer.dto;


public class TaskRequest {
	private String title;
	private Long userId;
	private Long itemId;

	public TaskRequest(String title, Long userId) {
		this.title=title;
		this.userId=userId;
	}
	
	
	public TaskRequest(String title, Long userId, Long itemId) {
		super();
		this.title = title;
		this.userId = userId;
		this.itemId = itemId;
	}


	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
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
