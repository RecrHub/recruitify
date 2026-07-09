package com.recruitify.webapi.api.pages.admin.rolemanagement.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * Payload submitted by the admin role-management UI when an admin toggles
 * the permission checkboxes for a single role.
 *
 * <p>Semantics: <strong>PUT (replace)</strong>. The {@code permissionIds}
 * set is the complete desired permission set after the change — the server
 * removes permissions that are not in the list and adds the ones that are.
 * Sending {@code []} revokes all permissions from the role.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRolePermissionsRequest {

    @NotNull(message = "permissionIds is required (use [] to revoke all)")
    private Set<Long> permissionIds;
}
