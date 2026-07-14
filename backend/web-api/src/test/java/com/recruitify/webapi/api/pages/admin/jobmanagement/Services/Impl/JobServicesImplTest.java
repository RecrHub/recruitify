package com.recruitify.webapi.api.pages.admin.jobmanagement.Services.Impl;

import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Request.JobRequest;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Response.JobListResponse;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Response.JobResponse;
import com.recruitify.webapi.common.exception.ResourceNotFoundException;
import com.recruitify.webapi.common.model.catalog.Category;
import com.recruitify.webapi.common.model.catalog.EmploymentType;
import com.recruitify.webapi.common.model.catalog.ExperienceLevel;
import com.recruitify.webapi.common.model.catalog.Skill;
import com.recruitify.webapi.common.model.catalog.WorkApproach;
import com.recruitify.webapi.common.model.job.Company;
import com.recruitify.webapi.common.model.job.Job;
import com.recruitify.webapi.common.model.location.Ward;
import com.recruitify.webapi.common.repository.CategoryRepository;
import com.recruitify.webapi.common.repository.CompanyRepository;
import com.recruitify.webapi.common.repository.EmploymentTypeRepository;
import com.recruitify.webapi.common.repository.ExperienceLevelRepository;
import com.recruitify.webapi.common.repository.JobRepository;
import com.recruitify.webapi.common.repository.SkillRepository;
import com.recruitify.webapi.common.repository.WardRepository;
import com.recruitify.webapi.common.repository.WorkApproachRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JobServicesImplTest {

    @Mock private JobRepository jobRepository;
    @Mock private CompanyRepository companyRepository;
    @Mock private CategoryRepository categoryRepository;
    @Mock private EmploymentTypeRepository employmentTypeRepository;
    @Mock private ExperienceLevelRepository experienceLevelRepository;
    @Mock private WorkApproachRepository workApproachRepository;
    @Mock private WardRepository wardRepository;
    @Mock private SkillRepository skillRepository;

    @InjectMocks private JobServicesImpl jobServices;

    private Company sampleCompany;
    private Category sampleCategory;
    private EmploymentType sampleEmploymentType;
    private ExperienceLevel sampleExperienceLevel;
    private WorkApproach sampleWorkApproach;
    private Ward sampleWard;
    private Skill sampleSkill1;
    private Skill sampleSkill2;
    private Job sampleJob;

    @BeforeEach
    void setUp() {
        sampleCompany = Company.builder().id(1L).name("Acme Corp").build();
        sampleCategory = Category.builder().id(10L).name("Engineering").build();
        sampleEmploymentType = EmploymentType.builder().id(20L).name("Full-time").build();
        sampleExperienceLevel = ExperienceLevel.builder().id(30L).name("Senior").build();
        sampleWorkApproach = WorkApproach.builder().id(40L).name("Hybrid").build();
        sampleWard = Ward.builder().code("W001").fullName("Ward 1, District 1, HCMC").build();
        sampleSkill1 = Skill.builder().id(100L).name("Java").build();
        sampleSkill2 = Skill.builder().id(101L).name("Spring").build();

        Set<Skill> skills = new LinkedHashSet<>();
        skills.add(sampleSkill1);
        skills.add(sampleSkill2);

        sampleJob = Job.builder()
                .id(1L)
                .title("Senior Java Developer")
                .description("Develop backend services")
                .responsibilities("Code, review, mentor")
                .requirement("5+ years Java")
                .benefit("Health insurance, 13th month salary")
                .salary(new BigDecimal("3000.00"))
                .isHidden(false)
                .company(sampleCompany)
                .category(sampleCategory)
                .employmentType(sampleEmploymentType)
                .experienceLevel(sampleExperienceLevel)
                .workApproach(sampleWorkApproach)
                .ward(sampleWard)
                .skills(skills)
                .createdAt(LocalDateTime.now().minusDays(1))
                .updatedAt(LocalDateTime.now().minusDays(1))
                .build();
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    private void authenticateAs(String username) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                username,
                "password",
                List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    private JobRequest buildValidJobRequest() {
        Set<Long> skillIds = new HashSet<>();
        skillIds.add(sampleSkill1.getId());
        skillIds.add(sampleSkill2.getId());

        return JobRequest.builder()
                .title("Senior Java Developer")
                .description("Develop backend services")
                .responsibilities("Code, review, mentor")
                .requirement("5+ years Java")
                .benefit("Health insurance, 13th month salary")
                .salary(new BigDecimal("3000.00"))
                .isHidden(false)
                .companyId(sampleCompany.getId())
                .categoryId(sampleCategory.getId())
                .employmentTypeId(sampleEmploymentType.getId())
                .experienceLevelId(sampleExperienceLevel.getId())
                .workApproachId(sampleWorkApproach.getId())
                .wardCode(sampleWard.getCode())
                .skillIds(skillIds)
                .build();
    }

    // ===================== listJobs =====================

    @Nested
    @DisplayName("listJobs")
    class ListJobs {

        @Test
        @DisplayName("returns paginated list with ACTIVE-filter (default) when no status supplied")
        void listJobs_noStatus_returnsAllActive() {
            Page<Job> page = new PageImpl<>(
                    List.of(sampleJob),
                    PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt")),
                    1
            );
            when(jobRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(page);

            JobListResponse response = jobServices.listJobs(null, null, 0, 10);

            assertThat(response.getJobs()).hasSize(1);
            assertThat(response.getJobs().get(0).getTitle()).isEqualTo("Senior Java Developer");
            assertThat(response.getJobs().get(0).getStatus()).isEqualTo("Active");
            assertThat(response.getTotalElements()).isEqualTo(1);
            assertThat(response.getCurrentPage()).isEqualTo(0);
            assertThat(response.getPageSize()).isEqualTo(10);

            ArgumentCaptor<Pageable> pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
            verify(jobRepository).findAll(any(Specification.class), pageableCaptor.capture());
            Pageable used = pageableCaptor.getValue();
            assertThat(used.getPageNumber()).isEqualTo(0);
            assertThat(used.getPageSize()).isEqualTo(10);
            assertThat(used.getSort().getOrderFor("createdAt").getDirection()).isEqualTo(Sort.Direction.DESC);
        }

        @Test
        @DisplayName("filters by keyword (case-insensitive contains) when keyword supplied")
        void listJobs_withKeyword_buildsPredicate() {
            when(jobRepository.findAll(any(Specification.class), any(Pageable.class)))
                    .thenReturn(new PageImpl<>(List.of(sampleJob)));

            JobListResponse response = jobServices.listJobs("Java", null, 0, 10);

            assertThat(response.getJobs()).hasSize(1);
            verify(jobRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
        }

        @Test
        @DisplayName("returns empty page when no jobs match")
        void listJobs_emptyResult() {
            when(jobRepository.findAll(any(Specification.class), any(Pageable.class)))
                    .thenReturn(new PageImpl<>(Collections.emptyList()));

            JobListResponse response = jobServices.listJobs(null, null, 0, 10);

            assertThat(response.getJobs()).isEmpty();
            assertThat(response.getTotalElements()).isZero();
            assertThat(response.isHasNext()).isFalse();
            assertThat(response.isHasPrevious()).isFalse();
        }

        @Test
        @DisplayName("paginates correctly: page=2, size=5")
        void listJobs_pagination() {
            when(jobRepository.findAll(any(Specification.class), any(Pageable.class)))
                    .thenReturn(new PageImpl<>(Collections.emptyList(), PageRequest.of(2, 5), 0));

            jobServices.listJobs(null, null, 2, 5);

            ArgumentCaptor<Pageable> captor = ArgumentCaptor.forClass(Pageable.class);
            verify(jobRepository).findAll(any(Specification.class), captor.capture());
            assertThat(captor.getValue().getPageNumber()).isEqualTo(2);
            assertThat(captor.getValue().getPageSize()).isEqualTo(5);
        }

        @Test
        @DisplayName("throws IllegalArgumentException when status is invalid")
        void listJobs_invalidStatus_throws() {
            assertThatThrownBy(() -> jobServices.listJobs(null, "GARBAGE", 0, 10))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("Invalid status");

            verify(jobRepository, never()).findAll(any(Specification.class), any(Pageable.class));
        }

        @Test
        @DisplayName("accepts ACTIVE / DRAFT / CLOSED status values")
        void listJobs_knownStatuses() {
            when(jobRepository.findAll(any(Specification.class), any(Pageable.class)))
                    .thenReturn(new PageImpl<>(Collections.emptyList()));

            jobServices.listJobs(null, "ACTIVE", 0, 10);
            jobServices.listJobs(null, "DRAFT", 0, 10);
            jobServices.listJobs(null, "CLOSED", 0, 10);

            verify(jobRepository, times(3)).findAll(any(Specification.class), any(Pageable.class));
        }
    }

    // ===================== createJob =====================

    @Nested
    @DisplayName("createJob")
    class CreateJob {

        @Test
        @DisplayName("creates a job and populates audit fields from security context")
        void createJob_happyPath() {
            authenticateAs("admin");
            JobRequest request = buildValidJobRequest();

            when(companyRepository.findById(sampleCompany.getId())).thenReturn(Optional.of(sampleCompany));
            when(categoryRepository.findById(sampleCategory.getId())).thenReturn(Optional.of(sampleCategory));
            when(employmentTypeRepository.findById(sampleEmploymentType.getId())).thenReturn(Optional.of(sampleEmploymentType));
            when(experienceLevelRepository.findById(sampleExperienceLevel.getId())).thenReturn(Optional.of(sampleExperienceLevel));
            when(workApproachRepository.findById(sampleWorkApproach.getId())).thenReturn(Optional.of(sampleWorkApproach));
            when(wardRepository.findById(sampleWard.getCode())).thenReturn(Optional.of(sampleWard));
            when(skillRepository.findAllById(any())).thenReturn(List.of(sampleSkill1, sampleSkill2));

            when(jobRepository.save(any(Job.class))).thenAnswer(inv -> {
                Job j = inv.getArgument(0);
                j.setId(99L);
                return j;
            });

            JobResponse response = jobServices.createJob(request);

            assertThat(response.getId()).isEqualTo(99L);
            assertThat(response.getTitle()).isEqualTo(request.getTitle());
            assertThat(response.getCompanyId()).isEqualTo(sampleCompany.getId());
            assertThat(response.getCompanyName()).isEqualTo("Acme Corp");
            assertThat(response.getCategoryId()).isEqualTo(sampleCategory.getId());
            assertThat(response.getEmploymentTypeId()).isEqualTo(sampleEmploymentType.getId());
            assertThat(response.getWardCode()).isEqualTo(sampleWard.getCode());
            assertThat(response.getStatus()).isEqualTo("Active");
            assertThat(response.getSkillIds()).containsExactlyInAnyOrder(100L, 101L);

            ArgumentCaptor<Job> jobCaptor = ArgumentCaptor.forClass(Job.class);
            verify(jobRepository).save(jobCaptor.capture());
            Job saved = jobCaptor.getValue();
            assertThat(saved.getCreatedBy()).isEqualTo("admin");
            assertThat(saved.getUpdatedBy()).isEqualTo("admin");
            assertThat(saved.getCreatedAt()).isNotNull();
            assertThat(saved.getUpdatedAt()).isNotNull();
        }

        @Test
        @DisplayName("defaults createdBy/updatedBy to 'system' when no authentication present")
        void createJob_noAuth_usesSystem() {
            JobRequest request = buildValidJobRequest();
            when(companyRepository.findById(sampleCompany.getId())).thenReturn(Optional.of(sampleCompany));
            when(categoryRepository.findById(sampleCategory.getId())).thenReturn(Optional.of(sampleCategory));
            when(employmentTypeRepository.findById(sampleEmploymentType.getId())).thenReturn(Optional.of(sampleEmploymentType));
            when(experienceLevelRepository.findById(sampleExperienceLevel.getId())).thenReturn(Optional.of(sampleExperienceLevel));
            when(workApproachRepository.findById(sampleWorkApproach.getId())).thenReturn(Optional.of(sampleWorkApproach));
            when(wardRepository.findById(sampleWard.getCode())).thenReturn(Optional.of(sampleWard));
            when(skillRepository.findAllById(any())).thenReturn(List.of(sampleSkill1, sampleSkill2));
            when(jobRepository.save(any(Job.class))).thenAnswer(inv -> inv.getArgument(0));

            JobResponse response = jobServices.createJob(request);

            ArgumentCaptor<Job> jobCaptor = ArgumentCaptor.forClass(Job.class);
            verify(jobRepository).save(jobCaptor.capture());
            assertThat(jobCaptor.getValue().getCreatedBy()).isEqualTo("system");
            assertThat(jobCaptor.getValue().getUpdatedBy()).isEqualTo("system");
            assertThat(response.getTitle()).isEqualTo(request.getTitle());
        }

        @Test
        @DisplayName("throws ResourceNotFoundException when companyId does not exist")
        void createJob_companyNotFound_throws() {
            JobRequest request = buildValidJobRequest();
            when(companyRepository.findById(sampleCompany.getId())).thenReturn(Optional.empty());

            assertThatThrownBy(() -> jobServices.createJob(request))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Company");

            verify(jobRepository, never()).save(any(Job.class));
        }

        @Test
        @DisplayName("throws ResourceNotFoundException when categoryId does not exist")
        void createJob_categoryNotFound_throws() {
            JobRequest request = buildValidJobRequest();
            when(companyRepository.findById(sampleCompany.getId())).thenReturn(Optional.of(sampleCompany));
            when(categoryRepository.findById(sampleCategory.getId())).thenReturn(Optional.empty());

            assertThatThrownBy(() -> jobServices.createJob(request))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Category");

            verify(jobRepository, never()).save(any(Job.class));
        }

        @Test
        @DisplayName("throws ResourceNotFoundException when one of the skillIds does not exist")
        void createJob_skillMissing_throws() {
            JobRequest request = buildValidJobRequest();
            when(companyRepository.findById(sampleCompany.getId())).thenReturn(Optional.of(sampleCompany));
            when(categoryRepository.findById(sampleCategory.getId())).thenReturn(Optional.of(sampleCategory));
            when(employmentTypeRepository.findById(sampleEmploymentType.getId())).thenReturn(Optional.of(sampleEmploymentType));
            when(experienceLevelRepository.findById(sampleExperienceLevel.getId())).thenReturn(Optional.of(sampleExperienceLevel));
            when(workApproachRepository.findById(sampleWorkApproach.getId())).thenReturn(Optional.of(sampleWorkApproach));
            when(wardRepository.findById(sampleWard.getCode())).thenReturn(Optional.of(sampleWard));
            // Only 1 of 2 skills found
            when(skillRepository.findAllById(any())).thenReturn(List.of(sampleSkill1));

            assertThatThrownBy(() -> jobServices.createJob(request))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Skill");

            verify(jobRepository, never()).save(any(Job.class));
        }
    }

    // ===================== findJobById =====================

    @Nested
    @DisplayName("findJobById")
    class FindJobById {

        @Test
        @DisplayName("returns mapped response when job exists")
        void findJobById_found() {
            when(jobRepository.findById(1L)).thenReturn(Optional.of(sampleJob));

            JobResponse response = jobServices.findJobById(1L);

            assertThat(response.getId()).isEqualTo(1L);
            assertThat(response.getTitle()).isEqualTo("Senior Java Developer");
            assertThat(response.getCompanyName()).isEqualTo("Acme Corp");
            assertThat(response.getStatus()).isEqualTo("Active");
            assertThat(response.getSkillIds()).containsExactlyInAnyOrder(100L, 101L);
        }

        @Test
        @DisplayName("returns status=Draft when job is hidden")
        void findJobById_draftStatus() {
            sampleJob.setIsHidden(true);
            when(jobRepository.findById(1L)).thenReturn(Optional.of(sampleJob));

            JobResponse response = jobServices.findJobById(1L);

            assertThat(response.getStatus()).isEqualTo("Draft");
        }

        @Test
        @DisplayName("returns status=Closed when deleteAt is set")
        void findJobById_closedStatus() {
            sampleJob.setDeleteAt(LocalDateTime.now());
            when(jobRepository.findById(1L)).thenReturn(Optional.of(sampleJob));

            JobResponse response = jobServices.findJobById(1L);

            assertThat(response.getStatus()).isEqualTo("Closed");
        }

        @Test
        @DisplayName("throws ResourceNotFoundException when job does not exist")
        void findJobById_notFound_throws() {
            when(jobRepository.findById(404L)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> jobServices.findJobById(404L))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Job");
        }
    }

    // ===================== updateJob =====================

    @Nested
    @DisplayName("updateJob")
    class UpdateJob {

        @Test
        @DisplayName("updates fields, sets updatedAt/updatedBy and saves")
        void updateJob_happyPath() {
            authenticateAs("editor");
            when(jobRepository.findById(1L)).thenReturn(Optional.of(sampleJob));
            when(companyRepository.findById(sampleCompany.getId())).thenReturn(Optional.of(sampleCompany));
            when(categoryRepository.findById(sampleCategory.getId())).thenReturn(Optional.of(sampleCategory));
            when(employmentTypeRepository.findById(sampleEmploymentType.getId())).thenReturn(Optional.of(sampleEmploymentType));
            when(experienceLevelRepository.findById(sampleExperienceLevel.getId())).thenReturn(Optional.of(sampleExperienceLevel));
            when(workApproachRepository.findById(sampleWorkApproach.getId())).thenReturn(Optional.of(sampleWorkApproach));
            when(wardRepository.findById(sampleWard.getCode())).thenReturn(Optional.of(sampleWard));
            when(skillRepository.findAllById(any())).thenReturn(List.of(sampleSkill1, sampleSkill2));
            when(jobRepository.save(any(Job.class))).thenAnswer(inv -> inv.getArgument(0));

            JobRequest request = buildValidJobRequest();
            request.setTitle("Updated Title");
            request.setSalary(new BigDecimal("5000.00"));

            JobResponse response = jobServices.updateJob(1L, request);

            assertThat(response.getTitle()).isEqualTo("Updated Title");
            assertThat(response.getSalary()).isEqualByComparingTo("5000.00");

            ArgumentCaptor<Job> captor = ArgumentCaptor.forClass(Job.class);
            verify(jobRepository).save(captor.capture());
            Job saved = captor.getValue();
            assertThat(saved.getUpdatedBy()).isEqualTo("editor");
            assertThat(saved.getUpdatedAt()).isNotNull();
            // createdBy must NOT be touched on update
            assertThat(saved.getCreatedBy()).isEqualTo(sampleJob.getCreatedBy());
        }

        @Test
        @DisplayName("does not clear existing fields when request omits them (partial update)")
        void updateJob_partialUpdate_keepsExisting() {
            when(jobRepository.findById(1L)).thenReturn(Optional.of(sampleJob));
            when(jobRepository.save(any(Job.class))).thenAnswer(inv -> inv.getArgument(0));

            // Build a request with only the required fields set; other relations are null
            JobRequest partial = JobRequest.builder()
                    .title("Only Title Changed")
                    .description("Only desc")
                    .requirement("Only req")
                    .companyId(sampleCompany.getId())
                    .wardCode(sampleWard.getCode())
                    .build();

            // company & ward exist (because IDs are present)
            when(companyRepository.findById(sampleCompany.getId())).thenReturn(Optional.of(sampleCompany));
            when(wardRepository.findById(sampleWard.getCode())).thenReturn(Optional.of(sampleWard));

            JobResponse response = jobServices.updateJob(1L, partial);

            assertThat(response.getTitle()).isEqualTo("Only Title Changed");
            // category was NOT provided -> must remain the existing one
            assertThat(response.getCategoryId()).isEqualTo(sampleCategory.getId());
            // skills were NOT provided -> must remain the existing set
            assertThat(response.getSkillIds()).containsExactlyInAnyOrder(100L, 101L);

            verify(categoryRepository, never()).findById(any());
            verify(skillRepository, never()).findAllById(any());
        }

        @Test
        @DisplayName("throws ResourceNotFoundException when job id does not exist")
        void updateJob_notFound_throws() {
            when(jobRepository.findById(404L)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> jobServices.updateJob(404L, buildValidJobRequest()))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Job");

            verify(jobRepository, never()).save(any(Job.class));
        }

        @Test
        @DisplayName("throws ResourceNotFoundException when referenced company does not exist")
        void updateJob_companyNotFound_throws() {
            when(jobRepository.findById(1L)).thenReturn(Optional.of(sampleJob));
            when(companyRepository.findById(sampleCompany.getId())).thenReturn(Optional.empty());

            assertThatThrownBy(() -> jobServices.updateJob(1L, buildValidJobRequest()))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Company");

            verify(jobRepository, never()).save(any(Job.class));
        }
    }

    // ===================== deleteJob =====================

    @Nested
    @DisplayName("deleteJob")
    class DeleteJob {

        @Test
        @DisplayName("soft-deletes: sets deleteAt, deleteBy, isHidden=true and saves")
        void deleteJob_happyPath() {
            authenticateAs("admin");
            when(jobRepository.findById(1L)).thenReturn(Optional.of(sampleJob));
            when(jobRepository.save(any(Job.class))).thenAnswer(inv -> inv.getArgument(0));

            jobServices.deleteJob(1L);

            ArgumentCaptor<Job> captor = ArgumentCaptor.forClass(Job.class);
            verify(jobRepository).save(captor.capture());
            Job saved = captor.getValue();
            assertThat(saved.getDeleteAt()).isNotNull();
            assertThat(saved.getDeleteBy()).isEqualTo("admin");
            assertThat(saved.getIsHidden()).isTrue();
            assertThat(saved.getUpdatedAt()).isNotNull();
            assertThat(saved.getUpdatedBy()).isEqualTo("admin");
        }

        @Test
        @DisplayName("defaults deleteBy to 'system' when no authentication present")
        void deleteJob_noAuth_usesSystem() {
            when(jobRepository.findById(1L)).thenReturn(Optional.of(sampleJob));
            when(jobRepository.save(any(Job.class))).thenAnswer(inv -> inv.getArgument(0));

            jobServices.deleteJob(1L);

            ArgumentCaptor<Job> captor = ArgumentCaptor.forClass(Job.class);
            verify(jobRepository).save(captor.capture());
            assertThat(captor.getValue().getDeleteBy()).isEqualTo("system");
        }

        @Test
        @DisplayName("throws ResourceNotFoundException when job id does not exist")
        void deleteJob_notFound_throws() {
            when(jobRepository.findById(404L)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> jobServices.deleteJob(404L))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Job");

            verify(jobRepository, never()).save(any(Job.class));
        }
    }
}
