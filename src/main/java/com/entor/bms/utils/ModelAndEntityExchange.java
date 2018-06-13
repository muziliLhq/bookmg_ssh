package com.entor.bms.utils;

import com.entor.bms.user.entity.UserInfo;
import com.entor.bms.user.model.UserModel;

public class ModelAndEntityExchange {
    public static UserInfo exchange(UserModel userModel) {
        UserInfo userInfo = new UserInfo();
        if (userModel.getUid() != null)
            userInfo.setUid(userModel.getUid());
        if (userModel.getName() != null)
            userInfo.setName(userModel.getName());
        if (userModel.getPassword() != null)
            userInfo.setPassword(userModel.getPassword());
        if (userModel.getIdCard() != null)
            userInfo.setIdCard(userModel.getIdCard());
        if (userModel.getRentBooks() != null)
            userInfo.setRentBooks(userModel.getRentBooks());
        if (userModel.getPic() != null)
            userInfo.setPic(userModel.getPic());
        if (userModel.getStatus() != null)
            userInfo.setStatus(userModel.getStatus());

        return userInfo;
    }

    public static UserModel exchange(UserInfo userInfo) {
        UserModel userModel = new UserModel();
        if (userInfo.getUid() != null)
            userModel.setUid(userInfo.getUid());
        if (userInfo.getName() != null)
            userModel.setName(userInfo.getName());
        if (userInfo.getPassword() != null)
            userModel.setPassword(userInfo.getPassword());
        if (userInfo.getIdCard() != null)
            userModel.setIdCard(userInfo.getIdCard());
        if (userInfo.getRentBooks() != null)
            userModel.setRentBooks(userInfo.getRentBooks());
        if (userInfo.getPic() != null)
            userModel.setPic(userInfo.getPic());
        if (userInfo.getStatus() != null)
            userModel.setStatus(userInfo.getStatus());

        return userModel;
    }
}
