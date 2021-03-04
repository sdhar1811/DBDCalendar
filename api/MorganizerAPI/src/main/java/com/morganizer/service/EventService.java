package com.morganizer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.dto.EventDetailsRequest;
import com.morganizer.entity.EventCategoriesEntity;
import com.morganizer.entity.EventDetailsEntity;
import com.morganizer.entity.NotificationTypesEntity;
import com.morganizer.entity.RecurringOptionsEntity;
import com.morganizer.repository.EventCategoriesRepository;
import com.morganizer.repository.EventDetailsRepository;
import com.morganizer.repository.NotificationTypeRepository;
import com.morganizer.repository.RecurringOptionsRepository;

@Service
public class EventService {

    @Autowired
    public EventDetailsRepository eventDetailsRepository;

    @Autowired
    public NotificationTypeRepository notificationTypeRepository;

    @Autowired
    public RecurringModeRepository recurringModeRepository;

    @Autowired
    public EventCategoriesRepository eventCategoriesRepository;

    public void deleteEvent(EventDetailsRequest eventDetailsReq) {

        try {
            eventDetailsRepository.deleteByIdAndUserId(eventDetailsReq.getEventId(), eventDetailsReq.getUserId());
        } catch (Exception ex) {
            // throw custom exception for no such event present to be deleted
        }
    }

    public List<NotificationTypesEntity> getNotificationType() {
        return notificationTypeRepository.findAll();
    }

    public List<RecurringModeEntity> getRecurringModes() {
        return recurringModeRepository.findAll();
    }

    public List<EventDetailsEntity> fetchAllEvents(Long userId) {
        return eventDetailsRepository.findByUserId(userId);
    }

    public List<EventCategoriesEntity> fetchEventCategories() {
        return eventCategoriesRepository.findAll();
    }

}
