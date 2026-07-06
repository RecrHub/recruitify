package com.recruitify.webapi.api.pages.admin.accountmanagement.service.impl;

import com.recruitify.webapi.api.pages.admin.accountmanagement.dto.request.CreateHrRequest;
import com.recruitify.webapi.api.pages.admin.accountmanagement.service.IAccountManagementService;
import com.recruitify.webapi.common.model.identity.Role;
import com.recruitify.webapi.common.model.identity.User;
import com.recruitify.webapi.common.repository.RoleRepository;
import com.recruitify.webapi.common.repository.UserRepository;
import com.recruitify.webapi.common.vo.MessageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class AccountManagementServiceImpl implements IAccountManagementService {

    private static final String ROLE_HR = "ROLE_HR";

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public AccountManagementServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public MessageResponse createHrAccount(CreateHrRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return MessageResponse.builder()
                    .message("Email is already in use")
                    .success(false)
                    .build();
        }

        Role hrRole = roleRepository.findByName(ROLE_HR)
                .orElseThrow(() -> new RuntimeException("Error: Role '" + ROLE_HR + "' is not found."));

        User hr = User.builder()
                .username(request.getFullName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(hrRole)
                .build();
        userRepository.save(hr);

        log.info("HR account created successfully by admin: {}", hr.getEmail());

        return MessageResponse.builder()
                .message("HR account created successfully!")
                .success(true)
                .build();
    }
}
