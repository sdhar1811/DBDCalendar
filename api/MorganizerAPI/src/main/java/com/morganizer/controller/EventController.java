package com.morganizer.controller;

import com.morganizer.entity.RecurringOptionsEntity;
import com.morganizer.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping("/fetchAll/{recurringOptionsId}")
    public List<RecurringOptionsEntity> getRecurringOptions() {
        return eventService.getRecurringOptions();
    }
}
