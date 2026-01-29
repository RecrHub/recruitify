package com.recruitify.findjobscreen.repository;

import com.recruitify.common.model.job.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {
    
    @Query("SELECT j FROM Job j WHERE j.isHidden = false AND j.deleteAt IS NULL")
    Page<Job> findAllActiveJobs(Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.isHidden = false AND j.deleteAt IS NULL " +
           "AND (:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Job> searchJobs(@Param("keyword") String keyword, Pageable pageable);

    List<Job> findByCompanyId(Long companyId);
    
    List<Job> findByCategoryId(Long categoryId);
}
