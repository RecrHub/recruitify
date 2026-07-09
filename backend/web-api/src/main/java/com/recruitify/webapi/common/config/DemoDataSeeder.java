package com.recruitify.webapi.common.config;

import com.recruitify.webapi.common.model.catalog.Category;
import com.recruitify.webapi.common.model.catalog.EmploymentType;
import com.recruitify.webapi.common.model.catalog.ExperienceLevel;
import com.recruitify.webapi.common.model.catalog.Skill;
import com.recruitify.webapi.common.model.catalog.WorkApproach;
import com.recruitify.webapi.common.model.identity.Role;
import com.recruitify.webapi.common.model.identity.User;
import com.recruitify.webapi.common.model.job.Company;
import com.recruitify.webapi.common.model.location.AdministrativeUnit;
import com.recruitify.webapi.common.model.location.Province;
import com.recruitify.webapi.common.model.location.Ward;
import com.recruitify.webapi.common.repository.AdministrativeUnitRepository;
import com.recruitify.webapi.common.repository.CategoryRepository;
import com.recruitify.webapi.common.repository.CompanyRepository;
import com.recruitify.webapi.common.repository.EmploymentTypeRepository;
import com.recruitify.webapi.common.repository.ExperienceLevelRepository;
import com.recruitify.webapi.common.repository.RoleRepository;
import com.recruitify.webapi.common.repository.SkillRepository;
import com.recruitify.webapi.common.repository.UserRepository;
import com.recruitify.webapi.common.repository.WardRepository;
import com.recruitify.webapi.common.repository.WorkApproachRepository;
import com.recruitify.webapi.common.repository.ProvinceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;

/**
 * Seeds demo data: a known super-admin and HR account, the catalog lookup
 * rows, and a tiny Vietnam location fixture. Active only on the {@code local}
 * and {@code test} profiles so demo passwords never leak into higher
 * environments.
 *
 * <p>Implemented as a {@code @Service} so the {@code @Transactional}
 * annotation is honoured via the Spring proxy. See {@link RbacCatalogSeeder}
 * for the same rationale.
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Profile({"local", "test"})
public class DemoDataSeeder {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final EmploymentTypeRepository employmentTypeRepository;
    private final ExperienceLevelRepository experienceLevelRepository;
    private final WorkApproachRepository workApproachRepository;
    private final SkillRepository skillRepository;
    private final CompanyRepository companyRepository;
    private final ProvinceRepository provinceRepository;
    private final AdministrativeUnitRepository administrativeUnitRepository;
    private final WardRepository wardRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void seed() {
        log.info("Seeding demo data...");

        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new IllegalStateException(
                        "ROLE_ADMIN missing — RbacCatalogSeeder must run before DemoDataSeeder"));
        Role hrRole = roleRepository.findByName("ROLE_HR")
                .orElseThrow(() -> new IllegalStateException(
                        "ROLE_HR missing — RbacCatalogSeeder must run before DemoDataSeeder"));

        userRepository.findByEmail("super_user@gmail.com").orElseGet(() -> {
            User admin = User.builder()
                    .username("super_user")
                    .email("super_user@gmail.com")
                    .passwordHash(passwordEncoder.encode("Admin123!"))
                    .role(adminRole)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .isActive(true)
                    .build();
            return userRepository.save(admin);
        });

        userRepository.findByEmail("hr_user@gmail.com").orElseGet(() -> {
            User hr = User.builder()
                    .username("hr_user")
                    .email("hr_user@gmail.com")
                    .passwordHash(passwordEncoder.encode("Hr123456!"))
                    .role(hrRole)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .isActive(true)
                    .build();
            return userRepository.save(hr);
        });

        categoryRepository.findById(1L).orElseGet(() -> categoryRepository.save(buildCategory("Information Technology")));
        employmentTypeRepository.findById(1L).orElseGet(() -> employmentTypeRepository.save(buildEmploymentType("Full-time")));
        experienceLevelRepository.findById(1L).orElseGet(() -> experienceLevelRepository.save(buildExperienceLevel("Senior")));
        workApproachRepository.findById(1L).orElseGet(() -> workApproachRepository.save(buildWorkApproach("Remote")));
        skillRepository.findById(1L).orElseGet(() -> skillRepository.save(buildSkill("Java")));

        companyRepository.findById(1L).orElseGet(() -> companyRepository.save(buildCompany()));

        provinceRepository.findById("01").orElseGet(() -> provinceRepository.save(buildProvince()));
        AdministrativeUnit administrativeUnit = administrativeUnitRepository.findById(1)
                .orElseGet(() -> administrativeUnitRepository.save(buildAdministrativeUnit()));
        Province province = provinceRepository.findById("01").orElseThrow();
        wardRepository.findById("00001").orElseGet(() -> wardRepository.save(buildWard(province, administrativeUnit)));

        log.info("Demo data seeded.");
    }

    private Category buildCategory(String name) {
        return Category.builder()
                .name(name)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    private EmploymentType buildEmploymentType(String name) {
        return EmploymentType.builder()
                .name(name)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    private ExperienceLevel buildExperienceLevel(String name) {
        return ExperienceLevel.builder()
                .name(name)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    private WorkApproach buildWorkApproach(String name) {
        return WorkApproach.builder()
                .name(name)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    private Skill buildSkill(String name) {
        return Skill.builder()
                .name(name)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    private Company buildCompany() {
        return Company.builder()
                .name("Recruitify Demo Company")
                .industry("Technology")
                .companySize("51-200")
                .companyType("Product")
                .founderYear(2020)
                .overview("Seed company for local testing")
                .phone("0900000000")
                .createdAt(LocalDateTime.now())
                .build();
    }

    private Province buildProvince() {
        return Province.builder()
                .code("01")
                .name("Ha Noi")
                .fullName("Thành phố Hà Nội")
                .nameEn("Ha Noi")
                .fullNameEn("Ha Noi City")
                .codeName("ha_noi")
                .type("city")
                .slug("ha-noi")
                .nameWithType("Thành phố Hà Nội")
                .build();
    }

    private AdministrativeUnit buildAdministrativeUnit() {
        return AdministrativeUnit.builder()
                .id(1)
                .fullName("Phường")
                .fullNameEn("Ward")
                .shortName("Phường")
                .shortNameEn("Ward")
                .codeName("phuong")
                .codeNameEn("ward")
                .build();
    }

    private Ward buildWard(Province province, AdministrativeUnit administrativeUnit) {
        return Ward.builder()
                .code("00001")
                .name("Phuong Test")
                .fullName("Phường Test")
                .nameEn("Test Ward")
                .fullNameEn("Test Ward")
                .codeName("phuong_test")
                .province(province)
                .administrativeUnit(administrativeUnit)
                .build();
    }
}
