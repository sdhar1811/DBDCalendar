package com.morganizer.controller;

import com.morganizer.entity.NotificationTypesEntity;
import com.morganizer.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class EventController {
    @Autowired
    EventService eventService;

    @GetMapping("/fetchAll/{notificationTypeId}")
    public List<NotificationTypesEntity> getNotificationType() {
        return eventService.getNotificationType();
    }
}
