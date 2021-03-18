package com.morganizer.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name="todo_tasks")
public class TaskEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	private Long id;
	private String description;
	private String title;
	private Timestamp duedate;
	private String repeatType;
	private boolean complete;
	private int[] assigneeId;
	private boolean allDay;
	private String recurringOption;
	
	@ManyToOne
	@JoinColumn(name = "todo_list_id")
	private TodoListEntity todoListEntity;
	
	
	public TaskEntity() {
		
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

	
	public TaskEntity(Long id, String description, String title, Timestamp duedate, String repeatType, boolean complete,
			boolean allDay, String recurringOption, TodoListEntity todoListEntity) {
		super();
		this.id = id;
		this.description = description;
		this.title = title;
		this.duedate = duedate;
		this.repeatType = repeatType;
		this.complete = complete;
		this.allDay = allDay;
		this.recurringOption = recurringOption;
		this.todoListEntity = todoListEntity;
	}


	public TodoListEntity getTask() {
		return todoListEntity;
	}
	public void setTask(TodoListEntity todoListEntity) {
		this.todoListEntity = todoListEntity;
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


	public int[] getAssigneeId() {
		return assigneeId;
	}


	public void setAssigneeId(int[] assigneeId) {
		this.assigneeId = assigneeId;
	}


	public TodoListEntity getTodoListEntity() {
		return todoListEntity;
	}


	public void setTodoListEntity(TodoListEntity todoListEntity) {
		this.todoListEntity = todoListEntity;
	}
	
	
	
	
	
	
	
}
