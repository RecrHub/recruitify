package com.recruitify.homepagescreen.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "job")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    @Column(name = "is_hidden")
    private Boolean isHidden;

    @Column(name = "company_id")
    private Long companyId;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "employment_type_id")
    private Long employmentTypeId;

    @Column(name = "ward_code")
    private String wardCode;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "delete_at")
    private LocalDateTime deleteAt;
}
