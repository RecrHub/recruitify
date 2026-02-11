package com.recruitify.webapi.common.repository;

import com.recruitify.webapi.common.model.job.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    @Query("SELECT COUNT(c) FROM Company c WHERE c.deleteAt IS NULL")
    Long countActiveCompanies();
}
