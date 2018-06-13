package com.entor.bms.user.entity;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

/**
 * 用户信息
 */
@Entity
@Table(name = "user_info")
public class UserInfo {

    @Id
    // id自增
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;// 编号
    private String name;// 姓名
    private String password;// 密码

    @Column(name = "id_card")
    private String idCard;// 证件号

    @Column(name = "rent_book_ids")
    private String rentBooks;// 租赁书籍id信息
    private Integer status;// 状态，0表示冻结，1表示普通用户，2表示管理员
    private String pic;// 相片地址

    public UserInfo() {
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getRentBooks() {
        return rentBooks;
    }

    public void setRentBooks(String rentBooks) {
        this.rentBooks = rentBooks;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserInfo userInfo = (UserInfo) o;
        return Objects.equals(uid, userInfo.uid);
    }

    @Override
    public int hashCode() {

        return Objects.hash(uid);
    }

}
