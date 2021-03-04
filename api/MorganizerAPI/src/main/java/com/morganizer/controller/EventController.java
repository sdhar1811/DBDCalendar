package com.morganizer.controller;

<<<<<<< HEAD
import java.util.List;

=======
>>>>>>> 8bfe0bb (Task#57 event controller modified:)
import com.morganizer.entity.EventCategoriesEntity;
import com.morganizer.entity.EventDetailsEntity;
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
import com.morganizer.entity.EventDetailsEntity;
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
    public List<EventDetailsEntity> fetchAllEvents(Long userId) {
        return eventService.fetchAllEvents(userId);
    }

    @PostMapping("/add")
    public EventRequest addEvent(@RequestBody EventRequest eventRequest) {
    	return eventService.addEvent(eventRequest);
    }
    
    @PostMapping("/update")
    public EventRequest updateEvent(@RequestBody EventRequest eventRequest) {
    	return eventService.updateEvent(eventRequest);
    }
    
    @GetMapping("/fetchEventCategories")
    public List<EventCategoriesEntity> fetchEventCategories(){
	    return eventService.fetchEventCategories();
    }
}
