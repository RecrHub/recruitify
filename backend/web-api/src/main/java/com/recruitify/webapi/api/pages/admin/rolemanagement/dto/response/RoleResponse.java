package com.recruitify.webapi.api.pages.admin.rolemanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleResponse {
    private Long id;
    private String name;
    private Set<PermissionResponse> permissions;
    private Instant createdAt;
    private Instant updatedAt;
}
