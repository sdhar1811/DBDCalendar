package com.morganizer.error.handler;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;

public class ApiError {
	private HttpStatus status;
	private String message;
	private List<String> error;
	
	
	
	public ApiError(HttpStatus httpStatus, String message, List<String> error) {
		super();
		this.status = httpStatus;
		this.message = message;
		this.error = error;
	}

	public ApiError(HttpStatus httpStatus, String message, String error) {
		super();
		this.status = httpStatus;
		this.message = message;
		this.error = Arrays.asList(error);
	}

	public HttpStatus getHttpStatus() {
		return status;
	}

	public void setHttpStatus(HttpStatus httpStatus) {
		this.status = httpStatus;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<String> getError() {
		return error;
	}

	public void setError(List<String> error) {
		this.error = error;
	}
	
	
	
	

}
