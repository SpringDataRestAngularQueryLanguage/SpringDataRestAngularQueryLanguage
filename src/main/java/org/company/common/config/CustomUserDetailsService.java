package org.company.common.config;

import org.company.common.config.user.ServiceUser;
import org.company.common.config.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CustomUserDetailsService implements UserDetailsService
{
    @Autowired
    private ServiceUser serviceUser;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        User user = serviceUser.findByUsername(userName);

        if(user == null){
            throw new UsernameNotFoundException("UserName "+userName+" not found");
        }

        return user;
    }
}
