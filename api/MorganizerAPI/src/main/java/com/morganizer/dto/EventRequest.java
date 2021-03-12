package com.morganizer.dto;

public class EventRequest {

	private long userId;
	private long eventId;
	private String title;
	private String category;
	private String startTime;
	private String endTime;
	private String location;
	private String description;
	private String reminder;
	private String notificationType;
	private long recurringModeId;
	private String[] participant;
	private String lastUpdateOn;
	private String color;

	
	public EventRequest() {
		
	}
	public EventRequest(long userId, long eventId) {
		this.userId = userId;
		this.eventId = eventId;
	}

	public EventRequest(long userId, long eventId, String title, String category, String startTime, String endTime,
			String location, String description, String reminder, String notificationType, long recurringMode,
			String[] participant, String lastUpdateOn, String color) {
		super();
		this.userId = userId;
		this.eventId = eventId;
		this.title = title;
		this.category = category;
		this.startTime = startTime;
		this.endTime = endTime;
		this.location = location;
		this.description = description;
		this.reminder = reminder;
		this.notificationType = notificationType;
		this.recurringModeId = recurringMode;
		this.participant = participant;
		this.lastUpdateOn = lastUpdateOn;
		this.color = color;
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

	public String getReminder() {
		return reminder;
	}

	public void setReminder(String reminder) {
		this.reminder = reminder;
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

	public String[] getParticipant() {
		return participant;
	}

	public void setParticipant(String[] participant) {
		this.participant = participant;
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
	
	

}
