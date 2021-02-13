package com.morganizer.entity;

public class UserRolesEntity {

	private long roleId;
	private String roleType;
	
	public UserRolesEntity(long roleId, String roleType) {
		super();
		this.roleId = roleId;
		this.roleType = roleType;
	}
	
	public long getRoleId() {
		return roleId;
	}
	public void setRoleId(long roleId) {
		this.roleId = roleId;
	}
	public String getRoleType() {
		return roleType;
	}
	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}	
}