package com.morganizer.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "roles")
public class UserRolesEntity {

	@Id
	private long roleid;
	private String roletype ;
	
	public UserRolesEntity(long roleid, String roleType) {
		super();
		this.roleid = roleid;
		this.roletype  = roleType;
	}
	
	public long getRoleId() {
		return roleid;
	}
	public void setRoleId(long roleid) {
		this.roleid = roleid;
	}
	public String getRoleType() {
		return roletype;
	}
	public void setRoleType(String roleType) {
		this.roletype = roleType;
	}	
}