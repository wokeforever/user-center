package com.example.usercenter.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.usercenter.model.domain.User;
import jakarta.servlet.http.HttpServletRequest;

/**
* @author 蜗壳
* @description 针对表【user】的数据库操作Service
* @createDate 2023-11-04 11:32:54
*/
public interface UserService extends IService<User> {
    /**
     * 用户注册
     * @param userAccount 用户账号
     * @param userPassword 用户密码
     * @param checkPassword 校验密码
     * @return
     */
    long userRegister(String userAccount,String userPassword, String checkPassword,String universeCode);

    /**
     * 用户登录
     * @param userAccount
     * @param userPassword
     * @param request
     * @return
     */
    User userLogin(String userAccount, String userPassword, HttpServletRequest request);

    /**
     * 用户脱敏
     * @param user
     * @return
     */
    User getSafetyUser(User user);

    /**
     * 注销
     * @param request
     * @return
     */
    String userLogout(HttpServletRequest request);
}
