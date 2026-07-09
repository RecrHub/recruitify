package com.recruitify.webapi.api.pages.admin.jobmanagement.service;

import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.request.JobRequest;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response.JobListResponse;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response.JobResponse;

public interface IJobService {
    JobListResponse listJobs(String keyword, String status, int page, int size);

    JobResponse createJob(JobRequest request);

    JobResponse findJobById(Long id);

    JobResponse updateJob(Long id, JobRequest request);

    void deleteJob(Long id);
}