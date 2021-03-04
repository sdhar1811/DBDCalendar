package com.morganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.TaskListItemsEntity;

public interface TaskListItemsRepository extends JpaRepository<TaskListItemsEntity, Long>{
	
	void deleteById(Long itemId);

}
