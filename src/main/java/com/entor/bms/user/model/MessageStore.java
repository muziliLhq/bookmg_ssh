package com.entor.bms.user.model;

public class MessageStore {
    private String message;

    public MessageStore(String message) {
        this.message = message;
    }

    public MessageStore() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
