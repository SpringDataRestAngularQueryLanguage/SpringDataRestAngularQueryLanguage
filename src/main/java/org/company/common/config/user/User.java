package org.company.common.config.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue
    public Long id;
    public String username;
    public String password;

    @OneToMany(mappedBy = "refUser", cascade= CascadeType.ALL)
    public static List<GrantedAuthorityRole> refGrantedAuthorities = new ArrayList<GrantedAuthorityRole>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return refGrantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
