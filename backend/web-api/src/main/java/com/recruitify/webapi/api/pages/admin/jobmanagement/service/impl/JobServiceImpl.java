package com.recruitify.webapi.api.pages.admin.jobmanagement.service.impl;

import com.recruitify.webapi.api.pages.admin.jobmanagement.service.IJobService;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.request.JobRequest;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response.JobListResponse;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.response.JobResponse;
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

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.persistence.criteria.Predicate;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class JobServiceImpl implements IJobService {
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final CategoryRepository categoryRepository;
    private final EmploymentTypeRepository employmentTypeRepository;
    private final ExperienceLevelRepository experienceLevelRepository;
    private final WorkApproachRepository workApproachRepository;
    private final WardRepository wardRepository;
    private final SkillRepository skillRepository;

    @Override
    public JobListResponse listJobs(String keyword, String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Specification<Job> specification = buildSpecification(keyword, status);
        Page<Job> jobs = jobRepository.findAll(specification, pageable);
        return JobListResponse.builder()
                .jobs(jobs.getContent().stream().map(this::mapToResponse).toList())
                .totalElements(jobs.getTotalElements())
                .totalPages(jobs.getTotalPages())
                .currentPage(jobs.getNumber())
                .pageSize(jobs.getSize())
                .hasNext(jobs.hasNext())
                .hasPrevious(jobs.hasPrevious())
                .build();
    }

    @Override
    public JobResponse createJob(JobRequest request) {
        log.debug("Creating job: {}", request.getTitle());
        Job job = new Job();
        applyRequest(job, request, true);
        job.setCreatedAt(LocalDateTime.now());
        job.setCreatedBy(getCurrentUsername());
        job.setUpdatedAt(LocalDateTime.now());
        job.setUpdatedBy(getCurrentUsername());
        Job savedJob = jobRepository.save(job);
        return mapToResponse(savedJob);
    }

    @Override
    public JobResponse findJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.create("Job", "id", id));
        return mapToResponse(job);
    }

    @Override
    public JobResponse updateJob(Long id, JobRequest request) {
        log.debug("Updating job id: {}", id);
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.create("Job", "id", id));
        applyRequest(job, request, false);
        job.setUpdatedAt(LocalDateTime.now());
        job.setUpdatedBy(getCurrentUsername());
        Job updatedJob = jobRepository.save(job);
        return mapToResponse(updatedJob);
    }

    @Override
    public void deleteJob(Long id) {
        log.debug("Deleting job id: {}", id);
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.create("Job", "id", id));
        LocalDateTime now = LocalDateTime.now();
        job.setDeleteAt(now);
        job.setDeleteBy(getCurrentUsername());
        job.setIsHidden(true);
        job.setUpdatedAt(now);
        job.setUpdatedBy(getCurrentUsername());
        jobRepository.save(job);
    }

    private void applyRequest(Job job, JobRequest request, boolean isCreate) {
        if (request.getTitle() != null) {
            job.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            job.setDescription(request.getDescription());
        }
        if (request.getResponsibilities() != null) {
            job.setResponsibilities(request.getResponsibilities());
        }
        if (request.getRequirement() != null) {
            job.setRequirement(request.getRequirement());
        }
        if (request.getBenefit() != null) {
            job.setBenefit(request.getBenefit());
        }
        if (request.getMinSalary() != null) {
            job.setMinSalary(request.getMinSalary());
        }
        if (request.getMaxSalary() != null) {
            job.setMaxSalary(request.getMaxSalary());
        }
        if (request.getIsHidden() != null || isCreate) {
            job.setIsHidden(request.getIsHidden() != null ? request.getIsHidden() : Boolean.FALSE);
        }

        if (request.getCompanyId() != null) {
            Company company = companyRepository.findById(request.getCompanyId())
                    .orElseThrow(() -> ResourceNotFoundException.create("Company", "id", request.getCompanyId()));
            job.setCompany(company);
        } else if (isCreate) {
            job.setCompany(null);
        }

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> ResourceNotFoundException.create("Category", "id", request.getCategoryId()));
            job.setCategory(category);
        } else if (isCreate) {
            job.setCategory(null);
        }

        if (request.getEmploymentTypeId() != null) {
            EmploymentType employmentType = employmentTypeRepository.findById(request.getEmploymentTypeId())
                    .orElseThrow(() -> ResourceNotFoundException.create("EmploymentType", "id",
                            request.getEmploymentTypeId()));
            job.setEmploymentType(employmentType);
        } else if (isCreate) {
            job.setEmploymentType(null);
        }

        if (request.getExperienceLevelId() != null) {
            ExperienceLevel experienceLevel = experienceLevelRepository.findById(request.getExperienceLevelId())
                    .orElseThrow(() -> ResourceNotFoundException.create("ExperienceLevel", "id",
                            request.getExperienceLevelId()));
            job.setExperienceLevel(experienceLevel);
        } else if (isCreate) {
            job.setExperienceLevel(null);
        }

        if (request.getWorkApproachId() != null) {
            WorkApproach workApproach = workApproachRepository.findById(request.getWorkApproachId())
                    .orElseThrow(
                            () -> ResourceNotFoundException.create("WorkApproach", "id", request.getWorkApproachId()));
            job.setWorkApproach(workApproach);
        } else if (isCreate) {
            job.setWorkApproach(null);
        }

        if (request.getWardCode() != null) {
            Ward ward = wardRepository.findById(request.getWardCode())
                    .orElseThrow(() -> ResourceNotFoundException.create("Ward", "code", request.getWardCode()));
            job.setWard(ward);
        } else if (isCreate) {
            job.setWard(null);
        }

        if (request.getSkillsName() != null) {
            Set<String> requestedNames = new HashSet<>(request.getSkillsName());
            Set<Skill> skills = new HashSet<>(
                    skillRepository.findByNameIn(requestedNames));
            if (skills.size() != requestedNames.size()) {
                throw ResourceNotFoundException.create(
                        "Skill",
                        "names",
                        request.getSkillsName());
            }
            job.setSkills(skills);
        } else if (isCreate) {
            job.setSkills(new HashSet<>());
        }
    }

    private Specification<Job> buildSpecification(String keyword, String status) {
        return (root, query, criteriaBuilder) -> {
            Set<Predicate> predicates = new java.util.HashSet<>();

            String normalizedKeyword = keyword != null ? keyword.trim() : null;
            if (normalizedKeyword != null && !normalizedKeyword.isBlank()) {
                String likeKeyword = "%" + normalizedKeyword.toLowerCase() + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), likeKeyword),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likeKeyword)));
            }

            String normalizedStatus = status != null ? status.trim() : null;
            if (normalizedStatus == null || normalizedStatus.isBlank()) {
                predicates.add(criteriaBuilder.isNull(root.get("deleteAt")));
            } else if ("ACTIVE".equalsIgnoreCase(normalizedStatus)) {
                predicates.add(criteriaBuilder.isNull(root.get("deleteAt")));
                predicates.add(criteriaBuilder.isFalse(root.get("isHidden")));
            } else if ("DRAFT".equalsIgnoreCase(normalizedStatus)) {
                predicates.add(criteriaBuilder.isNull(root.get("deleteAt")));
                predicates.add(criteriaBuilder.isTrue(root.get("isHidden")));
            } else if ("CLOSED".equalsIgnoreCase(normalizedStatus)) {
                predicates.add(criteriaBuilder.isNotNull(root.get("deleteAt")));
            } else {
                throw new IllegalArgumentException("Invalid status value");
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private JobResponse mapToResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .responsibilities(job.getResponsibilities())
                .requirement(job.getRequirement())
                .benefit(job.getBenefit())
                .minSalary(job.getMinSalary())
                .maxSalary(job.getMaxSalary())
                .isHidden(job.getIsHidden())
                .companyId(job.getCompany() != null ? job.getCompany().getId() : null)
                .companyName(job.getCompany() != null ? job.getCompany().getName() : null)
                .categoryId(job.getCategory() != null ? job.getCategory().getId() : null)
                .categoryName(job.getCategory() != null ? job.getCategory().getName() : null)
                .employmentTypeId(job.getEmploymentType() != null ? job.getEmploymentType().getId() : null)
                .employmentTypeName(job.getEmploymentType() != null ? job.getEmploymentType().getName() : null)
                .experienceLevelId(job.getExperienceLevel() != null ? job.getExperienceLevel().getId() : null)
                .experienceLevelName(job.getExperienceLevel() != null ? job.getExperienceLevel().getName() : null)
                .workApproachId(job.getWorkApproach() != null ? job.getWorkApproach().getId() : null)
                .workApproachName(job.getWorkApproach() != null ? job.getWorkApproach().getName() : null)
                .wardCode(job.getWard() != null ? job.getWard().getCode() : null)
                .wardName(job.getWard() != null ? job.getWard().getFullName() : null)
                .status(resolveStatus(job))
                .skillName(
                        Optional.ofNullable(job.getSkills())
                                .orElse(Set.of())
                                .stream()
                                .map(Skill::getName)
                                .collect(Collectors.toSet()))
                .createdAt(job.getCreatedAt())
                .updatedAt(job.getUpdatedAt())
                .deleteAt(job.getDeleteAt())
                .build();
    }

    private String resolveStatus(Job job) {
        if (job.getDeleteAt() != null) {
            return "Closed";
        }
        if (Boolean.TRUE.equals(job.getIsHidden())) {
            return "Draft";
        }
        return "Active";
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            return "system";
        }
        return authentication.getName();
    }
}