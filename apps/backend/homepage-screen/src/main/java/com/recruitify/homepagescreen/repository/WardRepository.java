package com.recruitify.homepagescreen.repository;

import com.recruitify.common.model.location.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WardRepository extends JpaRepository<Ward, String> {
}
