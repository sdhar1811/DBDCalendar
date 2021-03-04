package com.morganizer.dto;

import java.sql.Timestamp;

public class TaskItemRequest {
	
	private long categoryId;
	private int calendarId;
	private String title;
	private String itemDesc;
	private Timestamp dueDate;
	private String url;
	private String repeatType;
	private Boolean complete;
	private int[] assigneeId;
	private int listId;
	
	public TaskItemRequest(long categoryId, int calendarId, String title, String itemDesc, Timestamp dueDate,
			String url, String repeatType, Boolean complete, int[] assigneeId, int listId) {
		super();
		this.categoryId = categoryId;
		this.calendarId = calendarId;
		this.title = title;
		this.itemDesc = itemDesc;
		this.dueDate = dueDate;
		this.url = url;
		this.repeatType = repeatType;
		this.complete = complete;
		this.assigneeId = assigneeId;
		this.listId = listId;
	}
	
	public long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}
	public int getCalendarId() {
		return calendarId;
	}
	public void setCalendarId(int calendarId) {
		this.calendarId = calendarId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getItemDesc() {
		return itemDesc;
	}
	public void setItemDesc(String itemDesc) {
		this.itemDesc = itemDesc;
	}
	public Timestamp getDueDate() {
		return dueDate;
	}
	public void setDueDate(Timestamp dueDate) {
		this.dueDate = dueDate;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getRepeatType() {
		return repeatType;
	}
	public void setRepeatType(String repeatType) {
		this.repeatType = repeatType;
	}
	public Boolean getComplete() {
		return complete;
	}
	public void setComplete(Boolean complete) {
		this.complete = complete;
	}
	public int[] getAssigneeId() {
		return assigneeId;
	}
	public void setAssigneeId(int[] assigneeId) {
		this.assigneeId = assigneeId;
	}
	public int getListId() {
		return listId;
	}
	public void setListId(int listId) {
		this.listId = listId;
	}	
}
