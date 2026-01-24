package com.recruitify.homepagescreen.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employment_type")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmploymentType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
}
