package com.morganizer.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.dto.EventRequest;
import com.morganizer.entity.EventCategoriesEntity;
import com.morganizer.entity.EventDetailsEntity;
import com.morganizer.entity.NotificationTypesEntity;
import com.morganizer.entity.RecurringModeEntity;
import com.morganizer.entity.UserDetailsEntity;
import com.morganizer.repository.EventCategoriesRepository;
import com.morganizer.repository.EventDetailsRepository;
import com.morganizer.repository.NotificationTypeRepository;
import com.morganizer.repository.RecurringModeRepository;
import com.morganizer.repository.UserDetailsRepository;
import com.morganizer.utils.DateTimeUtil;
import com.morganizer.entity.EventCategoriesEntity;
import com.morganizer.repository.EventCategoriesRepository;

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
    public EventCategoriesRepository eventCategoriesRepository;

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
			response.add(new EventRequest(event.getUser().getId(), event.getId(), event.getEventTitle(), null,
					event.getStartTime().toString(), event.getEndTime().toString(), event.getLocation(),
					event.getEventDescription(), null, null, event.getRecurringMode().getId(),
					event.getParticipant(), event.getLastUpdatedOn().toString(), event.getColor()));
		}
		
		return response;
	}

	public EventRequest addEvent(EventRequest eventRequest) {
		UserDetailsEntity user = userRepo.getOne(eventRequest.getUserId());
		RecurringModeEntity recurringMode = recurringModeRepository.getOne(eventRequest.getRecurringModeId());
		
		  
		Timestamp startTime = Timestamp.valueOf(eventRequest.getStartTime().replaceAll("[A-Z]", " " )); 
	    Timestamp endTime = Timestamp.valueOf(eventRequest.getEndTime().replaceAll("[A-Z]", " " ));
	    Timestamp lastUpdatedOn = new Timestamp(System.currentTimeMillis());
	    	    
		EventDetailsEntity event = new EventDetailsEntity(user, eventRequest.getTitle(), eventRequest.getDescription(),
				startTime, endTime,
				recurringMode, eventRequest.getLocation(),
				eventRequest.getParticipant(),  lastUpdatedOn, eventRequest.getColor());

		if (eventRequest.getEventId() != 0) {
			event.setId(eventRequest.getEventId());
		}
		EventDetailsEntity savedEntity = eventDetailsRepository.save(event);

		return new EventRequest(savedEntity.getUser().getId(), savedEntity.getId(), savedEntity.getEventTitle(), null,
				savedEntity.getStartTime().toString(), savedEntity.getEndTime().toString(), savedEntity.getLocation(),
				savedEntity.getEventDescription(), null, null, savedEntity.getRecurringMode().getId(),
				savedEntity.getParticipant(), savedEntity.getLastUpdatedOn().toString(), savedEntity.getColor());

	}

	public EventRequest updateEvent(EventRequest eventRequest) {
		UserDetailsEntity user = userRepo.getOne(eventRequest.getUserId());
		RecurringModeEntity recurringMode = recurringModeRepository.getOne(eventRequest.getRecurringModeId());
		
		  
		Timestamp startTime = Timestamp.valueOf(eventRequest.getStartTime().replaceAll("[A-Z]", " " )); 
	    Timestamp endTime = Timestamp.valueOf(eventRequest.getEndTime().replaceAll("[A-Z]", " " ));
	    Timestamp lastUpdatedOn = new Timestamp(System.currentTimeMillis());
	    	    
		EventDetailsEntity event = new EventDetailsEntity(user, eventRequest.getTitle(), eventRequest.getDescription(),
				startTime, endTime,
				recurringMode, eventRequest.getLocation(),
				eventRequest.getParticipant(),  lastUpdatedOn, eventRequest.getColor());

		if (eventRequest.getEventId() != 0) {
			event.setId(eventRequest.getEventId());
		}
		EventDetailsEntity savedEntity = eventDetailsRepository.save(event);

		return new EventRequest(savedEntity.getUser().getId(), savedEntity.getId(), savedEntity.getEventTitle(), null,
				savedEntity.getStartTime().toString(), savedEntity.getEndTime().toString(), savedEntity.getLocation(),
				savedEntity.getEventDescription(), null, null, savedEntity.getRecurringMode().getId(),
				savedEntity.getParticipant(), savedEntity.getLastUpdatedOn().toString(), savedEntity.getColor());

	}

	public List<EventCategoriesEntity> fetchEventCategories() {
        return eventCategoriesRepository.findAll();
    }
}
