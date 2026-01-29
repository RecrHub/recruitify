package com.recruitify.findjobscreen.repository;

import com.recruitify.common.model.catalog.EmploymentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmploymentTypeRepository extends JpaRepository<EmploymentType, Long> {
}
