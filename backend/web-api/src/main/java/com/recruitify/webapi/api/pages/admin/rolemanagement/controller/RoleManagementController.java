package com.recruitify.webapi.api.pages.admin.rolemanagement.controller;

import com.recruitify.webapi.api.pages.admin.rolemanagement.dto.request.UpdateRolePermissionsRequest;
import com.recruitify.webapi.api.pages.admin.rolemanagement.dto.response.PermissionResponse;
import com.recruitify.webapi.api.pages.admin.rolemanagement.dto.response.RoleResponse;
import com.recruitify.webapi.api.pages.admin.rolemanagement.service.IRoleManagementService;
import com.recruitify.webapi.common.vo.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Admin Role Management API.
 *
 * <p>Exposes the data the admin role-management UI needs to render and
 * persist the role/permission checkboxes:
 * <ul>
 *   <li>{@code GET    /api/v1/admin/roles}              → list all roles with their permissions</li>
 *   <li>{@code GET    /api/v1/admin/permissions}        → list the full permission catalog</li>
 *   <li>{@code GET    /api/v1/admin/roles/{roleId}}     → single role with its permissions</li>
 *   <li>{@code PUT    /api/v1/admin/roles/{roleId}/permissions} → replace the role's permission set</li>
 * </ul>
 *
 * <p>Every endpoint requires the {@code ROLE_MANAGE} permission. The
 * permission is granted to ADMIN only — HR and JOBSEEKER will receive
 * 403 if they call these endpoints.
 */
@RestController
@RequestMapping("/api/v1/admin/roles")
@RequiredArgsConstructor
@Tag(name = "Admin Role Management", description = "Admin APIs to view and edit role/permission assignments")
public class RoleManagementController {

    private final IRoleManagementService roleManagementService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    @Operation(
            summary = "List all roles",
            description = "Returns every role with its current permission set. Requires ROLE_MANAGE.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Roles retrieved"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Forbidden")
    })
    public ResponseEntity<ApiResponse<List<RoleResponse>>> listRoles() {
        List<RoleResponse> roles = roleManagementService.listRoles();
        return ResponseEntity.ok(ApiResponse.success(roles, "Roles retrieved successfully"));
    }

    @GetMapping("/permissions")
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    @Operation(
            summary = "List all permissions",
            description = "Returns the full permission catalog. Used by the UI to render checkbox labels.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<ApiResponse<List<PermissionResponse>>> listPermissions() {
        List<PermissionResponse> permissions = roleManagementService.listPermissions();
        return ResponseEntity.ok(ApiResponse.success(permissions, "Permissions retrieved successfully"));
    }

    @GetMapping("/{roleId}")
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    @Operation(
            summary = "Get a single role",
            description = "Returns a role with its current permission set.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<ApiResponse<RoleResponse>> getRole(
            @Parameter(description = "Role id", example = "1") @PathVariable Long roleId) {
        RoleResponse role = roleManagementService.getRole(roleId);
        return ResponseEntity.ok(ApiResponse.success(role, "Role retrieved successfully"));
    }

    @PutMapping("/{roleId}/permissions")
    @PreAuthorize("hasAuthority('ROLE_MANAGE')")
    @Operation(
            summary = "Replace role permissions",
            description = "Replaces the role's permission set with the supplied ids (PUT semantics). " +
                    "Send [] to revoke all permissions. Requires ROLE_MANAGE.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<ApiResponse<RoleResponse>> updateRolePermissions(
            @Parameter(description = "Role id", example = "1") @PathVariable Long roleId,
            @Valid @RequestBody UpdateRolePermissionsRequest request) {
        RoleResponse role = roleManagementService.updateRolePermissions(roleId, request);
        return ResponseEntity.ok(ApiResponse.success(role, "Role permissions updated successfully"));
    }
}
