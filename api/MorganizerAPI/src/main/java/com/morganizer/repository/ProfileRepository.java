package com.morganizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.ProfileEntity;

public interface ProfileRepository extends JpaRepository<ProfileEntity,Long> {

    void deleteByProfileIdAndUserId(Long profileId,Long userId);
    List<ProfileEntity> findByUserId(Long userId);
}
