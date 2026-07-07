package com.recruitify.webapi.common.config;

import com.recruitify.webapi.common.model.identity.Permission;
import com.recruitify.webapi.common.model.identity.Role;
import com.recruitify.webapi.common.repository.PermissionRepository;
import com.recruitify.webapi.common.repository.RoleRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Seeds the RBAC catalog: the permission rows, the default roles, and the
 * role/permission links.
 *
 * <p>Implemented as a {@code @Service} (not as a {@code @Bean} factory method
 * returning a lambda) so the {@code @Transactional} annotation is honoured
 * via the Spring proxy.
 *
 * <p>Role/permission links are written through native {@code @Modifying}
 * queries (see {@link RoleRepository#deleteRolePermissions(Long)} and
 * {@link RoleRepository#insertRolePermission(Long, Long)}) instead of mutating
 * the EAGER {@code permissions} collection on the {@link Role} entity. The
 * dirty-checking path on a {@code FetchType.EAGER} {@code @ManyToMany} has
 * been observed to silently skip join-row inserts on already-existing roles,
 * leaving them with empty permission sets and {@code @PreAuthorize} denying
 * every authenticated request. The native-query path is deterministic.
 *
 * <p>Idempotent: re-running is safe — permissions and roles are upserted, and
 * join rows are deleted then re-inserted with {@code ON CONFLICT DO NOTHING}.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RbacCatalogSeeder {

    /**
     * Permission catalog used to bootstrap RBAC. Insertion order is preserved
     * so seeded authorities are stable across runs.
     */
    public static final Map<String, String> PERMISSION_CATALOG = new LinkedHashMap<>();
    static {
        // Account management (admin only)
        PERMISSION_CATALOG.put("ACCOUNT_CREATE_HR", "Create HR accounts");
        PERMISSION_CATALOG.put("ACCOUNT_VIEW", "View accounts");
        PERMISSION_CATALOG.put("ACCOUNT_UPDATE", "Update accounts");
        PERMISSION_CATALOG.put("ACCOUNT_DELETE", "Delete accounts");

        // Job management (admin + hr)
        PERMISSION_CATALOG.put("JOB_CREATE", "Create a job posting");
        PERMISSION_CATALOG.put("JOB_UPDATE", "Update a job posting");
        PERMISSION_CATALOG.put("JOB_DELETE", "Delete a job posting");
        PERMISSION_CATALOG.put("JOB_VIEW", "View job postings");

        // Company management (admin only)
        PERMISSION_CATALOG.put("COMPANY_CREATE", "Create a company");
        PERMISSION_CATALOG.put("COMPANY_UPDATE", "Update a company");
        PERMISSION_CATALOG.put("COMPANY_DELETE", "Delete a company");
        PERMISSION_CATALOG.put("COMPANY_VIEW", "View companies");

        // Role & permission management (admin only)
        PERMISSION_CATALOG.put("ROLE_MANAGE", "Manage roles and permissions");
    }

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Idempotently upsert permissions, default roles, and role/permission links.
     */
    @Transactional
    public void seed() {
        log.info("Seeding RBAC catalog: {} permissions, 3 default roles", PERMISSION_CATALOG.size());

        // 1) Upsert permission rows. Use a fresh entityManager.clear() before
        //    touching roles so the cached role entity doesn't shadow the new
        //    permission rows that get inserted by upsertRoleWithPermissions.
        Map<String, Permission> permissionsByName = new LinkedHashMap<>();
        for (Map.Entry<String, String> entry : PERMISSION_CATALOG.entrySet()) {
            Permission permission = permissionRepository.findByName(entry.getKey())
                    .orElseGet(() -> permissionRepository.save(buildPermission(entry.getKey(), entry.getValue())));
            permissionsByName.put(entry.getKey(), permission);
        }
        // Clear the persistence context so role lookups below fetch fresh
        // state and any cached Permission entities don't get reused.
        entityManager.flush();
        entityManager.clear();

        // 2) Upsert roles, then force-replace their permission links via the
        //    native @Modifying queries — bypasses Hibernate dirty checking on
        //    the EAGER @ManyToMany collection entirely.
        upsertRoleWithPermissions(
                "ROLE_ADMIN",
                List.of(
                        "ACCOUNT_CREATE_HR", "ACCOUNT_VIEW", "ACCOUNT_UPDATE", "ACCOUNT_DELETE",
                        "JOB_CREATE", "JOB_UPDATE", "JOB_DELETE", "JOB_VIEW",
                        "COMPANY_CREATE", "COMPANY_UPDATE", "COMPANY_DELETE", "COMPANY_VIEW",
                        "ROLE_MANAGE"),
                permissionsByName);

        upsertRoleWithPermissions(
                "ROLE_HR",
                List.of("JOB_CREATE", "JOB_UPDATE", "JOB_DELETE", "JOB_VIEW"),
                permissionsByName);

        upsertRoleWithPermissions(
                "ROLE_JOBSEEKER",
                List.of("JOB_VIEW", "COMPANY_VIEW"),
                permissionsByName);

        log.info("RBAC catalog seeded.");
    }

    /**
     * Ensures the role exists, then replaces its permission links using
     * native queries. Logs the before/after state for diagnostics.
     */
    private Role upsertRoleWithPermissions(
            String roleName,
            List<String> permissionNames,
            Map<String, Permission> permissionsByName) {

        Role role = roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    Role created = roleRepository.save(buildRole(roleName));
                    log.info("Created new role '{}'", roleName);
                    return created;
                });

        Long roleId = role.getId();
        int before = roleRepository.deleteRolePermissions(roleId);

        int inserted = 0;
        for (String permName : permissionNames) {
            Permission permission = permissionsByName.get(permName);
            if (permission != null) {
                inserted += roleRepository.insertRolePermission(roleId, permission.getId());
            }
        }
        log.info("Role '{}' (id={}) permission links replaced: {} removed, {} inserted (expected {})",
                roleName, roleId, before, inserted, permissionNames.size());

        return role;
    }

    private Role buildRole(String name) {
        return Role.builder()
                .name(name)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    private Permission buildPermission(String name, String description) {
        return Permission.builder()
                .name(name)
                .description(description)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }
}
