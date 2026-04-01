package com.recruitify.webapi.api.pages.publicpage.signup.service.impl;

import com.recruitify.webapi.api.pages.publicpage.signup.dto.request.SignupRequest;
import com.recruitify.webapi.common.repository.RoleRepository;
import com.recruitify.webapi.common.repository.UserRepository;
import com.recruitify.webapi.api.pages.publicpage.signup.service.ISignupService;
import com.recruitify.webapi.common.model.identity.Role;
import com.recruitify.webapi.common.model.identity.User;
import com.recruitify.webapi.common.vo.MessageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class SignupServiceImpl implements ISignupService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public SignupServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public MessageResponse registerUser(SignupRequest signupRequest) {
        if (existsByEmail(signupRequest.getEmail())) {
            return MessageResponse.builder()
                    .message("Email is already in use")
                    .success(false)
                    .build();
        }
        Role role = roleRepository.findByName("ROLE_JOBSEEKER")
                .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_JOBSEEKER' is not found."));
        User user = User.builder()
                .username(signupRequest.getFullName())
                .email(signupRequest.getEmail())
                .passwordHash(passwordEncoder.encode(signupRequest.getPassword()))
                .role(role)
                .build();
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
