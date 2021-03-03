package com.morganizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.EventDetailsEntity;

public interface EventDetailsRepository extends JpaRepository<EventDetailsEntity, Long>{
	
	void deleteByEventIdAndUserId(Long eventId,Long userId);
    
	List<EventDetailsEntity> findByUserId(Long userId);
}
