package com.morganizer.dto;

public class EventDetailsRequest {

	private long userId;
    private long eventId;
	
    public EventDetailsRequest(long userId, long eventId) {
		this.userId = userId;
		this.eventId = eventId;
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
    
    
    
}
