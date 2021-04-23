package com.morganizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.morganizer.entity.TaskEntity;
import com.morganizer.entity.TodoListEntity;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
	
	List<TaskEntity> findByTodoListEntity(TodoListEntity todoListEntity);
}
