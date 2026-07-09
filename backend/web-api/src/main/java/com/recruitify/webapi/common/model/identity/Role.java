package com.recruitify.webapi.common.model.identity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
    private Set<User> users;

    /**
     * Fine-grained permissions granted to this role. Loaded eagerly so
     * that {@code hasAuthority("...")} checks see the full authority set
     * after a single {@code UserDetailsImpl.build(user)} call.
     */
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "role_permissions",
            joinColumns = @JoinColumn(name = "role_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "permission_id", nullable = false),
            uniqueConstraints = @UniqueConstraint(
                    name = "uk_role_permissions_role_perm",
                    columnNames = {"role_id", "permission_id"})
    )
    @Builder.Default
    private Set<Permission> permissions = new HashSet<>();

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
        if (createdAt == null) createdAt = Instant.now();
        if (updatedAt == null) updatedAt = Instant.now();
        if (permissions == null) permissions = new HashSet<>();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }

    /**
     * Add a permission while keeping the in-memory collection and the
     * (later-flushed) join table in sync. Safe to call repeatedly.
     */
    public void addPermission(Permission permission) {
        if (permission == null) return;
        if (permissions == null) permissions = new HashSet<>();
        permissions.add(permission);
    }

    public void removePermission(Permission permission) {
        if (permission == null || permissions == null) return;
        permissions.remove(permission);
    }
}
