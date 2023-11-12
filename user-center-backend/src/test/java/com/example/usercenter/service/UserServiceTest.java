package com.example.usercenter.service;

import com.example.usercenter.model.domain.User;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 *  用户服务测试
 */
@SpringBootTest
class UserServiceTest {

    @Resource
    private UserService userService;

    @Test
    public void testAddUser(){
        User user = new User();
        user.setUsername("xiaomin");
        user.setUserAccount("123");
        user.setAvatarUrl("");
        user.setGender(0);
        user.setUserPassword("123");
        user.setPhone("123");
        user.setEmail("123");
        user.setUserStatus(0);

        boolean re = userService.save(user);
        System.out.println(user.getId());
        Assertions.assertTrue(re);


    }

    @Test
    void userRegister() {
//        long re = userService.userRegister("yupi", "", "123456");
//        Assertions.assertEquals(-1,re);
//        re = userService.userRegister("yup", "123456", "123456");
//        Assertions.assertEquals(-1,re);
//        re = userService.userRegister("yu p1", "123456", "123456");
//        Assertions.assertEquals(-1,re);
//        re = userService.userRegister("yupi", "12345", "123456");
//        Assertions.assertEquals(-1,re);
//        re = userService.userRegister("yupi", "123456", "123456");
//        Assertions.assertTrue(re > 0);
    }
}