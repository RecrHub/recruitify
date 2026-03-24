package com.recruitify.webapi.api.pages.user.profile.vo;

import lombok.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperienceResponse {
    private Long id;
    private Long userProfileId;
    private String jobTitle;
    private String companyName;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
}
