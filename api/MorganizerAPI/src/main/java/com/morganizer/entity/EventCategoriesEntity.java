package com.morganizer.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="event_categories")
public class EventCategoriesEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String event_category;
	
	public EventCategoriesEntity(long id, String event_category) {
		super();
		this.id = id;
		this.event_category = event_category;
	}
	public String getEvent_category() {
		return event_category;
	}
	public void setEvent_category(String event_category) {
		this.event_category = event_category;
	}
}