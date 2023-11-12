package com.example.usercenter.model.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @Author：woke
 * @Date：2023/11/5
 */
@Data
public class UserLoginRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 6993746803531411917L;
    private String userAccount;
    private String userPassword;
}
