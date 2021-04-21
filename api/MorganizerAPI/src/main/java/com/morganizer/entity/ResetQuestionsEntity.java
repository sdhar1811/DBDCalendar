package com.morganizer.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="reset_questions")
public class ResetQuestionsEntity {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long questionid;
	private String questiontext;
	
	public ResetQuestionsEntity() {
		
	}

	public ResetQuestionsEntity(Long questionid, String questiontext) {
		super();
		this.questionid = questionid;
		this.questiontext = questiontext;
	}

	public Long getQuestionid() {
		return questionid;
	}

	public void setQuestionid(Long questionid) {
		this.questionid = questionid;
	}

	public String getQuestiontext() {
		return questiontext;
	}

	public void setQuestiontext(String questiontext) {
		this.questiontext = questiontext;
	}



}