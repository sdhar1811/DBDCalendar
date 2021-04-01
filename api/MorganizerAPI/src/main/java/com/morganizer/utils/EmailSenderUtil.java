package com.morganizer.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.context.annotation.Configuration;

import com.morganizer.entity.EventDetailsEntity;
import com.morganizer.entity.ProfileEntity;

@Configuration
public class EmailSenderUtil 
{
	public static void sendmail(EventDetailsEntity event, String alertType) throws AddressException, MessagingException, IOException {
		
		List<String> recipientEmails = new ArrayList<String>();
		List<String> recipientNames = new ArrayList<String>();
		
		for(ProfileEntity assignee: event.getAssigneeList()) {
			recipientEmails.add(assignee.getEmail());
			recipientNames.add(assignee.getName());
		}
		String recipientEmailsString = String.join(",", recipientEmails);
		String recipientNamesString = String.join(", ", recipientNames);
		
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");
		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("morganized.emailer@gmail.com", "Test@123");
			}
		});
		Message msg = new MimeMessage(session);
		msg.setFrom(new InternetAddress("morganized.emailer@gmail.com", false));
	
		msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmailsString));
		
		String subject, startingContent;
		
		switch(alertType)
        {
            case "Create Event":
                subject = "Morganized: New event - "+event.getEventTitle();
                startingContent = "<p>A new event was created. Details of the event are:</p>\n";
                break;
            case "Update Event":
                subject = "Morganized: Event updated - "+event.getEventTitle();
                startingContent = "<p>An event was updated. Details of the event are:</p>\n";
                break;
            default:
            	subject = "";
            	startingContent = "";
        }
		
		String bodyContent = "<p><strong>Title: </strong>"+ event.getEventTitle() +"</p>\r\n"
								+ "<p><strong>Description: </strong>"+ event.getEventDescription() +"</p>\r\n"
								+ "<p><strong>Start Date and Time: </strong>"+ event.getStartTime().toLocaleString() +"</p>\r\n"
								+ "<p><strong>End Date and Time: </strong>"+ event.getEndTime().toLocaleString() +"</p>\r\n"
								+ "<p><strong>Location: </strong>"+ event.getLocation() +"</p>\r\n"
								+ "<p><strong>Assignees: </strong>"+ recipientNamesString +"</p>\r\n"
								+ "<p><strong>Calendar: </strong>"+ event.getCalendar().getName() +"</p>\r\n"
								+ "<p><strong>Recurring Mode: </strong>"+ event.getRecurringMode().getDescription() +"</p>\r\n"
								+ "<p><strong>Is All Day: </strong>"+ event.isAllDayEvent()+"</p>\r\n";
		
		msg.setSubject(subject);
		msg.setSentDate(new Date());
	
		MimeBodyPart messageBodyStartPart = new MimeBodyPart();
		messageBodyStartPart.setContent(startingContent, "text/html");
		
		MimeBodyPart messageBodyPart = new MimeBodyPart();
		messageBodyPart.setContent(bodyContent, "text/html");

		Multipart multipart = new MimeMultipart();
		
		multipart.addBodyPart(messageBodyStartPart);
		multipart.addBodyPart(messageBodyPart);
		
		msg.setContent(multipart);
		Transport.send(msg);
		
	}
}
