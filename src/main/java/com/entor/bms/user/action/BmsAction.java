package com.entor.bms.user.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller
@Scope("prototype")
public class BmsAction {
    public String home() {
        return "home";
    }

    public String userList() {
        return "userList";
    }

    public String bookList() {
        return "bookList";
    }

    public String rentBook() {
        return "rentBook";
    }

    public String returnBook() {
        return "returnBook";
    }

}
