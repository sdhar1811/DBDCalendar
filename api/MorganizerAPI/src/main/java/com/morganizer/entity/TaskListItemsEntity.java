package com.morganizer.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name="todo_items")
public class TaskListItemsEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private long itemId;
	
	@ManyToOne
	@JoinColumn(name="category_id",referencedColumnName="id")
	private EventCategoriesEntity eventCategory;
	//TODO: Add reference to calendar ID from calendar table
	private int calendarId;
	private String title;
	private String itemDesc;
	private Timestamp dueDate;
	private String url;
	private String repeatType;
	private Boolean complete;
	private int[] assigneeId;
	
	@JoinColumn(name="list_id",referencedColumnName="id")
	private TaskEntity task;

	public TaskListItemsEntity(int itemId, EventCategoriesEntity eventCategory, int calendarId, String title,
			String itemDesc, Timestamp dueDate, String url, String repeatType, Boolean complete, int[] assigneeId,
			TaskEntity task) {
		super();
		this.itemId = itemId;
		this.eventCategory = eventCategory;
		this.calendarId = calendarId;
		this.title = title;
		this.itemDesc = itemDesc;
		this.dueDate = dueDate;
		this.url = url;
		this.repeatType = repeatType;
		this.complete = complete;
		this.assigneeId = assigneeId;
		this.task = task;
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public EventCategoriesEntity getEventCategory() {
		return eventCategory;
	}

	public void setEventCategory(EventCategoriesEntity eventCategory) {
		this.eventCategory = eventCategory;
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

	public TaskEntity getTask() {
		return task;
	}

	public void setTask(TaskEntity task) {
		this.task = task;
	}	

}
