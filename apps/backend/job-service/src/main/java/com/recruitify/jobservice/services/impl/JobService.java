package com.recruitify.jobservice.services.impl;

import com.recruitify.jobservice.dtos.Response.JobResponse;
import com.recruitify.jobservice.dtos.Response.ResultPaginationResponse;
import com.recruitify.jobservice.mapper.JobMapper;
import com.recruitify.jobservice.model.Job;
import com.recruitify.jobservice.repository.IJobRepository;
import com.recruitify.jobservice.services.IJobService;
import com.recruitify.jobservice.utils.FormatResultPagaination;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

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
