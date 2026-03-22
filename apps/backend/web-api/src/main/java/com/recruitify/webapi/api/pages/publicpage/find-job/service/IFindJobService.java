package com.recruitify.webapi.api.pages.publicpage.findjob.service;

import com.recruitify.webapi.api.pages.publicpage.findjob.dto.request.JobSearchRequest;
import com.recruitify.webapi.api.pages.publicpage.findjob.dto.response.FilterOptionsResponse;
import com.recruitify.webapi.api.pages.publicpage.findjob.dto.response.FindJobPageResponse;

public interface IFindJobService {
    FindJobPageResponse findJobs(JobSearchRequest request);
    FilterOptionsResponse getFilterOptions();
}
