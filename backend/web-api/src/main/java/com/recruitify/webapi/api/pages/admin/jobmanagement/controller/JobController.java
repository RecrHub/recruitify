package com.recruitify.webapi.api.pages.admin.jobmanagement.controller;

import com.recruitify.webapi.api.pages.admin.jobmanagement.service.impl.JobServiceImpl;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.request.JobRequest;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response.JobListResponse;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response.JobResponse;
import com.recruitify.webapi.common.vo.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobServiceImpl jobServiceImpl;

    @GetMapping
    @PreAuthorize("hasAuthority('JOB_VIEW')")
    public ResponseEntity<ApiResponse<JobListResponse>> listJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String createdBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        String currentUsername = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
        JobListResponse jobs = jobServiceImpl.listJobs(
                keyword, status, createdBy, currentUsername, isAdmin, page, size);
        return ResponseEntity.ok(ApiResponse.success(jobs, "Jobs retrieved successfully"));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('JOB_CREATE', 'ADMIN_VIEW_ALL').")
    public ResponseEntity<ApiResponse<JobResponse>> createJob(@RequestBody @Valid JobRequest request) {
        JobResponse job = jobServiceImpl.createJob(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(job, "Job created successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> findById(@PathVariable Long id) {
        JobResponse job = jobServiceImpl.findJobById(id);
        return ResponseEntity.ok(ApiResponse.success(job, "Job retrieved successfully"));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('JOB_UPDATE')")
    public ResponseEntity<ApiResponse<JobResponse>> updateJob(
            @PathVariable Long id,
            @RequestBody @Valid JobRequest request) {
        JobResponse job = jobServiceImpl.updateJob(id, request);
        return ResponseEntity.ok(ApiResponse.success(job, "Job updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('JOB_DELETE')")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable Long id) {
        jobServiceImpl.deleteJob(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Job deleted successfully"));
    }
}