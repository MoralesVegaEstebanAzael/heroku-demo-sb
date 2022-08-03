package com.heroku.heroku.controllers;

import com.heroku.heroku.dao.UserDao;
import com.heroku.heroku.models.Usuario;
import com.heroku.heroku.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthController {
    @Autowired
    private UserDao userDao;
    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(@RequestBody Usuario user){
        Usuario userAuth =  userDao.getUserByCredentials(user);
        if(userAuth!=null){
            String tokenJwt = jwtUtil.create(String.valueOf(userAuth.getId()),userAuth.getEmail());
            return tokenJwt;
        }
        return "FAIL";
    }
}
