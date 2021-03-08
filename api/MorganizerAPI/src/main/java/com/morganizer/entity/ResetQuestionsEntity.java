package com.morganizer.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="reset_questions")
public class ResetQuestionsEntity {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private int questionid;
	private String questiontext;
	
	public ResetQuestionsEntity(int questionid, String questiontext) {
		super();
		this.questionid = questionid;
		this.questiontext = questiontext;
	}

	public int getQuestionid() {
		return questionid;
	}

	public void setQuestionid(int questionid) {
		this.questionid = questionid;
	}

	public String getQuestiontext() {
		return questiontext;
	}

	public void setQuestiontext(String questiontext) {
		this.questiontext = questiontext;
	}
	
	
	
}
