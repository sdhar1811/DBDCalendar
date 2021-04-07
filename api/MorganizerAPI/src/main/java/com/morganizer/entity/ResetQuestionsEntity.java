package com.morganizer.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="reset_questions")
public class ResetQuestionsEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="questionid")
    private Long questionId;
    private String questiontext;
    
    
    public ResetQuestionsEntity() {
    	
    }


	public ResetQuestionsEntity(Long questionId, String questiontext) {
		super();
		this.questionId = questionId;
		this.questiontext = questiontext;
	}


	public Long getQuestionId() {
		return questionId;
	}


	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}


	public String getQuestiontext() {
		return questiontext;
	}


	public void setQuestiontext(String questiontext) {
		this.questiontext = questiontext;
	}
       

}
