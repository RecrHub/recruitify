package com.recruitify.webapi.common.security;

import com.recruitify.webapi.common.model.identity.Permission;
import com.recruitify.webapi.common.model.identity.Role;
import com.recruitify.webapi.common.model.identity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

/**
 * Spring Security principal backed by a domain {@link User}.
 *
 * <p>Authorities exposed to Spring Security:
 * <ul>
 *   <li>The role name prefixed with {@code ROLE_} (so {@code hasRole("ADMIN")}
 *       keeps working for backward compatibility).</li>
 *   <li>One {@link SimpleGrantedAuthority} per {@link Permission} granted to
 *       the role. Permissions are exposed with their raw name, so
 *       {@code hasAuthority("JOB_CREATE")} checks are a 1:1 match.</li>
 * </ul>
 *
 * <p>Use {@code hasAuthority(...)} for fine-grained checks and
 * {@code hasRole(...)} for coarse role-based checks.
 */
@Builder
@Data
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {
    private long id;
    private String username;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();

        Role role = user.getRole();
        if (role != null && role.getName() != null) {
            // Role-based authority. Role names in DB are stored with the
            // "ROLE_" prefix (e.g. "ROLE_ADMIN"), so we use them verbatim
            // — hasRole("ADMIN") matches because Spring's hasRole() adds
            // the "ROLE_" prefix internally.
            authorities.add(new SimpleGrantedAuthority(role.getName()));

            // Permission-based authorities (use with hasAuthority("...")).
            Set<Permission> permissions = role.getPermissions();
            if (permissions != null) {
                for (Permission permission : permissions) {
                    if (permission != null && permission.getName() != null) {
                        authorities.add(new SimpleGrantedAuthority(permission.getName()));
                    }
                }
            }
        }

        return UserDetailsImpl.builder()
                .id(user.getId())
                .username(user.getEmail())
                .email(user.getEmail())
                .password(user.getPasswordHash())
                .authorities(authorities)
                .build();
    }

    /**
     * Reconstruct an instance from a previously-issued JWT. Both the role
     * (as {@code ROLE_X}) and the raw permission names are restored so that
     * downstream {@code @PreAuthorize("hasAuthority(...)")} expressions work
     * without an extra database round-trip.
     */
    public static UserDetailsImpl fromClaims(Long id, String email, Collection<String> rawAuthorities) {
        if (rawAuthorities == null || rawAuthorities.isEmpty()) {
            return UserDetailsImpl.builder()
                    .id(id)
                    .username(email)
                    .email(email)
                    .password("")
                    .authorities(Collections.emptyList())
                    .build();
        }
        List<GrantedAuthority> mapped = new ArrayList<>(rawAuthorities.size());
        for (String a : rawAuthorities) {
            if (a != null && !a.isBlank()) {
                mapped.add(new SimpleGrantedAuthority(a));
            }
        }
        return UserDetailsImpl.builder()
                .id(id)
                .username(email)
                .email(email)
                .password("")
                .authorities(mapped)
                .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
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
