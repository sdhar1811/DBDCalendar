package com.morganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.EventDetailsEntity;

public interface EventDetailsRepository extends JpaRepository<EventDetailsEntity,Long>{

}
