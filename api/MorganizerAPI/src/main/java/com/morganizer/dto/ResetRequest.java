package com.morganizer.dto;

public class ResetRequest {

    private String username;
    private String email;
    private String questiontext;
    private String answer;
    
      
	public ResetRequest(String username, String email, String questiontext, String answer) {
		super();
		this.username = username;
		this.email = email;
		this.questiontext = questiontext;
		this.answer = answer;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getQuestiontext() {
		return questiontext;
	}
	public void setQuestiontext(String questiontext) {
		this.questiontext = questiontext;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
    
    
    
	
	
    
    
}
