package com.recruitify.webapi.common.repository;

import com.recruitify.webapi.api.pages.publicpage.homepage.dto.response.FeaturedJobProjection;
import com.recruitify.webapi.common.model.job.Job;
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

    @Query(value = """
                SELECT j.id as id,
                       j.title as title,
                       c.name as companyName,
                       c.image as companyLogo,
                       et.name as employmentType,
                       CONCAT(w.name, ', ', p.name) as location,
                       j.salary as salaryRange,
                       j.created_at as createdAt
                FROM job j
                JOIN company c ON j.company_id = c.id
                JOIN employment_type et on j.employment_type_id = et.id
                JOIN wards w ON j.ward_code = w.code
                JOIN provinces p ON w.province_code = p.code
                WHERE j.is_featured = true
                ORDER BY j.created_at DESC
                LIMIT 8
            """, nativeQuery = true)
    List<FeaturedJobProjection> findTopFeaturedJobs();

    @Query("SELECT COUNT(j) FROM Job j WHERE j.isHidden = false AND j.deleteAt IS NULL")
    Long countActiveJobs();

    @Query("SELECT COUNT(j) FROM Job j WHERE j.category.id = :categoryId AND j.isHidden = false AND j.deleteAt IS NULL")
    Long countJobsByCategory(@Param("categoryId") Long categoryId);

    @Query("SELECT j FROM Job j WHERE j.isHidden = false AND j.deleteAt IS NULL")
    Page<Job> findAllActiveJobs(Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.isHidden = false AND j.deleteAt IS NULL " +
            "AND (:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Job> searchJobs(@Param("keyword") String keyword, Pageable pageable);

    List<Job> findByCompany_Id(Long companyId);

    List<Job> findByCategory_Id(Long categoryId);
}
