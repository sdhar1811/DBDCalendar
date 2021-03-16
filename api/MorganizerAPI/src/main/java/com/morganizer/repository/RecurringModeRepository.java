package com.morganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.RecurringModeEntity;

public interface RecurringModeRepository extends JpaRepository<RecurringModeEntity, Long>{
	

}
