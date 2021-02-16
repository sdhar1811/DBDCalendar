package com.morganizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.UserCredentials;

public interface UserCredentailsRepository extends JpaRepository<UserCredentials,Long> {
	
	List<UserCredentials> findByUsername(String userName);

}
