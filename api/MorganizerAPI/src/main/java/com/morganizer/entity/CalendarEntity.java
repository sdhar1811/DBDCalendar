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
    

    @ManyToOne
    @JoinColumn(name="user_id",referencedColumnName = "user_id")
    private UserDetailsEntity user;

    
    public CalendarEntity() {
    	
    }

	public CalendarEntity(long calendarId, String name, String color, UserDetailsEntity user) {
		super();
		this.calendarId = calendarId;
		this.name = name;
		this.color = color;
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
     
    
}
