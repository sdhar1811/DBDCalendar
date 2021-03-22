package com.morganizer.dto;

public class CalendarRequest {
	private long calendarId;
    private String name;
    private String color;  
    private long userId;
    
    public CalendarRequest() {}
    
    public CalendarRequest(long userId, long calendarId) {
        this.userId = userId;
        this.calendarId = calendarId;
    }
    
    public CalendarRequest(String name, String color, long userId) {
		this.name = name;
		this.color = color;
		this.userId = userId;
	}
    
	public long getCalendarId() {
		return calendarId;
	}
	public void setCalendarId(long calendarId) {
		this.calendarId = calendarId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
    
    

}
