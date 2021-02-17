package com.morganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.UserRolesEntity;

public interface UserRolesRepository extends JpaRepository<UserRolesEntity, Long>{

}