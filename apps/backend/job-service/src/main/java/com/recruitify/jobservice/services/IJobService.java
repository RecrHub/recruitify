package com.recruitify.jobservice.services;

import com.recruitify.jobservice.dtos.Response.ResultPaginationResponse;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;

public interface IJobService {
    ResultPaginationResponse fetchAllJob(String keyword,
                                         Long categoryId,
                                         BigDecimal minSalary,
                                         BigDecimal maxSalary,
                                         Pageable pageable);
}
