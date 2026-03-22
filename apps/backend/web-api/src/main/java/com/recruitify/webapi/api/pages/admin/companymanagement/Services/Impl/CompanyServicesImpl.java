package com.recruitify.webapi.api.pages.admin.companymanagement.Services.Impl;

import java.nio.file.Files;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.recruitify.webapi.api.pages.admin.companymanagement.Services.ICompanyServices;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.Request.CompanyRequest;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.Response.CompanyResponse;
import com.recruitify.webapi.common.exception.ResourceAlreadyExistsException;
import com.recruitify.webapi.common.model.job.Company;
import com.recruitify.webapi.common.repository.CompanyRepository;
import com.recruitify.webapi.common.services.ImageUploadService;

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
        if(image != null && image.isEmpty()) {
            imageURL = imageUploadService.uploadImage(image,"companies", companyRequest.getName());
        }
        //Create Company
        Company company = new Company();
        company.setName(companyRequest.getName());
        company.setOverview(companyRequest.getOverView());
        company.setCompanySize(companyRequest.getCompanySize());
        company.setCompanyType(companyRequest.getCompanyType());
        company.setFounderYear(companyRequest.getFounderYear());
        company.setImage(imageURL);
        company.setIndustry(companyRequest.getIndustry());

        Company saveCompany = companyRepository.save(company);
        return mapToResponseDTO(saveCompany);

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
}
