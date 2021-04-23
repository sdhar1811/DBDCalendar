package com.morganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.EventCategoriesEntity;


public interface EventCategoriesRepository extends JpaRepository<EventCategoriesEntity, Long> {

}
