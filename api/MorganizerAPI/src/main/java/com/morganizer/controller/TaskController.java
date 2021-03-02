package com.morganizer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.morganizer.dto.TaskRequest;
import com.morganizer.dto.TaskResponse;
import com.morganizer.service.TaskService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tasks")
public class TaskController {
	
	@Autowired
	TaskService taskService;
	

	@GetMapping("/all/{userId}")
	public List<TaskResponse> fetchAllTasks(@PathVariable long userId){
		return taskService.fetchAllTasks(userId);
	}
	
	@PostMapping("/createTask")
	public TaskResponse createTasks(@RequestBody TaskRequest task){
		return taskService.createTask(task);
	}
	

}
