package org.company.common.config.user;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


public class GrantedAuthorityRole implements GrantedAuthority {

    @ManyToOne
    @JoinColumn
    public User refUser;

    public String authority;

    @Override
    public String getAuthority() {
        return authority;
    }

}
