package com.morganizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.morganizer.entity.TodoListEntity;

@Repository
public interface TodoListRepository extends JpaRepository<TodoListEntity, Long> {
	
	List<TodoListEntity> findByUserId(long userId);

}
