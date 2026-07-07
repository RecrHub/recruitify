package com.recruitify.webapi.common.repository;

import com.recruitify.webapi.common.model.identity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);

    /**
     * Deletes every row from {@code role_permissions} for the given role.
     * Used by the seeder for a deterministic "force replace" of the role's
     * permission set — bypasses Hibernate dirty checking on the EAGER
     * {@code permissions} collection, which has been observed to silently
     * skip join-row inserts on already-existing roles.
     */
    @Modifying
    @Query(value = "DELETE FROM role_permissions WHERE role_id = :roleId", nativeQuery = true)
    int deleteRolePermissions(@Param("roleId") Long roleId);

    /**
     * Inserts a single (role, permission) row. Idempotent thanks to
     * {@code ON CONFLICT DO NOTHING} so re-running the seeder is safe.
     */
    @Modifying
    @Query(value = "INSERT INTO role_permissions (role_id, permission_id) " +
            "VALUES (:roleId, :permissionId) ON CONFLICT DO NOTHING", nativeQuery = true)
    int insertRolePermission(@Param("roleId") Long roleId, @Param("permissionId") Long permissionId);
}
