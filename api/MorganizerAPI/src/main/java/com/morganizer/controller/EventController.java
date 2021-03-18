package com.morganizer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.morganizer.dto.EventRequest;
import com.morganizer.entity.NotificationTypesEntity;
import com.morganizer.entity.RecurringModeEntity;
import com.morganizer.service.EventService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/event")
public class EventController {
    @Autowired
    EventService eventService;
	@DeleteMapping("/remove/{eventId}")
    public void deleteEvent(@PathVariable Long eventId) {
		eventService.deleteEvent(eventId);
    }

	@GetMapping("/notification/types")
    public List<NotificationTypesEntity> getNotificationType() {
        return eventService.getNotificationType();
    }

    @GetMapping("/recurring/modes")
    public List<RecurringModeEntity> getRecurringModes() {
        return eventService.getRecurringModes();
    }

    @GetMapping("/fetchAll/{userId}")
    public List<EventRequest> fetchAllEvents(@PathVariable Long userId){
	    return eventService.fetchAllEvents(userId);
    }

//    @GetMapping("/fetchEventCategories")
//    public List<EventCategoriesEntity> fetchEventCategories() {
//        return eventService.fetchEventCategories();
//    }

    @PostMapping("/add")
    public EventRequest addEvent(@RequestBody EventRequest eventRequest) {
    	return eventService.addEvent(eventRequest);
    }
    
    @PostMapping("/update")
    public EventRequest updateEvent(@RequestBody EventRequest eventRequest) {
    	return eventService.updateEvent(eventRequest);
    }
    
}
