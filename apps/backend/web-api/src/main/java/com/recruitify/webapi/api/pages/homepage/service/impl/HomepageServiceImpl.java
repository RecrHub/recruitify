package com.recruitify.webapi.api.pages.homepage.service.impl;

import com.recruitify.webapi.api.pages.homepage.dto.response.*;
import com.recruitify.webapi.api.pages.homepage.service.IHomepageService;
import com.recruitify.webapi.common.repository.CategoryRepository;
import com.recruitify.webapi.common.repository.CompanyRepository;
import com.recruitify.webapi.common.repository.JobRepository;
import com.recruitify.webapi.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomepageServiceImpl implements IHomepageService {

    private final JobRepository jobRepository;
    private final CategoryRepository categoryRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

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
        return jobRepository.findTopFeaturedJobs().stream().map(p -> FeaturedJobResponse.builder()
                .id(p.getId())
                .title(p.getTitle())
                .companyName(p.getCompanyName())
                .companyLogo(p.getCompanyLogo())
                .location(p.getLocation())
                .employmentType(p.getEmploymentType())
                .salaryRange(p.getSalaryRange() != null ? p.getSalaryRange().toString() : null)
                .createdAt(p.getCreatedAt())
                .build()
        )
        .collect(Collectors.toList());
    }

    private List<CategoryResponse> getCategories() {
        return categoryRepository.findCategoriesWithJobCount().stream().map(p -> CategoryResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .jobCount(p.getJobCount())
                .build()
        ).toList();
    }

    private StatsResponse getStats() {
        return StatsResponse.builder()
                .totalJobs(jobRepository.countActiveJobs())
                .totalCompanies(companyRepository.countActiveCompanies())
                .totalUsers(userRepository.countActiveUsers())
                .build();
    }
}
