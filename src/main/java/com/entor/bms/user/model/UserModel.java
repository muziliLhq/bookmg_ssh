package com.entor.bms.user.model;

public class UserModel  {
    private Integer uid;// 编号
    private String name;
    private String password;
    private String idCard;
    private String rentBooks;// 租赁书籍id信息
    private Integer status;
    private String pic;

    public UserModel() {
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
}
