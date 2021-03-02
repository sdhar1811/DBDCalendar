package com.morganizer.entity;

import org.apache.tomcat.jni.User;
import org.springframework.data.annotation.Id;
import sun.util.resources.Bundles;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class ProfileEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long profileId;

    private String firstName;
    private String lastName;
    private String middleName;
    private String email;
    private String gender;
    private String birthdate;
    private String color;

    @ManyToOne
    @JoinColumn(name="user_id",referencedColumnName = "user_id")
    private UserDetailsEntity user;

}
