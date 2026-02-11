package com.recruitify.webapi.common.repository;

import com.recruitify.webapi.common.model.catalog.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
}
