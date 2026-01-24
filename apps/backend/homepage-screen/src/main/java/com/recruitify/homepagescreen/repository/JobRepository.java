package com.recruitify.homepagescreen.repository;

import com.recruitify.homepagescreen.model.Job;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("SELECT j FROM Job j WHERE j.isHidden = false AND j.deleteAt IS NULL ORDER BY j.createdAt DESC")
    List<Job> findFeaturedJobs(Pageable pageable);

    @Query("SELECT COUNT(j) FROM Job j WHERE j.isHidden = false AND j.deleteAt IS NULL")
    Long countActiveJobs();

    @Query("SELECT COUNT(j) FROM Job j WHERE j.categoryId = :categoryId AND j.isHidden = false AND j.deleteAt IS NULL")
    Long countJobsByCategory(Long categoryId);
}
