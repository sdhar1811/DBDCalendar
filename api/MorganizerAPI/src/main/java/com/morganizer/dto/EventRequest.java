package com.morganizer.dto;

import java.util.List;

public class EventRequest {

	private long userId;
	private long eventId;
	private String title;
	private String category;
	private String startTime;
	private String endTime;
	private String location;
	private String description;
	private String notificationType;
	private long recurringModeId;
	private List<ProfileResponse> assigneeList;
	private String lastUpdateOn;
	private String color;
	private List<Long> reminderList;
	private Long calendarId;
	private boolean allDayEvent;
	
	public EventRequest() {
		
	}
	public EventRequest(long userId, long eventId) {
		this.userId = userId;
		this.eventId = eventId;
	}
	
	public EventRequest(long userId, long eventId, String title, String category, String startTime, String endTime,
			String location, String description, String notificationType, long recurringModeId, List<ProfileResponse> assigneeList,
			String lastUpdateOn, String color, List<Long> reminderList,long calendarId, boolean allDayEvent) {
		super();
		this.userId = userId;
		this.eventId = eventId;
		this.title = title;
		this.category = category;
		this.startTime = startTime;
		this.endTime = endTime;
		this.location = location;
		this.description = description;
		this.notificationType = notificationType;
		this.recurringModeId = recurringModeId;
		this.assigneeList = assigneeList;
		this.lastUpdateOn = lastUpdateOn;
		this.color = color;
		this.reminderList = reminderList;
		this.calendarId = calendarId;
		this.allDayEvent = allDayEvent;
	}
		
	public long getRecurringModeId() {
		return recurringModeId == 0 ? 1 : recurringModeId;
	}

	public void setRecurringModeId(long recurringModeId) {
		this.recurringModeId = recurringModeId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Long> getReminderList() {
		return reminderList;
	}
	
	public void setReminderList(List<Long> reminderList) {
		this.reminderList = reminderList;
	}
	
	public String getNotificationType() {
		return notificationType;
	}

	public void setNotificationType(String notificationType) {
		this.notificationType = notificationType;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getEventId() {
		return eventId;
	}

	public void setEventId(long eventId) {
		this.eventId = eventId;
	}

	
	public List<ProfileResponse> getAssigneeList() {
		return assigneeList;
	}
	public void setAssigneeList(List<ProfileResponse> assigneeList) {
		this.assigneeList = assigneeList;
	}

	public String getLastUpdateOn() {
		return lastUpdateOn;
	}

	public void setLastUpdateOn(String lastUpdateOn) {
		this.lastUpdateOn = lastUpdateOn;
	}
	
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	
	public long getCalendarId() {
		return calendarId;
	}
	public void setCalendarId(Long calendarId) {
		this.calendarId = calendarId;
	}
	public boolean isAllDayEvent() {
		return allDayEvent;
	}
	public void setAllDayEvent(boolean allDayEvent) {
		this.allDayEvent = allDayEvent;
	}
	
	
}
