package com.recruitify.webapi.api.pages.publicpage.homepage.dto.response;

import java.time.LocalDateTime;

public interface FeaturedJobProjection {
    Long getId();
    String getTitle();
    String getCompanyName();
    String getCompanyLogo();
    String getLocation();
    String getSalaryRange();
    LocalDateTime getCreatedAt();
    String getEmploymentType();
}
