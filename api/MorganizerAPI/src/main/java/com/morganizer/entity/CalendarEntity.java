package com.morganizer.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name="calendar")
public class CalendarEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long calendarId;

    private String name;
    private String color;  
    private boolean selected;
    

    @ManyToOne
    @JoinColumn(name="user_id",referencedColumnName = "user_id")
    private UserDetailsEntity user;

    
    public CalendarEntity() {
    	
    }

	public CalendarEntity(String name, String color, boolean selected, UserDetailsEntity user) {
		super();
		this.name = name;
		this.color = color;
		this.selected = selected;
		this.user = user;
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


	public UserDetailsEntity getUser() {
		return user;
	}


	public void setUser(UserDetailsEntity user) {
		this.user = user;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}
     
    
}
