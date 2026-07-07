package com.recruitify.webapi.api.pages.admin.jobmanagement.dto.request;

import java.math.BigDecimal;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String responsibilities;

    @NotBlank
    private String requirement;

    private String benefit;
    private BigDecimal salary;
    private Boolean isHidden;

    @NotNull
    private Long companyId;
    private Long categoryId;
    private Long employmentTypeId;
    private Long experienceLevelId;
    private Long workApproachId;

    @NotBlank
    private String wardCode;

    private Set<Long> skillIds;
}