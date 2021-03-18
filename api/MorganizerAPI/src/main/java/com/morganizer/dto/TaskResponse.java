package com.morganizer.dto;


public class TaskResponse {
	private Long id;
	private String title;
	private String description;	
	private boolean complete;	
	private String dueDate;	
	private long todoListId;
	private boolean allDay;
	private String recurringOption;
	
	

	
	public TaskResponse(Long id, String title, String description, boolean complete, String dueDate, long todoListId,
			boolean allDay, String recurringOption) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.complete = complete;
		this.dueDate = dueDate;
		this.todoListId = todoListId;
		this.allDay = allDay;
		this.recurringOption = recurringOption;
	}


	public boolean isAllDay() {
		return allDay;
	}


	public void setAllDay(boolean allDay) {
		this.allDay = allDay;
	}


	public String getRecurringOption() {
		return recurringOption;
	}


	public void setRecurringOption(String recurringOption) {
		this.recurringOption = recurringOption;
	}


	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isComplete() {
		return complete;
	}
	public void setComplete(boolean complete) {
		this.complete = complete;
	}	
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}	
	public long getTodoListId() {
		return todoListId;
	}
	public void setTodoListId(long todoListId) {
		this.todoListId = todoListId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	

}
