package com.recruitify.homepagescreen.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wards")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ward {
    @Id
    private String code;

    private String name;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "province_code")
    private String provinceCode;
}
