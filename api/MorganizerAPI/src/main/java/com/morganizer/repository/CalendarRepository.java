package com.morganizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.CalendarEntity;

public interface CalendarRepository extends JpaRepository<CalendarEntity, Long>{
	List<CalendarEntity> findByUserId(Long userId);
}
