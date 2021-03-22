package com.morganizer.dto;

public class CalendarResponse {
	private long calendarId;
    private String name;
    private String color;  
    private long userId;
    
    public CalendarResponse(long calendarId, String name, String color, long userId) {
		super();
		this.calendarId = calendarId;
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
