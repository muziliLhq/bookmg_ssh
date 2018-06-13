package com.entor.bms.user.action;

import com.alibaba.fastjson.JSON;
import com.entor.bms.user.entity.UserInfo;
import com.entor.bms.user.model.MessageStore;
import com.entor.bms.user.model.UserModel;
import com.entor.bms.user.service.UserService;
import com.entor.bms.utils.ModelAndEntityExchange;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;


@Controller
@Scope("prototype")
public class UserAction extends ActionSupport implements ModelDriven<UserModel>, SessionAware{
    private static final Logger LOGGER = LogManager.getLogger(UserAction.class);

    @Autowired
    private UserService userService;

    private UserModel userModel;
    private MessageStore messageStore;
    private Map<String, Object> sessionMap;
    private String userJson;
    private String[] uids;

    public UserModel getUserModel() {
        return userModel;
    }

    public void setUserModel(UserModel userModel) {
        this.userModel = userModel;
    }

    public MessageStore getMessageStore() {
        return messageStore;
    }

    public void setMessageStore(MessageStore messageStore) {
        this.messageStore = messageStore;
    }

    public String getUserJson() {
        return userJson;
    }

    public void setUserJson(String userJson) {
        this.userJson = userJson;
    }

    @Override
    public UserModel getModel() {
        if (userModel == null)
            userModel = new UserModel();
        return userModel;
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.sessionMap = session;
    }

    public String login() {
        // 验证用户名和密码
        int num = userService.loginValidate(userModel.getIdCard(), userModel.getPassword());
        if (num != 1) {
            // 请求转发到login.jsp
            messageStore = new MessageStore("用户名或密码不匹配!");
            return "invalid";
        }
        // 通过idCard查询用户信息
        UserInfo user = userService.getUserInfoByIdCard(userModel.getIdCard());
        // 将user信息方法session中，在会话期间都可以访问到
        sessionMap.put("user", user);
        return SUCCESS;
    }

    public String list() {
        List<UserInfo> list = userService.getAllUsers();
        userJson = "{\"total\":" + list.size() + ", \"rows\":" + JSON.toJSON(list).toString() + "}";
        return "json";
    }

    public String lookPage() {
        userModel = ModelAndEntityExchange.exchange(userService.getUserInfoById(userModel.getUid()));
        return "look";
    }

    public String addPage() {
        return "add";
    }

    public String add() {
        UserInfo userInfo = ModelAndEntityExchange.exchange(userModel);
        userService.addUser(userInfo);
        messageStore = new MessageStore("添加成功!");
        return "add";
    }

    public String updatePage() {
        userModel = ModelAndEntityExchange.exchange(userService.getUserInfoById(userModel.getUid()));
        return "update";
    }

    public String update() {
        userService.updateUserInfoByIdCard(ModelAndEntityExchange.exchange(userModel));
        messageStore = new MessageStore("更新成功！");
        return "update";
    }

    public String froze() {
        userService.updateStatusById(userModel.getUid(), userModel.getStatus());
        userJson = "{\"message\":\"冻结成功！\"}";
        return "json";
    }

    public String unfroze() {
        userService.updateStatusById(userModel.getUid(), userModel.getStatus());
        userJson = "{\"message\":\"解冻成功！\"}";
        return "json";
    }

    public String delete() {
        userService.removeUserById(userModel.getUid());
        userJson = "{\"message\":\"删除成功！\"}";
        return "json";
    }

    public String batchDel() {
        userService.batchDel(uids);
        userJson = "{\"message\":\"删除成功！\"}";
        return "json";
    }

    public String search() {
        List<UserInfo> list = userService.searchUserInfoByName(userModel.getName());
        userJson = "{\"total\":" + list.size() + ", \"rows\":" + JSON.toJSON(list).toString() + "}";
        return "json";
    }
}
