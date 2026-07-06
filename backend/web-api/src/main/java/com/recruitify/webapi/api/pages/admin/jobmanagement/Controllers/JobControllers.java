package com.recruitify.webapi.api.pages.admin.jobmanagement.Controllers;

import com.recruitify.webapi.api.pages.admin.jobmanagement.Services.Impl.JobServicesImpl;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Request.JobRequest;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Response.JobListResponse;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Response.JobResponse;
import com.recruitify.webapi.common.vo.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
public class JobControllers {
    private final JobServicesImpl jobServicesImpl;

    @GetMapping
    public ResponseEntity<ApiResponse<JobListResponse>> listJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        JobListResponse jobs = jobServicesImpl.listJobs(keyword, status, page, size);
        return ResponseEntity.ok(ApiResponse.success(jobs, "Jobs retrieved successfully"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<JobResponse>> createJob(@RequestBody @Valid JobRequest request) {
        JobResponse job = jobServicesImpl.createJob(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(job, "Job created successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> findById(@PathVariable Long id) {
        JobResponse job = jobServicesImpl.findJobById(id);
        return ResponseEntity.ok(ApiResponse.success(job, "Job retrieved successfully"));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<JobResponse>> updateJob(@PathVariable Long id,
            @RequestBody @Valid JobRequest request) {
        JobResponse job = jobServicesImpl.updateJob(id, request);
        return ResponseEntity.ok(ApiResponse.success(job, "Job updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable Long id) {
        jobServicesImpl.deleteJob(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Job deleted successfully"));
    }
}