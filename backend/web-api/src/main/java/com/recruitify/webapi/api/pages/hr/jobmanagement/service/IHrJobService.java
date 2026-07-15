package com.recruitify.webapi.api.pages.hr.jobmanagement.service;

import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.request.JobRequest;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response.JobListResponse;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response.JobResponse;

/**
 * Service contract for the HR-scoped job management module.
 *
 * <p>Every operation here is implicitly scoped to the calling HR user — the
 * caller passes {@code currentHr} (resolved from {@code Authentication.getName()}
 * in the controller) and the implementation enforces ownership before reading
 * or mutating a job. There is no {@code isAdmin} flag because this module is
 * not exposed to admins.
 */
public interface IHrJobService {

    /**
     * List jobs created by the calling HR user, with optional keyword/status
     * filters and pagination.
     */
    JobListResponse listMyJobs(String keyword, String status, String currentHr,
                               int page, int size);

    /**
     * Create a job owned by the calling HR user.
     */
    JobResponse createJob(JobRequest request, String currentHr);

    /**
     * Fetch a single job, but only if it was created by the calling HR user.
     * Throws {@link org.springframework.security.access.AccessDeniedException}
     * if the job belongs to another user.
     */
    JobResponse findMyJobById(Long id, String currentHr);

    /**
     * Update a job, but only if it was created by the calling HR user.
     */
    JobResponse updateJob(Long id, JobRequest request, String currentHr);

    /**
     * Soft-delete a job, but only if it was created by the calling HR user.
     */
    void deleteJob(Long id, String currentHr);

    /**
     * Analyze a job using an external AI service.
     */
    Object analyzeJob(Long id, String currentHr);
}
