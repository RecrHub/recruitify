package com.recruitify.webapi.api.pages.admin.rolemanagement.service.impl;

import com.recruitify.webapi.api.pages.admin.rolemanagement.dto.request.UpdateRolePermissionsRequest;
import com.recruitify.webapi.api.pages.admin.rolemanagement.dto.response.PermissionResponse;
import com.recruitify.webapi.api.pages.admin.rolemanagement.dto.response.RoleResponse;
import com.recruitify.webapi.api.pages.admin.rolemanagement.service.IRoleManagementService;
import com.recruitify.webapi.common.model.identity.Permission;
import com.recruitify.webapi.common.model.identity.Role;
import com.recruitify.webapi.common.repository.PermissionRepository;
import com.recruitify.webapi.common.repository.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
public class RoleManagementServiceImpl implements IRoleManagementService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public RoleManagementServiceImpl(RoleRepository roleRepository,
                                     PermissionRepository permissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoleResponse> listRoles() {
        return roleRepository.findAll().stream()
                .map(this::toRoleResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PermissionResponse> listPermissions() {
        return permissionRepository.findAll().stream()
                .map(this::toPermissionResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public RoleResponse getRole(Long roleId) {
        Role role = loadRoleOrThrow(roleId);
        return toRoleResponse(role);
    }

    @Override
    @Transactional
    public RoleResponse updateRolePermissions(Long roleId, UpdateRolePermissionsRequest request) {
        Role role = loadRoleOrThrow(roleId);

        Set<Long> requestedIds = request.getPermissionIds() == null
                ? Set.of()
                : request.getPermissionIds();

        // 1) Validate every requested permission exists. Report unknowns up
        //    front so the admin UI can flag bad ids immediately.
        List<Permission> matched;
        if (requestedIds.isEmpty()) {
            matched = List.of();
        } else {
            matched = permissionRepository.findAllById(requestedIds);
            if (matched.size() != requestedIds.size()) {
                Set<Long> foundIds = matched.stream().map(Permission::getId).collect(Collectors.toSet());
                Set<Long> missing = new HashSet<>(requestedIds);
                missing.removeAll(foundIds);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Unknown permission ids: " + missing);
            }
        }

        // 2) PUT semantics — diff against current set so we only touch the
        //    rows that actually changed. Hibernate will issue DELETE/INSERT
        //    for the role_permissions join rows.
        Set<Permission> current = role.getPermissions() == null
                ? new HashSet<>()
                : new HashSet<>(role.getPermissions());
        Set<Permission> desired = new HashSet<>(matched);

        Set<Permission> toRemove = new HashSet<>(current);
        toRemove.removeAll(desired);
        Set<Permission> toAdd = new HashSet<>(desired);
        toAdd.removeAll(current);

        toRemove.forEach(role::removePermission);
        toAdd.forEach(role::addPermission);

        Role saved = roleRepository.save(role);
        log.info("Role '{}' permissions updated — +{} -{}", saved.getName(), toAdd.size(), toRemove.size());

        return toRoleResponse(saved);
    }

    // ---- helpers --------------------------------------------------------

    private Role loadRoleOrThrow(Long roleId) {
        return roleRepository.findById(roleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Role not found: " + roleId));
    }

    private RoleResponse toRoleResponse(Role role) {
        Set<PermissionResponse> permissions = role.getPermissions() == null
                ? Set.of()
                : role.getPermissions().stream()
                        .map(this::toPermissionResponse)
                        .collect(Collectors.toCollection(java.util.LinkedHashSet::new));
        return RoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .permissions(permissions)
                .createdAt(role.getCreatedAt())
                .updatedAt(role.getUpdatedAt())
                .build();
    }

    private PermissionResponse toPermissionResponse(Permission permission) {
        return PermissionResponse.builder()
                .id(permission.getId())
                .name(permission.getName())
                .description(permission.getDescription())
                .createdAt(permission.getCreatedAt())
                .updatedAt(permission.getUpdatedAt())
                .build();
    }
}
