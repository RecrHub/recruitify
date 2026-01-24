package com.recruitify.profilescreen.dto.request;

import lombok.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRequest {
    private String fullName;
    private String about;
    private String title;
    private String avatarUrl;
    private String personalLink;
    private Integer phoneNumber;
    private Boolean gender;
    private String address;
    private LocalDate dob;
    private String provinceCode;
}
