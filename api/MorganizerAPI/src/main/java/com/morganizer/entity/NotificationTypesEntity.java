package com.morganizer.entity;
import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

public class NotificationTypesEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long notificationTypeId;

    private String notificationName;

}
