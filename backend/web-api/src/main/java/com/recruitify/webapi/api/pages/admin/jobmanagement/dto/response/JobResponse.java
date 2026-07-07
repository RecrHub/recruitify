package com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String responsibilities;
    private String requirement;
    private String benefit;
    private Long minSalary;
    private Long maxSalary;
    private Boolean isHidden;

    private Long companyId;
    private String companyName;
    private Long categoryId;
    private String categoryName;
    private Long employmentTypeId;
    private String employmentTypeName;
    private Long experienceLevelId;
    private String experienceLevelName;
    private Long workApproachId;
    private String workApproachName;
    private String wardCode;
    private String wardName;
    private String status;

    private Set<String> skillsName;

    private int applied;

    private int view;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deleteAt;
}