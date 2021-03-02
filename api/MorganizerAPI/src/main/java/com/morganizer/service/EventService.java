package com.morganizer.service;

import com.morganizer.entity.RecurringOptionsEntity;
import com.morganizer.repository.RecurringOptionsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class EventService {

    @Autowired
    public RecurringOptionsRepository recurringOptionsRepository;

    public List<RecurringOptionsEntity> getRecurringOptions(){
        return recurringOptionsRepository.findAll();
    }
}
