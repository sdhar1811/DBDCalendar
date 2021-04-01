package com.morganizer.dto;


public class TaskRequest {
	private Long id;
	private String description;
	private String title;	
	private String dueDate;
	private String repeatType;
	private boolean complete;
	private long todoListId;



	private long calendarId;




	public TaskRequest(Long id, String description, String title, String dueDate, String repeatType,
			boolean complete, long todoListId) {
		super();
		this.id = id;
		this.description = description;
		this.title = title;
		this.dueDate = dueDate;
		this.repeatType = repeatType;
		this.complete = complete;
		this.todoListId = todoListId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
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
	public String getDuedate() {
		return dueDate;
	}
	public void setDuedate(String duedate) {
		this.dueDate = duedate;
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
	public Long getTodoListId() {
		return todoListId;
	}
	public void setTodoListId(Long todoListId) {
		this.todoListId = todoListId;
	}

	public long getCalendarId() {
		return calendarId;
	}

	public void setCalendarId(long calendarId) {
		this.calendarId = calendarId;
	}
	@Override
	public String toString() {
		return "TaskRequest [id=" + id + ", description=" + description + ", title=" + title + ", duedate=" + dueDate
				+ ", repeatType=" + repeatType + ", complete=" + complete + ", todoListId=" + todoListId + "]";
	}
	
	
	
	

}
