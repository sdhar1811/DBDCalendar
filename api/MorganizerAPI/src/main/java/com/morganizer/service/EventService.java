package com.morganizer.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.dto.EventRequest;
import com.morganizer.entity.CalendarEntity;
import com.morganizer.dto.EventResponse;
import com.morganizer.dto.ProfileRequest;
import com.morganizer.dto.ProfileResponse;
//import com.morganizer.entity.EventCategoriesEntity;
import com.morganizer.entity.EventDetailsEntity;
import com.morganizer.entity.EventReminderEntity;
import com.morganizer.entity.NotificationTypesEntity;
import com.morganizer.entity.ProfileEntity;
import com.morganizer.entity.RecurringModeEntity;
import com.morganizer.entity.UserDetailsEntity;
import com.morganizer.repository.CalendarRepository;
import com.morganizer.repository.EventDetailsRepository;
import com.morganizer.repository.EventReminderRepository;
import com.morganizer.repository.NotificationTypeRepository;
import com.morganizer.repository.ProfileRepository;
import com.morganizer.repository.RecurringModeRepository;
import com.morganizer.repository.UserDetailsRepository;
import com.morganizer.utils.ModelMapperUtil;

@Service
public class EventService {

	@Autowired
	UserDetailsRepository userRepo;
	@Autowired
	public EventDetailsRepository eventDetailsRepository;

	@Autowired
	public NotificationTypeRepository notificationTypeRepository;

	@Autowired
	public RecurringModeRepository recurringModeRepository;
	
	@Autowired
	public ProfileRepository profileRepository;
	
	@Autowired
	public EventReminderRepository eventReminderRepository;
	
	@Autowired
	public CalendarRepository calendarRepository;


	public void deleteEvent(Long eventId) {

		try {
			eventDetailsRepository.deleteById(eventId);
		} catch (Exception ex) {
			ex.printStackTrace();
			// throw custom exception for no such event present to be deleted
		}
	}

	public List<NotificationTypesEntity> getNotificationType() {
		return notificationTypeRepository.findAll();
	}

	public List<RecurringModeEntity> getRecurringModes() {
		return recurringModeRepository.findAll();
	}

	public List<EventRequest> fetchAllEvents(Long userId) {
		
		List<EventDetailsEntity> eventList = eventDetailsRepository.findByUserId(userId);
		List<EventRequest> response =  new ArrayList<>();
		
		for(EventDetailsEntity event:eventList) {			
			List<Long> reminderLst = new ArrayList<>();
			List<ProfileResponse> profileList = ModelMapperUtil.mapList(event.getAssigneeList(), ProfileResponse.class);			
			for (EventReminderEntity reminder: event.getReminderList()) {
				reminderLst.add(reminder.getReminderId());
			}
			response.add(new EventRequest(event.getUser().getId(), event.getId(), event.getEventTitle(), null,
					event.getStartTime().toString(), event.getEndTime().toString(), event.getLocation(),
					event.getEventDescription(), null, event.getRecurringMode().getId(),
					profileList, event.getLastUpdatedOn().toString(), event.getColor(), reminderLst,event.getCalendar().getCalendarId(),event.isAllDayEvent()));
		}
		
		return response;
	}

	public EventRequest saveEvent(EventRequest eventRequest) {
		UserDetailsEntity user = userRepo.getOne(eventRequest.getUserId());
		RecurringModeEntity recurringMode = recurringModeRepository.getOne(eventRequest.getRecurringModeId());
		List<ProfileEntity> assigneeList = new ArrayList<>();
		CalendarEntity calendar = calendarRepository.getOne(eventRequest.getCalendarId());
		for (ProfileResponse assignee: eventRequest.getAssigneeList()) {
			assigneeList.add(profileRepository.getOne(assignee.getProfileId()));
		}
		List<EventReminderEntity> reminderList = new ArrayList<>();
		for (Long reminder: eventRequest.getReminderList()) {
			reminderList.add(eventReminderRepository.getOne(reminder));
		}
		  
		Timestamp startTime = Timestamp.valueOf(eventRequest.getStartTime().replaceAll("[A-Z]", " " )); 
	    Timestamp endTime = Timestamp.valueOf(eventRequest.getEndTime().replaceAll("[A-Z]", " " ));
	    Timestamp lastUpdatedOn = new Timestamp(System.currentTimeMillis());
	    	    
		EventDetailsEntity event = new EventDetailsEntity(user, eventRequest.getTitle(), eventRequest.getDescription(),
				startTime, endTime,
				recurringMode, eventRequest.getLocation(),
				assigneeList,  lastUpdatedOn, eventRequest.getColor(),reminderList, calendar,
				eventRequest.isAllDayEvent());

		if (eventRequest.getEventId() != 0) {
			event.setId(eventRequest.getEventId());
		}
		EventDetailsEntity savedEntity = eventDetailsRepository.save(event);
		List<ProfileResponse> profileList =null;// ModelMapperUtil.mapList(event.getAssigneeList(), ProfileResponse.class);	
		List<Long> reminders = new ArrayList<>();
		for (EventReminderEntity reminder: savedEntity.getReminderList()) {
			reminders.add(reminder.getReminderId());
		}
		return new EventRequest(savedEntity.getUser().getId(), savedEntity.getId(), savedEntity.getEventTitle(), null,
				savedEntity.getStartTime().toString(), savedEntity.getEndTime().toString(), savedEntity.getLocation(),
				savedEntity.getEventDescription(), null, savedEntity.getRecurringMode().getId(),
				profileList, savedEntity.getLastUpdatedOn().toString(), savedEntity.getColor(), reminders,
				event.getCalendar().getCalendarId(),
				event.isAllDayEvent());
	}

}
