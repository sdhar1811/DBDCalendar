package com.morganizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.EventDetailsEntity;

public interface EventDetailsRepository extends JpaRepository<EventDetailsEntity, Long>{
	
	void deleteByIdAndUserId(Long eventId,Long userId);
    
	List<EventDetailsEntity> findByUserId(Long userId);
	void deleteByCalendar_calendarId(Long calendarId);
	
	List<EventDetailsEntity> findByAssigneeList_profileId(Long assigneeId);
	
	
}
