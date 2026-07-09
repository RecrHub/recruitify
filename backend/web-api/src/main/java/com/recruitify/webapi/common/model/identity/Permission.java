package com.recruitify.webapi.common.model.identity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * Fine-grained authority granted to a {@link Role}.
 *
 * <p>A permission represents a single capability in the system
 * (e.g. {@code JOB_CREATE}, {@code ACCOUNT_CREATE_HR}). Authorities
 * exposed to Spring Security are derived from {@link #getName()} —
 * this is the value {@code hasAuthority("JOB_CREATE")} matches against.
 *
 * <p>Permissions are intentionally decoupled from roles: a role is a
 * named collection of permissions, and a user is granted a role.
 * This keeps the authorization model composable and auditable.
 */
@Entity
@Table(name = "permissions", uniqueConstraints = {
        @UniqueConstraint(name = "uk_permissions_name", columnNames = "name")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Permission identifier. Stored verbatim and exposed as a Spring
     * Security authority (no {@code ROLE_} prefix).
     */
    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP")
    private Instant createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    private Instant updatedAt;

    @Column(length = 100)
    private String createdBy;

    @Column(length = 100)
    private String updatedBy;

    @PrePersist
    protected void onCreate() {
        Instant now = Instant.now();
        if (createdAt == null) createdAt = now;
        if (updatedAt == null) updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
}
