package com.recruitify.signupscreen.service.impl;

import com.recruitify.common.vo.MessageResponse;
import com.recruitify.signupscreen.dto.request.SignupRequest;
import com.recruitify.common.model.identity.Role;
import com.recruitify.common.model.identity.User;
import com.recruitify.signupscreen.repository.IRoleRepository;
import com.recruitify.signupscreen.repository.IUserRepository;
import com.recruitify.signupscreen.service.ISignupService;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class SignupServiceImpl implements ISignupService {

    private final PasswordEncoder passwordEncoder;
    private final IUserRepository IUserRepository;
    private final IRoleRepository IRoleRepository;

    public SignupServiceImpl(PasswordEncoder passwordEncoder, IUserRepository IUserRepository, IRoleRepository IRoleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.IUserRepository = IUserRepository;
        this.IRoleRepository = IRoleRepository;
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
        //Get Role User
        Role role = IRoleRepository.findByName("ROLE_JOBSEEKER")
                .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_JOBSEEKER' is not found."));
        // Create new user account
        User user = User.builder()
                .username(signupRequest.getFullName())
                .email(signupRequest.getEmail())
                .passwordHash(passwordEncoder.encode(signupRequest.getPassword()))
                .role(role)
                .build();
        IUserRepository.save(user);

        log.info("User registered successfully: {}", user.getEmail());

        return MessageResponse.builder()
                .message("User registered successfully!")
                .success(true)
                .build();
    }

    @Override
    public boolean existsByEmail(String email) {
        return IUserRepository.existsByEmail(email);
    }
}
