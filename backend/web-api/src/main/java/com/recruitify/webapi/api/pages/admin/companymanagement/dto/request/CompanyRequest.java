package com.recruitify.webapi.api.pages.admin.companymanagement.dto.request;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CompanyRequest {
    private String name;
    private String overView;
    private String phone;
    private String companySize;
    private String companyType;
    private Integer founderYear;
    private String industry;
}
