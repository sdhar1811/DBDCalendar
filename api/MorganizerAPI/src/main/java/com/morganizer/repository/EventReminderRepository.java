package com.morganizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.morganizer.entity.EventReminderEntity;

public interface EventReminderRepository extends JpaRepository<EventReminderEntity, Long> {

	List<EventReminderEntity> findByReminderId(Long reminderId);
}
