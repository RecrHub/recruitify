package com.recruitify.webapi.api.pages.admin.companymanagement.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Pageable;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.request.CompanyRequest;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.response.CompanyResponse;
import com.recruitify.webapi.common.vo.PageResponse;

public interface ICompanyService {
    List<CompanyResponse> getAllCompanies();
    CompanyResponse findCompanyByid(Long id);
    CompanyResponse createCompany(CompanyRequest companyRequest, MultipartFile image);
    PageResponse<CompanyResponse> searchCategories(String keyword, Pageable pageable);
    CompanyResponse updateCompany(Long id,CompanyRequest companyRequest, MultipartFile image);
    void deleteCompany(Long id);
};
