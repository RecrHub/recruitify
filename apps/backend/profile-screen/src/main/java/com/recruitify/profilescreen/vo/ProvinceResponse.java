package com.recruitify.profilescreen.vo;

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
