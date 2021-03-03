package com.morganizer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.dto.EventDetailsRequest;
import com.morganizer.repository.EventDetailsRepository;

@Service
public class EventService {
	
	@Autowired
	public EventDetailsRepository eventDetailsRepository;
	
	public void deleteEvent(EventDetailsRequest eventDetailsReq) {

        try {
            eventDetailsRepository.deleteByEventIdAndUserId(eventDetailsReq.getEventId(),eventDetailsReq.getUserId());
        }
        catch (Exception ex){
            //throw custom exception for no such event present to be deleted
        }

    }
}
