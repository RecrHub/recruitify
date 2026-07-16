package com.recruitify.webapi.api.pages.hr.jobmanagement.controller;

import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.request.JobRequest;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response.JobListResponse;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response.JobResponse;
import com.recruitify.webapi.api.pages.hr.jobmanagement.service.IHrJobService;
import com.recruitify.webapi.common.vo.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * HR-scoped job management REST API.
 *
 * <p>Base path {@code /api/v1/hr/jobs} is mounted under {@code /api/v1/hr/**}
 * which is already permitted (in {@code SecurityConfig}) for the
 * {@code /api/v1/hr/auth/**} login path — but the endpoints below additionally
 * require a valid JWT carrying the {@code ROLE_HR} authority plus the
 * {@code JOB_*} permission, enforced by {@code @PreAuthorize}.
 *
 * <p>The controller never accepts a {@code createdBy} parameter: the calling
 * HR user is derived from {@code Authentication.getName()} (the JWT subject),
 * and {@link IHrJobService} scopes every read/write to that user.
 */
@RestController("hrJobController")
@RequestMapping("/api/v1/hr/jobs")
@RequiredArgsConstructor
@Tag(name = "HR Job Management", description = "Job management APIs scoped to the calling HR user")
public class HrJobController {

    private final IHrJobService hrJobService;

    @GetMapping
    @PreAuthorize("hasAuthority('JOB_VIEW_HR')")
    @Operation(
            summary = "List my jobs",
            description = "Return a paginated list of jobs created by the calling HR user. "
                    + "Filters: keyword (matches title/description), status (ACTIVE | DRAFT | CLOSED)."
    )
    public ResponseEntity<ApiResponse<JobListResponse>> listMyJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        String currentHr = authentication.getName();
        JobListResponse jobs = hrJobService.listMyJobs(keyword, status, currentHr, page, size);
        return ResponseEntity.ok(ApiResponse.success(jobs, "Jobs retrieved successfully"));
    }

    @PostMapping
    @PreAuthorize("hasRole('HR') and hasAuthority('JOB_CREATE')")
    @Operation(
            summary = "Create a job",
            description = "Create a job owned by the calling HR user. createdBy is set from the JWT."
    )
    public ResponseEntity<ApiResponse<JobResponse>> createJob(
            @RequestBody @Valid JobRequest request,
            Authentication authentication) {
        String currentHr = authentication.getName();
        JobResponse job = hrJobService.createJob(request, currentHr);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(job, "Job created successfully"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('JOB_VIEW_HR')")
    @Operation(
            summary = "Get one of my jobs",
            description = "Fetch a job by id. Returns 403 if the job was not created by the calling HR user."
    )
    public ResponseEntity<ApiResponse<JobResponse>> getMyJob(
            @PathVariable Long id,
            Authentication authentication) {
        String currentHr = authentication.getName();
        JobResponse job = hrJobService.findMyJobById(id, currentHr);
        return ResponseEntity.ok(ApiResponse.success(job, "Job retrieved successfully"));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('HR') and hasAuthority('JOB_UPDATE')")
    @Operation(
            summary = "Update one of my jobs",
            description = "Update a job by id. Returns 403 if the job was not created by the calling HR user."
    )
    public ResponseEntity<ApiResponse<JobResponse>> updateMyJob(
            @PathVariable Long id,
            @RequestBody @Valid JobRequest request,
            Authentication authentication) {
        String currentHr = authentication.getName();
        JobResponse job = hrJobService.updateJob(id, request, currentHr);
        return ResponseEntity.ok(ApiResponse.success(job, "Job updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('HR') and hasAuthority('JOB_DELETE')")
    @Operation(
            summary = "Delete one of my jobs",
            description = "Soft-delete a job by id. Returns 403 if the job was not created by the calling HR user."
    )
    public ResponseEntity<ApiResponse<Void>> deleteMyJob(
            @PathVariable Long id,
            Authentication authentication) {
        String currentHr = authentication.getName();
        hrJobService.deleteJob(id, currentHr);
        return ResponseEntity.ok(ApiResponse.success(null, "Job deleted successfully"));
    }

    @PostMapping("/{id}/analyze")
    @PreAuthorize("hasAuthority('JOB_VIEW_HR')")
    @Operation(
            summary = "Analyze a job",
            description = "Analyzes a job by calling the external AI service. Returns 403 if the job was not created by the calling HR user."
    )
    public ResponseEntity<ApiResponse<Object>> analyzeJob(
            @PathVariable Long id,
            Authentication authentication) {
        String currentHr = authentication.getName();
        Object result = hrJobService.analyzeJob(id, currentHr);
        return ResponseEntity.ok(ApiResponse.success(result, "Job analyzed successfully"));
    }
}
