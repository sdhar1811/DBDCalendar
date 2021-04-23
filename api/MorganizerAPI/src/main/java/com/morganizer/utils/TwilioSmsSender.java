package com.morganizer.utils;

import com.morganizer.entity.EventDetailsEntity;
import com.morganizer.entity.ProfileEntity;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.MessageCreator;
import com.twilio.type.PhoneNumber;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("twilio")
public class TwilioSmsSender{

    private static final Logger LOGGER = LoggerFactory.getLogger(TwilioSmsSender.class);

    private final TwilioConfiguration twilioConfiguration;

    @Autowired
    public TwilioSmsSender(TwilioConfiguration twilioConfiguration) {
        this.twilioConfiguration = twilioConfiguration;
    }

    public void sendSms(EventDetailsEntity event, String alertType) {
    	
    	List<String> recipientPhones = new ArrayList<String>();
		List<String> recipientNames = new ArrayList<String>();
		
		for(ProfileEntity assignee: event.getAssigneeList()) {
			recipientPhones.add(assignee.getPhoneNumber());
			recipientNames.add(assignee.getName());
		}
		
		String recipientNamesString = String.join(", ", recipientNames);
		
    	for (String phone : recipientPhones) {
    		if (isPhoneNumberValid(phone)) {
                PhoneNumber to = new PhoneNumber("+1"+phone);
                PhoneNumber from = new PhoneNumber(twilioConfiguration.getPhoneNumber());
                System.out.println(from);
                System.out.println(to);
                String message = "Hi";
                MessageCreator creator = Message.creator(to, from, message);
                creator.create();
                //LOGGER.info("Send sms {}", );
            } else {
                throw new IllegalArgumentException(
                        "Phone number [" + phone + "] is not a valid number"
                );
            }
    	}
        

    }
    
    
    

    private boolean isPhoneNumberValid(String phoneNumber) {
        // TODO: Implement phone number validator
        return true;
    }
}