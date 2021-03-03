package com.morganizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.morganizer.dto.EventDetailsRequest;
import com.morganizer.service.EventService;
import com.morganizer.entity.NotificationTypesEntity;
import org.springframework.web.bind.annotation.GetMapping;
import com.morganizer.entity.RecurringOptionsEntity;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/event")
public class EventController {
    @Autowired
    EventService eventService;
	
	@DeleteMapping("/deleteEvent")
    public void deleteEvent(@RequestBody EventDetailsRequest eventDetailsRequest) {
        eventService.deleteEvent(eventDetailsRequest);
    }
	
    @GetMapping("/fetchAll/{notificationTypeId}")
    public List<NotificationTypesEntity> getNotificationType() {
        return eventService.getNotificationType();
    }

    @GetMapping("/fetchAll/{recurringOptionsId}")
    public List<RecurringOptionsEntity> getRecurringOptions() {
        return eventService.getRecurringOptions();
    }
}
