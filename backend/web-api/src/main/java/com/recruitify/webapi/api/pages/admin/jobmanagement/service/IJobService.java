package com.recruitify.webapi.api.pages.admin.jobmanagement.Services;

import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Request.JobRequest;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Response.JobListResponse;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Response.JobResponse;

public interface IJobServices {
    JobListResponse listJobs(String keyword, String status, int page, int size);

    JobResponse createJob(JobRequest request);

    JobResponse findJobById(Long id);

    JobResponse updateJob(Long id, JobRequest request);

    void deleteJob(Long id);
}