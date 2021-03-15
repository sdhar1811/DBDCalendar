package com.morganizer.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

// TO-DO
@Entity(name="todo_items")
public class ItemEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String description;
	private String title;
	private Timestamp duedate;
	private String repeatType;
	private boolean complete;
	
	@ManyToOne
	@JoinColumn(name = "task_id", referencedColumnName = "id")
	private TaskEntity task;
	
	public ItemEntity(long id, String description, String title, Timestamp duedate, String repeatType, boolean complete,
			TaskEntity task) {
		super();
		this.id = id;
		this.description = description;
		this.title = title;
		this.duedate = duedate;
		this.repeatType = repeatType;
		this.complete = complete;
		this.task = task;
	}
	
	public TaskEntity getTask() {
		return task;
	}
	public void setTask(TaskEntity task) {
		this.task = task;
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
	
	
	
	
	
}
