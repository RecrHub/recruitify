package com.recruitify.homepagescreen.service.impl;

import com.recruitify.homepagescreen.dto.response.CategoryResponse;
import com.recruitify.homepagescreen.dto.response.FeaturedJobResponse;
import com.recruitify.homepagescreen.dto.response.HomepageResponse;
import com.recruitify.homepagescreen.dto.response.StatsResponse;
import com.recruitify.homepagescreen.service.IHomepageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomepageServiceImpl implements IHomepageService {

    @Override
    public HomepageResponse getHomepageData() {
        List<FeaturedJobResponse> featuredJobs = getFeaturedJobs();
        List<CategoryResponse> categories = getCategories();
        StatsResponse stats = getStats();

        return HomepageResponse.builder()
                .featuredJobs(featuredJobs)
                .categories(categories)
                .stats(stats)
                .build();
    }

    private List<FeaturedJobResponse> getFeaturedJobs() {
        // TODO: Replace with actual database query - get top 6 latest jobs
        return List.of(
                FeaturedJobResponse.builder()
                        .id(1L)
                        .title("Senior Java Developer")
                        .companyName("Tech Corp")
                        .companyLogo("https://example.com/logo1.png")
                        .location("Ho Chi Minh City")
                        .employmentType("Full-time")
                        .salaryRange("$3000 - $5000")
                        .createdAt(LocalDateTime.now())
                        .build(),
                FeaturedJobResponse.builder()
                        .id(2L)
                        .title("Frontend Developer")
                        .companyName("Startup Inc")
                        .companyLogo("https://example.com/logo2.png")
                        .location("Hanoi")
                        .employmentType("Full-time")
                        .salaryRange("$2000 - $3500")
                        .createdAt(LocalDateTime.now().minusDays(1))
                        .build()
        );
    }

    private List<CategoryResponse> getCategories() {
        // TODO: Replace with actual database query - get categories with job counts
        return List.of(
                CategoryResponse.builder()
                        .id(1L)
                        .name("Technology")
                        .icon("💻")
                        .jobCount(150L)
                        .build(),
                CategoryResponse.builder()
                        .id(2L)
                        .name("Marketing")
                        .icon("📈")
                        .jobCount(80L)
                        .build(),
                CategoryResponse.builder()
                        .id(3L)
                        .name("Design")
                        .icon("🎨")
                        .jobCount(45L)
                        .build()
        );
    }

    private StatsResponse getStats() {
        // TODO: Replace with actual database query - get real statistics
        return StatsResponse.builder()
                .totalJobs(500L)
                .totalCompanies(120L)
                .totalUsers(5000L)
                .build();
    }
}
