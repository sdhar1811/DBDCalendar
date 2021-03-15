package com.morganizer.dto;

import java.sql.Timestamp;


import com.morganizer.entity.TaskEntity;

public class TaskItemRequest {

	private long id;
	private String description;
	private String title;
	private Timestamp duedate;
	private String repeatType;
	private boolean complete;
	private int task_id;
	
	public TaskItemRequest(long id, String description, String title, Timestamp duedate, String repeatType,
			boolean complete, int task_id) {
		super();
		this.id = id;
		this.description = description;
		this.title = title;
		this.duedate = duedate;
		this.repeatType = repeatType;
		this.complete = complete;
		this.task_id = task_id;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Timestamp getDuedate() {
		return duedate;
	}
	public void setDuedate(Timestamp duedate) {
		this.duedate = duedate;
	}
	public String getRepeatType() {
		return repeatType;
	}
	public void setRepeatType(String repeatType) {
		this.repeatType = repeatType;
	}
	public boolean isComplete() {
		return complete;
	}
	public void setComplete(boolean complete) {
		this.complete = complete;
	}
	
	public int getTask_id() {
		return task_id;
	}
	public void setTask_id(int task_id) {
		this.task_id = task_id;
	}
	
}
