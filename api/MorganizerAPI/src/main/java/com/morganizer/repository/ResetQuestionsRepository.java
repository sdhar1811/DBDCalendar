package com.morganizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morganizer.entity.ProfileEntity;
import com.morganizer.entity.ResetQuestionsEntity;

public interface ResetQuestionsRepository extends JpaRepository<ResetQuestionsEntity,Long> {

    List<ResetQuestionsEntity> findByQuestionId(Long questionId);
}
