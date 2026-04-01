package com.recruitify.webapi.common.repository;

import com.recruitify.webapi.common.model.catalog.ExperienceLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceLevelRepository extends JpaRepository<ExperienceLevel, Long> {
}
