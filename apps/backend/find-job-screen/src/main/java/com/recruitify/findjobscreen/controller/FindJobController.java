package com.recruitify.findjobscreen.controller;

import com.recruitify.findjobscreen.dto.request.JobSearchRequest;
import com.recruitify.findjobscreen.dto.response.FilterOptionsResponse;
import com.recruitify.findjobscreen.dto.response.FindJobPageResponse;
import com.recruitify.findjobscreen.service.IFindJobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/find-job")
@RequiredArgsConstructor
@Tag(name = "Find Job", description = "APIs for job search functionality")
public class FindJobController {

    private final IFindJobService findJobService;

    @GetMapping
    @Operation(summary = "Search jobs", description = "Get jobs with filters and pagination")
    public ResponseEntity<FindJobPageResponse> findJobs(
            @Parameter(description = "Search keyword") @RequestParam(required = false) String keyword,
            @Parameter(description = "Category ID") @RequestParam(required = false) Long categoryId,
            @Parameter(description = "Province ID") @RequestParam(required = false) Long provinceId,
            @Parameter(description = "Employment type") @RequestParam(required = false) String employmentType,
            @Parameter(description = "Work approach") @RequestParam(required = false) String workApproach,
            @Parameter(description = "Experience level") @RequestParam(required = false) String experienceLevel,
            @Parameter(description = "Minimum salary") @RequestParam(required = false) Long salaryMin,
            @Parameter(description = "Maximum salary") @RequestParam(required = false) Long salaryMax,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") Integer page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") Integer size,
            @Parameter(description = "Sort field and direction") @RequestParam(defaultValue = "postedAt,desc") String sort
    ) {
        JobSearchRequest request = JobSearchRequest.builder()
                .keyword(keyword)
                .categoryId(categoryId)
                .provinceId(provinceId)
                .employmentType(employmentType)
                .workApproach(workApproach)
                .experienceLevel(experienceLevel)
                .salaryMin(salaryMin)
                .salaryMax(salaryMax)
                .page(page)
                .size(size)
                .sort(sort)
                .build();

        return ResponseEntity.ok(findJobService.findJobs(request));
    }

    @GetMapping("/filters")
    @Operation(summary = "Get filter options", description = "Get all available filter options for job search")
    public ResponseEntity<FilterOptionsResponse> getFilterOptions() {
        return ResponseEntity.ok(findJobService.getFilterOptions());
    }
}
