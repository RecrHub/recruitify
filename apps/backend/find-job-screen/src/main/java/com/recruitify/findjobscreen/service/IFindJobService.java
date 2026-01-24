package com.recruitify.findjobscreen.service;

import com.recruitify.findjobscreen.dto.request.JobSearchRequest;
import com.recruitify.findjobscreen.dto.response.FilterOptionsResponse;
import com.recruitify.findjobscreen.dto.response.FindJobPageResponse;

public interface IFindJobService {
    FindJobPageResponse findJobs(JobSearchRequest request);
    FilterOptionsResponse getFilterOptions();
}
