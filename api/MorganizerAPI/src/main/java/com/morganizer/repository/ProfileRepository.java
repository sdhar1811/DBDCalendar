package com.morganizer.repository;

import com.morganizer.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<ProfileEntity,Long> {

    void deleteByProfileIdAndUserId(Long profileId,Long userId);
}
