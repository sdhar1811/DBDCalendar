package com.morganizer.dto;

import java.util.List;


public class TodoListResponse {
	private long id;
	private String title;
	private List<TaskResponse> tasks;
	
	
	public TodoListResponse(long id, String title) {
		this.id=id;
		this.title=title;
	}
	public TodoListResponse(long id, String title,List<TaskResponse> tasks) {
		this.id=id;
		this.title=title;
		this.tasks=tasks;
	}
	
	public long getId() {
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
	public List<TaskResponse> getTasks() {
		return tasks;
	}
	public void setTasks(List<TaskResponse> tasks) {
		this.tasks = tasks;
	}
	
	
	
}
