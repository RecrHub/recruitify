package com.recruitify.profilescreen.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "profiles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "full_name")
    private String fullName;

    @Column(columnDefinition = "TEXT")
    private String about;

    private String title;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "personal_link")
    private String personalLink;

    @Column(name = "phone_number")
    private Integer phoneNumber;

    private Boolean gender;

    private String address;

    private LocalDate dob;

    @Column(name = "province_code")
    private String provinceCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "province_code", insertable = false, updatable = false)
    private Province province;
}
