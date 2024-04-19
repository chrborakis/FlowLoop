package com.tp4815.api.controller;

import com.tp4815.api.model.User;
import com.tp4815.api.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping(value = "/users")
    public String getPage() {
        return "USERS OPTIONS<br/>"+
                "<br/>GET /api/v1/users"+
                "<br/>POST /api/v1/users"+
                "<br/>GET /api/v1/users/{userId}"+
                "<br/>PUT /api/v1/users/{userId}"+
                "<br/>DELETE /api/v1/users/{userId}"+
                "<br/>POST /api/v1/saveUser"+
                "<br/>PUT /api/v1/updateUser/{id}";
    }

    @GetMapping(value = "/api/v1/users")
    public List<User> getUsersGet(){
        return userRepo.findAll();
    }

    @PostMapping(value = "/api/v1/users")
    public List<User> getUsersPost(){
        return userRepo.findAll();
    }

    @GetMapping(value = "/api/v1/users/{id}")
    public User getUserGet(@PathVariable long id){
        return userRepo.findById(id).get();
    }

    @PutMapping(value = "/api/v1/users/{id}")
    public User getUserPut(@PathVariable long id){
        return userRepo.findById(id).get();
    }

    @PostMapping(value = "/api/v1/saveUser")
    public String saveUser( @RequestBody User user){
       userRepo.save( user);
       return "Saved User";
    }

    @PutMapping(value = "/api/v1/updateUser/{id}")
    public String updateUser( @PathVariable long id, @RequestBody User user){
        User updatedUser = userRepo.findById(id).get();

        updatedUser.setUsername(user.getUsername());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setStreet(user.getStreet());
        updatedUser.setCity(user.getCity());
        updatedUser.setZipCode(user.getZipCode());
        updatedUser.setCountry(user.getCountry());
        updatedUser.setPhone(user.getPhone());
        updatedUser.setBirthDate(user.getBirthDate());
        updatedUser.setGender(user.getGender());

        return "User "+id+" Updated";
    }

    @DeleteMapping( value = "/api/v1/deleteUser/{id}")
    public String deleteUser(@PathVariable long id){
        User deleteUser = userRepo.findById(id).get();
        userRepo.delete(deleteUser);
        return "Deleted user " + id+"";
    }
}