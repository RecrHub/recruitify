package com.recruitify.webapi.api.pages.findjob.service;

import com.recruitify.webapi.api.pages.findjob.dto.request.JobSearchRequest;
import com.recruitify.webapi.api.pages.findjob.dto.response.FilterOptionsResponse;
import com.recruitify.webapi.api.pages.findjob.dto.response.FindJobPageResponse;

public interface IFindJobService {
    FindJobPageResponse findJobs(JobSearchRequest request);
    FilterOptionsResponse getFilterOptions();
}
