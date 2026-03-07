package com.recruitify.webapi.common.repository;

import com.recruitify.webapi.api.pages.homepage.dto.response.FeatureCompanyProjection;
import com.recruitify.webapi.common.model.job.Company;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    @Query("SELECT COUNT(c) FROM Company c WHERE c.deleteAt IS NULL")
    Long countActiveCompanies();
    @Query(value = "SELECT id ,name ,image ,overview , is_featured FROM company WHERE is_featured = true" , nativeQuery = true)
    List<FeatureCompanyProjection> findFeatureCompany();
}
