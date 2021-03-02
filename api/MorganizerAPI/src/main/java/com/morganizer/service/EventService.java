package com.morganizer.service;

import com.morganizer.entity.NotificationTypesEntity;
import com.morganizer.repository.NotificationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class EventService {

    @Autowired
    public NotificationTypeRepository notificationTypeRepository;

    public List<NotificationTypesEntity> getNotificationType(){
        return notificationTypeRepository.findAll();
    }

}
