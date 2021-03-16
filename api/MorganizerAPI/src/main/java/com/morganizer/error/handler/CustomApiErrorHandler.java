package com.morganizer.error.handler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomApiErrorHandler extends ResponseEntityExceptionHandler{

	@Override
	protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request) {		
		
		return createErrorResponse(new ApiError(status,"asdsd"+ex.getMessage(), ex.getLocalizedMessage()));
	}
	
	@ExceptionHandler(InvalidCredentialsException.class)
    public final ResponseEntity<Object> handleUserNotFoundException(InvalidCredentialsException ex, WebRequest request) {
        List<String> details = new ArrayList<>();
        details.add(ex.getLocalizedMessage());
       return createErrorResponse(new ApiError(HttpStatus.FORBIDDEN,"Login validation failed", details));
        
    }
	
	@ExceptionHandler(UnsupportedHashingExceptionHandler.class)
    public final ResponseEntity<Object> handleUnsupportedHashingException(UnsupportedHashingExceptionHandler ex, WebRequest request) {
        List<String> details = new ArrayList<>();
        details.add(ex.getLocalizedMessage());
       return createErrorResponse(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR,"Login validation failed", details));
        
    }
	
	private ResponseEntity<Object> createErrorResponse(ApiError apiError){
		return new ResponseEntity<>(apiError, apiError.getHttpStatus());
	}
	
	
	
	

}
