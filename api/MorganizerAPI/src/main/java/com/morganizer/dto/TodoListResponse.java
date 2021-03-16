package com.morganizer.dto;

import java.util.List;

import com.morganizer.entity.TaskEntity;

public class TodoListResponse {
	private long id;
	private String title;
	private List<TaskEntity> task;
	
	
	public TodoListResponse(long id, String title) {
		this.id=id;
		this.title=title;
	}
	public TodoListResponse(long id, String title,List<TaskEntity> task) {
		this.id=id;
		this.title=title;
		this.task=task;
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
	public List<TaskEntity> getTask() {
		return task;
	}
	public void setTask(List<TaskEntity> task) {
		this.task = task;
	}
	
	
}
