package com.recruitify.webapi.api.pages.admin.companymanagement.dto.response;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Schema(description = "Company information response")
public class CompanyResponse {
    private String name;
    private String overView;
    private String phone;
    private String companySize;
    private String companyType;
    private Integer founderYear;
    private String industry;
    private String imageUrl;
    private LocalDateTime createAt;
}
