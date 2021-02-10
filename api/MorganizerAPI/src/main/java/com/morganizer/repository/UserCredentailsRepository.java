package com.morganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.UserCredentials;

public interface UserCredentailsRepository extends JpaRepository<UserCredentials,String> {
	

}
