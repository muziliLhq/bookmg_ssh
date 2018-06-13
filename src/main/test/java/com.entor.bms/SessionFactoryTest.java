package com.entor.bms;

import com.entor.bms.user.dao.UserDAO;
import com.entor.bms.user.service.UserService;
import org.hibernate.SessionFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
@RunWith(SpringJUnit4ClassRunner.class)
public class SessionFactoryTest {

    @Resource
    private SessionFactory sessionFactory;

    @Resource
    private UserDAO userDAO;

    @Resource
    private UserService userService;

    @Test
    public void testSessionFactory(){
        System.out.println(userService.getUserInfoByIdCard("3357"));
    }
}
