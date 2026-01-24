package com.recruitify.homepagescreen.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HomepageResponse {
    private List<FeaturedJobResponse> featuredJobs;
    private List<CategoryResponse> categories;
    private StatsResponse stats;
}
