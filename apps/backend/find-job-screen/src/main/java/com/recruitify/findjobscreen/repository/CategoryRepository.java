package com.recruitify.findjobscreen.repository;

import com.recruitify.common.model.catalog.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
