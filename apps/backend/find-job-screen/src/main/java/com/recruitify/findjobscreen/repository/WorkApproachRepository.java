package com.recruitify.findjobscreen.repository;

import com.recruitify.common.model.catalog.WorkApproach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkApproachRepository extends JpaRepository<WorkApproach, Long> {
}
