package com.morganizer.dto;

public class CalendarResponse {
	private long calendarId;
    private String name;
    private String color;  
    private long userId;
    private boolean selected;
    
    public CalendarResponse(long calendarId, String name, String color, long userId, boolean selected) {
		super();
		this.calendarId = calendarId;
		this.name = name;
		this.color = color;
		this.userId = userId;
		this.selected = selected;
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
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
    
    

}
