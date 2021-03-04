package com.morganizer.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.morganizer.dto.TaskItemRequest;
import com.morganizer.dto.TaskRequest;
import com.morganizer.dto.TodoListRequest;
import com.morganizer.dto.TodoListResponse;
import com.morganizer.service.TodoListService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/todoList")
public class TodoListController {
	
	@Autowired
	TodoListService taskService;

	@GetMapping("/all/{userId}")
	public List<TodoListResponse> fetchAllTasks(@PathVariable long userId){
		return taskService.fetchAllTasks(userId);
	}
	
	@PostMapping("/create")
	public TodoListResponse createTodoList(@RequestBody TodoListRequest task){
		return taskService.createTodoList(task);
	}

	@PostMapping("/update")
	public void updateStatus(Long itemId, boolean itemStatus){
		taskService.updateStatus(itemId,itemStatus);
	}
	@PostMapping(path="/add/tasks",consumes = MediaType.APPLICATION_JSON_VALUE)
	public void addTasks(@RequestBody List<TaskRequest> taskRequest) {
		taskService.addTasks(taskRequest);
	}

	@PostMapping("/addItem")
	public void createItem(@RequestBody TaskItemRequest taskItem){
		taskService.addItem(taskItem);
	}
}
