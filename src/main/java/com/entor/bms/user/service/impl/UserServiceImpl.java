package com.entor.bms.user.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.entor.bms.user.dao.UserDAO;
import com.entor.bms.user.dao.impl.UserDAOImpl;
import com.entor.bms.user.entity.UserInfo;
import com.entor.bms.user.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service("userService")
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false)
public class UserServiceImpl implements UserService {

	@Resource
	private UserDAO userDAO;

	/**
	 * 调用数据访问层的添加用户的方法
	 *
	 * @param userInfo
	 */
	@Override
	public void saveUser(UserInfo userInfo) {
		// 调用dao插入用户的操作
		userDAO.insertUser(userInfo);
	}

	@Transactional(readOnly = true)
	@Override
	public boolean isIdCardOnlyOne(String idCard) {
		if (getUserInfoByIdCard(idCard) != null)
			return true;
		return false;
	}

	@Transactional(readOnly = true)
	@Override
	public int loginValidate(String idCard, String password) {
		UserInfo userInfo = userDAO.selectByIdCardAndPassword(idCard, password);
		// idCard不存在
		if (userInfo == null)
			return 0;

		// 密码不匹配
		if (!password.equals(userInfo.getPassword()))
			return -1;

		// 验证通过
		return 1;
	}

	@Transactional(readOnly = true)
	@Override
	public UserInfo getUserInfoByIdCard(String idCard) {
		return userDAO.selectUserInfoByIdCard(idCard);
	}

	@Override
	public void updateRentBooksById(UserInfo userInfo, List<Integer> ids) {
	}

	@Transactional(readOnly = true)
	@Override
	public List<UserInfo> getAllUsers() {
		return userDAO.getAll();
	}

	@Transactional(readOnly = true)
	@Override
	public List<UserInfo> getUserInfoByStatus(int status) {
		// 根据状态类型设置要查询的状态值
		// 取得所有的用户信息
		List<UserInfo> list = getAllUsers();
		// 筛选用户信息
		List<UserInfo> list2 = new ArrayList<>();
		for (UserInfo u : list) {
			if (u != null && u.getStatus() == status) {
				list2.add(u);
			}
		}
		return list2;
	}

	@Transactional(readOnly = true)
	@Override
	public List<UserInfo> searchUserInfoByName(String name) {
		return null;
	}

	@Override
	public void addUser(UserInfo userInfo) {
		// 设置默认的密码
		userInfo.setPassword("123");
		// 设置默认用户状态
		userInfo.setStatus(1);
		// 调用dao插入用户的操作
		userDAO.insertUser(userInfo);
	}

	@Override
	public void updateUserInfoByIdCard(UserInfo userInfo) {
		// 更新用户信息
		userDAO.updateUserInfo(userInfo);
	}

	@Override
	public void alterPassByIdCard(String idCard, String newpass) {
		userDAO.updatePassByIdCard(idCard, newpass);
	}

	@Override
	public void updateRentBooksById(UserInfo userInfo) {
		userDAO.updateRentBooksById(userInfo);
	}

	@Override
	public void updateStatusById(Integer uid, Integer status) {
		userDAO.updateStatusByUId(uid, status);
	}

	@Transactional(readOnly = true)
	@Override
	public UserInfo getUserInfoById(Integer uid) {
		return userDAO.selecUserInfoById(uid);
	}
	
	@Override
	public void updatePicById(Integer uid, String pic) {
		userDAO.updatePicById(uid, pic);
	}

	@Override
	public void removeUserById(Integer uid) {
		userDAO.deleteUser(uid);
	}

	@Override
	public void batchDel(String[] uids) {
		userDAO.batchDel(uids);
	}

	@Transactional(readOnly = true)
	@Override
	public List<UserInfo> searchUsersByName(String name) {
		return userDAO.selectByName(name);
	}
}
