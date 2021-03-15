package com.morganizer.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.morganizer.dto.TaskItemRequest;
import com.morganizer.dto.TaskRequest;
import com.morganizer.dto.TaskResponse;
import com.morganizer.entity.ItemEntity;
import com.morganizer.entity.RecurringModeEntity;
import com.morganizer.entity.TaskEntity;
import com.morganizer.entity.UserDetailsEntity;
import com.morganizer.repository.ItemRepository;
import com.morganizer.repository.TaskRepository;
import com.morganizer.repository.UserDetailsRepository;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository taskRepo;

	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private UserDetailsRepository userDetailsRepo;
	
	@Autowired
	private ItemRepository itemRepo;

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

	public void updateStatus(Long itemId, boolean itemStatus){

		ItemEntity itemEntity = itemRepository.getOne(itemId);
		itemRepository.save(itemEntity);

	}
	
	public void addItem(TaskItemRequest item) {
		
		TaskEntity task = taskRepo.getOne(item.getTask_id());
		ItemEntity itemEntity = itemRepo.save(new ItemEntity(item.getId(), item.getDescription(), item.getTitle(), item.getDuedate(), item.getRepeatType(), 
				item.isComplete(), task));
		
	}
	
	 public void deleteItem(TaskRequest task) {

	        try {
	        	itemRepo.deleteById(task.getItemId());
	        } catch (Exception ex) {
	            // throw custom exception for no such event present to be deleted
	        }
	    }

}
