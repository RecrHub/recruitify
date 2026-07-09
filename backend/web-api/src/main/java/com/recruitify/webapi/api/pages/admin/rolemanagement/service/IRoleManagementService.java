package com.recruitify.webapi.api.pages.admin.rolemanagement.service;

import com.recruitify.webapi.api.pages.admin.rolemanagement.dto.request.UpdateRolePermissionsRequest;
import com.recruitify.webapi.api.pages.admin.rolemanagement.dto.response.PermissionResponse;
import com.recruitify.webapi.api.pages.admin.rolemanagement.dto.response.RoleResponse;

import java.util.List;

public interface IRoleManagementService {

    /** All roles currently defined, each with its permission set. */
    List<RoleResponse> listRoles();

    /** All permissions currently defined (full catalog). */
    List<PermissionResponse> listPermissions();

    /** A single role with its current permission set. */
    RoleResponse getRole(Long roleId);

    /**
     * Replace the permission set for a role with the supplied {@code permissionIds}.
     *
     * @throws com.recruitify.webapi.common.exception.NotFoundException if the role
     *         or any referenced permission does not exist.
     */
    RoleResponse updateRolePermissions(Long roleId, UpdateRolePermissionsRequest request);
}
