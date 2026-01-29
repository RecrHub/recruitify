package com.recruitify.common.model.location;

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

    @Column(name = "full_name_en")
    private String fullNameEn;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "code_name")
    private String codeName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "province_code")
    private Province province;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "administrative_unit_id")
    private AdministrativeUnit administrativeUnit;
}
