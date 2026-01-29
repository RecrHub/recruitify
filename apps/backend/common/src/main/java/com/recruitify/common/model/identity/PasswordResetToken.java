package com.recruitify.common.model.identity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.Instant;

@Entity
@Table(name = "password_reset_tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private Instant expiryDate;

    @Builder.Default
    private boolean used = false;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @Transient
    public boolean isExpired() {
        return Instant.now().isAfter(expiryDate);
    }

    @Transient
    public boolean isValid() {
        return !used && !isExpired();
    }
}
