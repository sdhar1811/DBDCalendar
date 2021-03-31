package com.morganizer.service;

import java.util.ArrayList;
import java.util.List;

import com.morganizer.entity.CalendarEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.dto.TaskRequest;
import com.morganizer.dto.TaskResponse;
import com.morganizer.dto.TodoListRequest;
import com.morganizer.dto.TodoListResponse;
import com.morganizer.entity.TaskEntity;
import com.morganizer.entity.TodoListEntity;
import com.morganizer.entity.UserDetailsEntity;
import com.morganizer.repository.TaskRepository;
import com.morganizer.repository.TodoListRepository;
import com.morganizer.repository.UserDetailsRepository;
import com.morganizer.utils.DateTimeUtil;

@Service
public class TodoListService {

	@Autowired
	private TodoListRepository todoListRepo;

	@Autowired
	private TaskRepository taskRepo;

	@Autowired
	private UserDetailsRepository userDetailsRepo;

	public List<TodoListResponse> fetchAllTasks(long userId) {
		List<TodoListEntity> todoList = todoListRepo.findByUserId(userId);
		List<TodoListResponse> todoListResponse = new ArrayList<>();
		for (TodoListEntity todoListEntity : todoList) {
			List<TaskEntity> tasks = taskRepo.findByTodoListEntity(todoListEntity);
			todoListResponse.add(new TodoListResponse(todoListEntity.getId(), todoListEntity.getTitle(),
					convertTaskEntityToResponse(tasks)));
		}

		return todoListResponse;
	}

	public List<TaskResponse> convertTaskEntityToResponse(List<TaskEntity> taskEntityList) {
		List<TaskResponse> taskResponseList = new ArrayList<>();
		for (TaskEntity taskEntity : taskEntityList) {
			String endDate = taskEntity.getDuedate() == null ? null : taskEntity.getDuedate().toString();
			taskResponseList
					.add(new TaskResponse(taskEntity.getId(), taskEntity.getTitle(), taskEntity.getDescription(),
							taskEntity.isComplete(), endDate, taskEntity.getTodoListEntity().getId()));
		}
		return taskResponseList;

	}

	public TodoListResponse createTodoList(TodoListRequest task) {

		UserDetailsEntity userDetails = userDetailsRepo.getOne(task.getUserId());
		TodoListEntity taskEntity = todoListRepo.save(new TodoListEntity(task.getTitle(), userDetails));
		return new TodoListResponse(taskEntity.getId(), taskEntity.getTitle());

	}

	public void updateStatus(Long itemId, boolean itemStatus) {

		TaskEntity itemEntity = taskRepo.getOne(itemId);
		taskRepo.save(itemEntity);

	}

	public TaskResponse addTasks(TaskRequest task) {
		TodoListEntity todoList = null;
		todoList = todoListRepo.getOne(task.getTodoListId());
		CalendarEntity calendarEntity = null;
		TaskEntity taskEntity = new TaskEntity(task.getId(), task.getDescription(), task.getTitle(),
				DateTimeUtil.parseTimestampWithTimezone(task.getDuedate()),
				task.getRepeatType(),
				task.isComplete(),
				todoList,calendarEntity);
		taskRepo.save(taskEntity);
		String dueDate = taskEntity.getDuedate()==null?null:taskEntity.getDuedate().toString();
		return new TaskResponse(taskEntity.getId(), taskEntity.getTitle(), taskEntity.getDescription(), taskEntity.isComplete(), dueDate, taskEntity.getTodoListEntity().getId());

	}

	public void deleteTask(Long taskId) {
		taskRepo.deleteById(taskId);
	}

	public void deleteTodoList(Long listId) {
		todoListRepo.deleteById(listId);
	}

}
