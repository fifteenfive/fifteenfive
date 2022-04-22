package com.a307.fifteenfive.config.jwt;

import com.a307.fifteenfive.db.entity.User;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class CustomUserDetails implements UserDetails {

    @Autowired
    private User user;

    boolean accountNonExpired = true;

    boolean accountNonLocked = true;

    boolean credentialNonExpired = true;

    boolean enabled = true;

    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails (User user){

        super();
        this.user=user;

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRoles().toString()));

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> authorities = new ArrayList<>();
        user.getRoleList().forEach(r-> {
            authorities.add(() -> r);
        });

        return authorities;

    }

    public User getUser(){
        return this.user;
    }

    @Override
    public String getPassword() {
        return user.getUserPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
