package com.morganizer.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class RecurringOptionsEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long recurringOptionsId;

    private String recurringOptionsName;
}
