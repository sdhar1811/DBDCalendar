package com.morganizer.entity;


import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

// TO-DO
//@Entity(name="task_items_mapping")
public class TaskItemsMapEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="task_id",referencedColumnName = "id")
	private TaskEntity task;
	
	@ManyToOne
	@JoinColumn(name="item_id",referencedColumnName = "id")
	private ItemEntity item;
	

}
