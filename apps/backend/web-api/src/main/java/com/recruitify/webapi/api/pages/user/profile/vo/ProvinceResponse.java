package com.recruitify.webapi.api.pages.user.profile.vo;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProvinceResponse {
    private String code;
    private String name;
    private String fullName;
}
