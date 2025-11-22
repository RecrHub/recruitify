package com.recruitify.repository;

import com.recruitify.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;

public interface IJobRepository extends JpaRepository<Job,Long>, JpaSpecificationExecutor<Job> {
    @Query("SELECT j FROM job j " +
            "WHERE " +
            //Keyword search in title or description
            "(:keyword IS NULL OR :keyword = '' OR " +
            " LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            " LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            //Category filter
            "AND (:categoryId IS NULL OR j.categoryId = :categoryId) " +
            //Salary range filter
            "AND (:minSalary IS NULL OR j.salary >= :minSalary) " +
            "AND (:maxSalary IS NULL OR j.salary <= :maxSalary)")
    Page<Job> findByFilters(
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId,
            @Param("minSalary") BigDecimal minSalary,
            @Param("maxSalary") BigDecimal maxSalary,
            Pageable pageable
    );
}
