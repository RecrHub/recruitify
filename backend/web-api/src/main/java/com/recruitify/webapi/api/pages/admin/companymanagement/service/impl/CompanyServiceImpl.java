package com.recruitify.webapi.api.pages.admin.companymanagement.Services.Impl;

import com.recruitify.webapi.common.repository.CategoryRepository;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.recruitify.webapi.api.pages.admin.companymanagement.Services.ICompanyServices;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.Request.CompanyRequest;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.Response.CompanyResponse;
import com.recruitify.webapi.common.exception.ResourceAlreadyExistsException;
import com.recruitify.webapi.common.exception.ResourceNotFoundException;
import com.recruitify.webapi.common.model.job.Company;
import com.recruitify.webapi.common.repository.CompanyRepository;
import com.recruitify.webapi.common.services.ImageUploadService;
import com.recruitify.webapi.common.utils.SlugUtils;
import com.recruitify.webapi.common.vo.PageResponse;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CompanyServicesImpl implements ICompanyServices {
    private final CompanyRepository companyRepository;
    private final ImageUploadService imageUploadService;

    @Override
    public CompanyResponse createCompany(CompanyRequest companyRequest, MultipartFile image) {
        log.debug("Creating new Company: {}", companyRequest.getName());
        if (companyRepository.existsByNameIgnoreCase(companyRequest.getName())) {
            log.warn("Company Already exists: {}", companyRequest.getName());
            throw new ResourceAlreadyExistsException("Company", "name", companyRequest.getName());
        }
        String imageURL = null;
        if (image != null && !image.isEmpty()) {
            imageURL = imageUploadService.uploadImage(image, "companies", companyRequest.getName());
        }
        // Create Company
        Company company = new Company();
        company.setName(companyRequest.getName());
        company.setOverview(companyRequest.getOverView());
        company.setPhone(companyRequest.getPhone());
        company.setCompanySize(companyRequest.getCompanySize());
        company.setCompanyType(companyRequest.getCompanyType());
        company.setFounderYear(companyRequest.getFounderYear());
        company.setImage(imageURL);
        company.setIndustry(companyRequest.getIndustry());
        Company saveCompany = companyRepository.save(company);
        return mapToResponseDTO(saveCompany);

    }

    @Override
    public List<CompanyResponse> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public PageResponse<CompanyResponse> searchCategories(String keyword, Pageable pageable) {
        throw new UnsupportedOperationException("Unimplemented method 'searchCategories'");
    }

    @Override
    public CompanyResponse updateCompany(Long id, CompanyRequest companyRequest, MultipartFile image) {
        log.debug("Updating Company id: {} with name {}", id, companyRequest.getName());
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.create("Company", "id", id));

        company.setName(companyRequest.getName());
        company.setOverview(companyRequest.getOverView());
        company.setPhone(companyRequest.getPhone());
        company.setCompanySize(companyRequest.getCompanySize());
        company.setCompanyType(companyRequest.getCompanyType());
        company.setFounderYear(companyRequest.getFounderYear());
        company.setIndustry(companyRequest.getIndustry());

        if (image != null && !image.isEmpty()) {
            String imageURL = imageUploadService.uploadImage(image, "companies", companyRequest.getName());
            company.setImage(imageURL);
        }

        Company updatedCompany = companyRepository.save(company);
        log.info("Updated Company: {}", updatedCompany.getName());
        return mapToResponseDTO(updatedCompany);
    }

    @Override
    public void deleteCompany(Long id) {
        log.debug("Deleting Company id: {}", id);
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.create("Company", "id", id));
        company.setDeleteAt(LocalDateTime.now());
        companyRepository.save(company);
        log.info("Deleted Company: {}", company.getName());
    }

    private CompanyResponse mapToResponseDTO(Company company) {
        return CompanyResponse.builder()
                .name(company.getName())
                .overView(company.getOverview())
                .phone(company.getPhone())
                .companySize(company.getCompanySize())
                .companyType(company.getCompanyType())
                .founderYear(company.getFounderYear())
                .industry(company.getIndustry())
                .imageUrl(company.getImage())
                .createAt(company.getCreatedAt())
                .build();
    }

    @Override
    public CompanyResponse findCompanyByid(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.create("Company", "id", id));
        return mapToResponseDTO(company);
    }
}
