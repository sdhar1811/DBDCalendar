package com.morganizer.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.dto.CalendarResponse;
import com.morganizer.entity.CalendarEntity;
import com.morganizer.repository.CalendarRepository;

@Service
public class CalendarService {
	
	@Autowired
	public CalendarRepository calendarRepository;

	public List<CalendarResponse> fetchAll(Long userId) {
		// TODO Auto-generated method stub
		List<CalendarEntity> calendarList =  calendarRepository.findByUserId(userId);
		
		List<CalendarResponse> result = new ArrayList<>();
		for(CalendarEntity calendar: calendarList) {
			result.add(new CalendarResponse(calendar.getCalendarId(), calendar.getName(), calendar.getColor(), calendar.getUser().getId()));
		}
		return result;
	}
	
}
