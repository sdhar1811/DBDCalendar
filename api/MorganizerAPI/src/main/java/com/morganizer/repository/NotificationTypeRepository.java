package com.morganizer.repository;
import com.morganizer.entity.NotificationTypesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationTypeRepository extends JpaRepository<NotificationTypesEntity,Long> {
}

