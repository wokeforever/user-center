package com.example.usercenter.model.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @Author：woke
 * @Date：2023/11/5
 */
@Data
public class UserRegisterRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = -150010351605082849L;

    private String userAccount;
    private String userPassword;
    private String checkPassword;
    private String universeCode;
}
