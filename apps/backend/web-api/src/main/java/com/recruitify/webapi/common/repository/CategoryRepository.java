package com.recruitify.webapi.common.repository;

import com.recruitify.webapi.api.pages.publicpage.homepage.dto.response.CategoryProjection;
import com.recruitify.webapi.common.model.catalog.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.deletedAt IS NULL")
    List<Category> findAllActive();

    @Query(value = """
            SELECT c.id as id,
                   c.name as name,
                   COUNT(j.id) as jobCount
            FROM category c
            LEFT JOIN job j ON j.category_id = c.id AND j.is_hidden = false AND j.delete_at IS NULL
            WHERE c.deleted_at IS NULL
            GROUP BY c.id, c.name
            ORDER BY jobCount DESC
            """, nativeQuery = true)
    List<CategoryProjection> findCategoriesWithJobCount();


    boolean existsByNameIgnoreCase(String name);
}
