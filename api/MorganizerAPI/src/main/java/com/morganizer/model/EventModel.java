package com.morganizer.model;

import java.util.List;

public class EventModel {
	
	private String name;
	private String startDate;
	private String endDate;
	private String startTime;
	private String endTime;
	private String description;
	private String type;
	private String location;
	List<String> participantList;
	
	
		
	
	public EventModel(String name, String startDate, String endDate, String startTime, String endTime,
			String description, String type, String location, List<String> participantList) {
		super();
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.startTime = startTime;
		this.endTime = endTime;
		this.description = description;
		this.type = type;
		this.location = location;
		this.participantList = participantList;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public List<String> getParticipantList() {
		return participantList;
	}
	public void setParticipantList(List<String> participantList) {
		this.participantList = participantList;
	}
	
	
	
	

}
