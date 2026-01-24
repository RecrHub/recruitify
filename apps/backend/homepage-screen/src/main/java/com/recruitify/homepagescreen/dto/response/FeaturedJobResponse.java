package com.recruitify.homepagescreen.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeaturedJobResponse {
    private Long id;
    private String title;
    private String companyName;
    private String companyLogo;
    private String location;
    private String employmentType;
    private String salaryRange;
    private LocalDateTime createdAt;
}
