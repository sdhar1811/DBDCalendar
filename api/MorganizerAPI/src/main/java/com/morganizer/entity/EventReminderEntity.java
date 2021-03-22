package com.morganizer.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "event_reminder")
public class EventReminderEntity {

	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long reminderId;
	private String reminderTitle;
	private int reminderTime;
	private String reminderType;
	
	public EventReminderEntity() {
		
	}
	public EventReminderEntity(String reminderTitle, int reminderTime, String reminderType) {
		super();
		this.reminderTitle = reminderTitle;
		this.reminderTime = reminderTime;
		this.reminderType = reminderType;
	}

	public long getReminderId() {
		return reminderId;
	}

	public void setReminderId(long reminderId) {
		this.reminderId = reminderId;
	}

	public String getReminderTitle() {
		return reminderTitle;
	}

	public void setReminderTitle(String reminderTitle) {
		this.reminderTitle = reminderTitle;
	}

	public int getReminderTime() {
		return reminderTime;
	}

	public void setReminderTime(int reminderTime) {
		this.reminderTime = reminderTime;
	}

	public String getReminderType() {
		return reminderType;
	}

	public void setReminderType(String reminderType) {
		this.reminderType = reminderType;
	}
	
	
}
