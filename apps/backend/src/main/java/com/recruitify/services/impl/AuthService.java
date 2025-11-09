package com.recruitify.services.impl;

import com.recruitify.dtos.Request.RegisterRequest;
import com.recruitify.dtos.Response.MessageResponse;
import com.recruitify.model.Role;
import com.recruitify.model.User;
import com.recruitify.repository.IRoleRepository;
import com.recruitify.repository.IUserRepository;
import com.recruitify.services.IAuthService;
import com.recruitify.services.ITokenServices;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@Service
public class AuthService implements IAuthService {
    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;
    private final ITokenServices tokenService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(IUserRepository userRepository, IRoleRepository roleRepository, ITokenServices tokenService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public MessageResponse registerUser(RegisterRequest registerRequest) {

        if (existsByEmail(registerRequest.getEmail())) {
            return MessageResponse.builder()
                    .message("Email is already in use")
                    .success(false)
                    .build();
        }

        // Create new user account
        User user = User.builder()
                .email(registerRequest.getEmail())
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .build();

        String strRoles = registerRequest.getRole();
        Role role;

        if (strRoles == null || strRoles.isEmpty()) {
            role = roleRepository.findByName("ROLE_JOBSEEKER")
                    .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_USER' is not found."));
        } else {
            switch (strRoles.toUpperCase()) {
                case "admin" -> {
                    role  = roleRepository.findByName("ROLE_ADMIN")
                            .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_ADMIN' is not found."));
                }
                case "recruiter" -> {
                    role  = roleRepository.findByName("ROLE_RECRUITER")
                            .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_RECRUITER' is not found."));
                }
                default -> {
                    role  = roleRepository.findByName("ROLE_JOBSEEKER")
                            .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_JOBSEEKER' is not found."));
                }
            }
        }

        user.setRole(role);
        userRepository.save(user);

        log.info("User registered successfully: {}", user.getEmail());

        return MessageResponse.builder()
                .message("User registered successfully!")
                .success(true)
                .build();
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
