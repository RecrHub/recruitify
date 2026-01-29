package com.recruitify.common.model.profile;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "work_experiences")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_profile_id", nullable = false)
    private Long userProfileId;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    private String location;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile_id", insertable = false, updatable = false)
    private Profile profile;
}
