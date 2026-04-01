package com.recruitify.webapi.api.pages.admin.companymanagement.Services;

import org.springframework.web.multipart.MultipartFile;

import com.recruitify.webapi.api.pages.admin.companymanagement.dto.Request.CompanyRequest;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.Response.CompanyResponse;

public interface ICompanyServices {
    CompanyResponse createCompany(CompanyRequest companyRequest, MultipartFile image);
};
