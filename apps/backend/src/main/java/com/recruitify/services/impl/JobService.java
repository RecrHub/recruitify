package com.recruitify.services.impl;

import com.recruitify.dtos.Response.JobResponse;
import com.recruitify.dtos.Response.ResultPaginationResponse;
import com.recruitify.mapper.JobMapper;
import com.recruitify.model.Job;
import com.recruitify.repository.IJobRepository;
import com.recruitify.services.IJobService;
import com.recruitify.utils.FormatResultPagaination;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
public class JobService implements IJobService {
    private final IJobRepository jobRepository;
    private final JobMapper jobMapper;

    public JobService(IJobRepository jobRepository, JobMapper jobMapper) {
        this.jobRepository = jobRepository;
        this.jobMapper = jobMapper;
    }


    @Override
    public ResultPaginationResponse fetchAllJob(
            String keyword,
            Long categoryId,
            BigDecimal minSalary,
            BigDecimal maxSalary,
            Pageable pageable) {
        log.info("Fetching jobs - keyword: {}, categoryId: {}, minSalary: {}, maxSalary: {}, page: {}, size: {}",
                keyword, categoryId, minSalary, maxSalary,
                pageable.getPageNumber(), pageable.getPageSize());
        Page<Job> jobPage = jobRepository.findByFilters(
                keyword,
                categoryId,
                minSalary,
                maxSalary,
                pageable
        );
        log.info("Found {} jobs (page {} of {})",
                jobPage.getNumberOfElements(),
                jobPage.getNumber() + 1,
                jobPage.getTotalPages());
        Page<JobResponse> jobResponsePage = jobPage.map(jobMapper::toResponseJob);
        ResultPaginationResponse response = FormatResultPagaination.createPaginationResponse(jobResponsePage);
        return response;
    }
}
