package com.recruitify.profilescreen.repository;

import com.recruitify.profilescreen.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findByUserProfileIdOrderByStartDateDesc(Long userProfileId);
    Optional<Education> findByIdAndUserProfileId(Long id, Long userProfileId);
}
