package com.recruitify.webapi.api.pages.homepage.dto.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeatureCompanyResponse {
    private Long id;
    private String companyTitle;
    private String companyImg;
    private String companyOver;
}