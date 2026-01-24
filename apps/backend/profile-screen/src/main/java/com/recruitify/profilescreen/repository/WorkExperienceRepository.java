package com.recruitify.profilescreen.repository;

import com.recruitify.profilescreen.model.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {
    List<WorkExperience> findByUserProfileIdOrderByStartDateDesc(Long userProfileId);
    Optional<WorkExperience> findByIdAndUserProfileId(Long id, Long userProfileId);
}
