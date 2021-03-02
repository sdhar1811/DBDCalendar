package com.morganizer.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.dto.TaskRequest;
import com.morganizer.dto.TaskResponse;
import com.morganizer.entity.TaskEntity;
import com.morganizer.entity.UserDetailsEntity;
import com.morganizer.repository.TaskRepository;
import com.morganizer.repository.UserDetailsRepository;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository taskRepo;
	
	@Autowired
	private UserDetailsRepository userDetailsRepo;

	public List<TaskResponse> fetchAllTasks(long userId) {
		List<TaskEntity> tasks =taskRepo.findByUserId(userId);
		List<TaskResponse> taskList = new ArrayList<>();
		for(TaskEntity taskEntity:tasks) {
			taskList.add(new TaskResponse(taskEntity.getId(), taskEntity.getTitle()));
		}
		return taskList;
	}

	public TaskResponse createTask(TaskRequest task) {
		// TODO Auto-generated method stub
		UserDetailsEntity userDetails = userDetailsRepo.getOne(task.getUserId());
		TaskEntity taskEntity = taskRepo.save(new TaskEntity(task.getTitle(), userDetails));
		return new TaskResponse(taskEntity.getId(), taskEntity.getTitle());
		
	}

}
