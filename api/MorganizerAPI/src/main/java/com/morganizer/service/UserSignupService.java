package com.morganizer.service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morganizer.dto.CalendarRequest;
import com.morganizer.dto.ProfileRequest;
import com.morganizer.dto.TodoListRequest;
import com.morganizer.entity.UserCredentials;
import com.morganizer.entity.UserDetailsEntity;
import com.morganizer.entity.UserRolesEntity;
import com.morganizer.model.UserModel;
import com.morganizer.repository.UserCredentailsRepository;
import com.morganizer.repository.UserDetailsRepository;
import com.morganizer.repository.UserRolesRepository;
import com.morganizer.utils.PasswordUtil;
import com.morganizer.utils.SecurePassword;

@Service
public class UserSignupService {

	@Autowired
	UserDetailsRepository userDetailsRepo;

	@Autowired
	SecurePassword securePassword;

	@Autowired
	UserCredentailsRepository userCredentialsRepo;

	@Autowired
	UserRolesRepository userRolesRepo;
	
	@Autowired
    CalendarService calendarService;
	
	@Autowired
    ProfileService profileService;
	
	@Autowired
	TodoListService taskService;


	public void registerUser(UserModel userInfo) throws Exception {
		storeUserDetails(userInfo);
	}

	public void storeUserDetails(UserModel userInfo) throws Exception {
		if (userInfo != null) {
			UserDetailsEntity user = new UserDetailsEntity(userInfo.getFirstName(), userInfo.getLastName(), userInfo.getMiddelName()
					, userInfo.getUsername(), userInfo.getEmail(), userInfo.getBirthdate(), userInfo.getPhoneNumber(),
					userInfo.getGender());
			userDetailsRepo.save(user);

			Long calendarId = addDefaultCalendar(user.getId());
			addDefaultToDoList(user.getId());
			Long profileId = addDefaultProfile(user);
			user.setDefaultCalendarId(calendarId);	
			user.setDefaultProfileId(profileId);
			encryptPassword(userInfo);
		}
	}

	
	private Long addDefaultProfile(UserDetailsEntity user) {
		ProfileRequest profileRequest = new ProfileRequest(user.getId(), user.getFirstName(), user.getEmail(), user.getGender(), 
				user.getPhoneNumber(), user.getBirthdate(), "#2055F8", true );
		return profileService.addProfile(profileRequest).getProfileId();
	}

	public Long addDefaultCalendar(Long userId) {
		CalendarRequest calendarRequest = new CalendarRequest("Home", "#394697", userId, true);
		calendarService.saveCalendar(calendarRequest);
		
		return calendarRequest.getCalendarId();
	}
	
	public void addDefaultToDoList(Long userId) {
		
		TodoListRequest task = new TodoListRequest("My List", userId);
		taskService.createTodoList(task);
	}
	
	
	
	public void encryptPassword(UserModel userDetails) throws Exception {
		byte[] salt = PasswordUtil.getSalt(20);
		String hashedPassword = securePassword.generateSecurePassword(userDetails.getPassword(), salt);
		userCredentialsRepo.save(new UserCredentials(userDetails.getUsername(), hashedPassword,
				Base64.getEncoder().encodeToString(salt), userDetails.getEmail()));
	}

	public void fetchUserRole(String username) throws Exception {
		List<UserDetailsEntity> userRoleList = userDetailsRepo.findByUserName(username);

		if (userRoleList.size() > 0) {
			Optional<UserRolesEntity> userRolesOptional = userRolesRepo.findById(userRoleList.get(0).getRoleid());
			
			if (userRolesOptional.isPresent()) {
				System.out.println(userRolesOptional.get().getRoleType());
			}
		}
	}
}
