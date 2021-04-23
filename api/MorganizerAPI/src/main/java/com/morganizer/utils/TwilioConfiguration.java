package com.morganizer.utils;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "twilio")
public class TwilioConfiguration {
	
	private String twilioAccountSid;
	private String twilioAuthToken;
	private String phoneNumber;
	
	public String getTwilioAccountSid() {
		return twilioAccountSid;
	}
	public void setTwilioAccountSid(String twilioAccountSid) {
		this.twilioAccountSid = twilioAccountSid;
	}
	public String getTwilioAuthToken() {
		return twilioAuthToken;
	}
	public void setTwilioAuthToken(String twilioAuthToken) {
		this.twilioAuthToken = twilioAuthToken;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	

}
