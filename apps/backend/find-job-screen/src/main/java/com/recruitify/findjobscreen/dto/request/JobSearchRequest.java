package com.recruitify.findjobscreen.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobSearchRequest {
    private String keyword;
    private Long categoryId;
    private Long provinceId;
    private String employmentType;
    private String workApproach;
    private String experienceLevel;
    private Long salaryMin;
    private Long salaryMax;
    @Builder.Default
    private Integer page = 0;
    @Builder.Default
    private Integer size = 10;
    @Builder.Default
    private String sort = "postedAt,desc";
}
