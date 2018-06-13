package com.entor.bms.user.service;

import java.util.List;

import com.entor.bms.user.entity.UserInfo;

/**
 * 用户服务接口
 */
public interface UserService {
	/**
	 * 保存注册用户
	 *
	 * @param userInfo
	 */
	void saveUser(UserInfo userInfo);

	boolean isIdCardOnlyOne(String idCard);

	/**
	 * 登录判断，根据证件号、密码和状态判断用户是否可以登录
	 *
	 * @param idCard
	 * @param password
	 * @return LoginStatusEnum.OK|LoginStatusEnum.FAILURE|LoginStatusEnum.FROZEN
	 */
	int loginValidate(String idCard, String password);

	UserInfo getUserInfoByIdCard(String idCard);

	/**
	 * 根据id更新用户租赁信息
	 *
	 * @param userInfo
	 *            新的用户信息
	 */
	void updateRentBooksById(UserInfo userInfo);

	/**
	 * 根据id更新用户租赁信息
	 *
	 * @param ids
	 *            id集合
	 */
	void updateRentBooksById(UserInfo userInfo, List<Integer> ids);

	/**
	 * 查询所有用户信息
	 *
	 * @return
	 */
	List<UserInfo> getAllUsers();

	/**
	 * 根据状态查询用户信息
	 *
	 * @param userStatusEnum
	 *            状态对应的枚举类型
	 * @return
	 */
	List<UserInfo> getUserInfoByStatus(int status);

	/**
	 * 根据姓名搜索用户
	 *
	 * @param name
	 *            姓名关键字
	 * @return 用户信息
	 */
	List<UserInfo> searchUserInfoByName(String name);

	/**
	 * 添加用户信息，由管理员操作
	 *
	 * @param userInfo
	 */
	void addUser(UserInfo userInfo);

	/**
	 * 根据证件号修改用户信息
	 *
	 * @param userInfo
	 */
	void updateUserInfoByIdCard(UserInfo userInfo);

	/**
	 * 根据证件号修改密码
	 * 
	 * @param idCard
	 * @param newpass
	 */
	void alterPassByIdCard(String idCard, String newpass);

	/**
	 * 根据uid修改状态码
	 * 
	 * @param uid
	 * @param status
	 */
	void updateStatusById(Integer uid, Integer status);

	UserInfo getUserInfoById(Integer uid);

	void updatePicById(Integer uid, String pic);

	void removeUserById(Integer uid);

	void batchDel(String[] uids);

	List<UserInfo> searchUsersByName(String name);
}
