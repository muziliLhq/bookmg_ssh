package com.entor.bms.user.dao.impl;

import com.entor.bms.user.dao.UserDAO;
import com.entor.bms.user.entity.UserInfo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository("userDAO")
public class UserDAOImpl implements UserDAO {
    private static final Logger LOGGER = LogManager.getLogger();


    @Resource
    private SessionFactory sessionFactory;

    private Session getSession() {
        // 当前session
        return sessionFactory.getCurrentSession();
    }

    @Override
    public void insertUser(UserInfo userInfo) {
        getSession().save(userInfo);
    }

    @Override
    public List<UserInfo> getAll() {
        return getSession().createQuery("from UserInfo", UserInfo.class).list();
    }

    @Override
    public UserInfo selectUserInfoByIdCard(String idCard) {
        return getSession().createQuery("from UserInfo u where u.idCard = :idCard", UserInfo.class)
                .setParameter("idCard", idCard)
                .uniqueResult();
    }

    @Override
    public UserInfo selectByIdCardAndPassword(String idCard, String password) {
        return getSession().createQuery("from UserInfo u where u.idCard = :idCard and u.password = :password", UserInfo.class)
                .setParameter("idCard", idCard)
                .setParameter("password", password)
                // 唯一性
                .uniqueResult();
    }

    @Override
    public void updateStatusByUId(Integer uid, Integer status) {
        getSession().createQuery("update UserInfo u set u.status = :status where u.uid = :uid")
                .setParameter("status", status)
                .setParameter("uid", uid)
                .executeUpdate();
    }

    @Override
    public void updatePassByIdCard(String idCard, String newpass) {
        getSession().createQuery("update UserInfo u set u.password = :password where u.idCard = :idCard")
                .setParameter("password", newpass)
                .setParameter("idCard", idCard)
                .executeUpdate();
    }

    @Override
    public UserInfo selecUserInfoById(Integer uid) {
        return getSession().get(UserInfo.class, uid);
    }

    @Override
    public void updateUserInfo(UserInfo userInfo) {
        UserInfo user = selecUserInfoById(userInfo.getUid());
        if (!StringUtils.isEmpty(userInfo.getName()))
            user.setName(userInfo.getName());
        getSession().update(user);
    }

    @Override
    public void updatePicById(Integer uid, String pic) {
        getSession().createQuery("update UserInfo u set u.pic = :pic where u.uid = :uid")
                .setParameter("pic", pic)
                .setParameter("uid", uid)
                .executeUpdate();
    }

    @Override
    public void deleteUser(Integer uid) {
        UserInfo userInfo = selecUserInfoById(uid);
        if (userInfo != null) {
            getSession().delete(userInfo);
        }
    }

    @Override
    public void batchDel(String[] uids) {
        // 创建查询构建器对象
        CriteriaBuilder builder = getSession().getCriteriaBuilder();
        // 创建查询对象
        CriteriaDelete<UserInfo> query = builder.createCriteriaDelete(UserInfo.class);
        // 创建Root对象，每个root都代表一个实体的实例
        Root<UserInfo> root = query.from(UserInfo.class);
        // 创建In操作
        CriteriaBuilder.In<Integer> in = builder.in(root.get("uid"));
        for (String uid : uids) {
            if (!StringUtils.isEmpty(uid)) {
                // in操作中需要匹配的值
                in.value(Integer.parseInt(uid));// in (1,2,3)
            }
        }
        // 执行更新操作
        getSession().createQuery(query.where(in)).executeUpdate();
    }

    @Override
    public List<UserInfo> selectByName(String name) {
        return getSession().createQuery("from UserInfo u where u.name like '%':name'%'", UserInfo.class)
                .setParameter("name", name)
                .list();
    }

    @Override
    public void updateRentBooksById(UserInfo userInfo) {
        getSession().createQuery("update UserInfo u set u.rentBooks = :rentBooks where u.uid = :uid")
                .setParameter("rentBooks", userInfo.getRentBooks())
                .setParameter("uid", userInfo.getUid())
                .executeUpdate();
    }

    @Override
    public UserInfo selectUserInfoById(int uid, int ex_status) {
        return getSession().createQuery("from UserInfo u where u.uid=:uid and u.status=:status", UserInfo.class)
                .setParameter("uid", uid)
                .setParameter("status", ex_status)
                .uniqueResult();
    }
}
