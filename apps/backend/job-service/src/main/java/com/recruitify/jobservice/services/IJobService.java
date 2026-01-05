package com.recruitify.services;

import com.recruitify.dtos.Response.JobResponse;
import com.recruitify.dtos.Response.ResultPaginationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface IJobService {
    ResultPaginationResponse fetchAllJob(String keyword,
                                         Long categoryId,
                                         BigDecimal minSalary,
                                         BigDecimal maxSalary,
                                         Pageable pageable);
}
