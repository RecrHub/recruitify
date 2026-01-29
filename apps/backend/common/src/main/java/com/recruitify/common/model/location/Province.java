package com.recruitify.common.model.location;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "provinces")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Province {
    @Id
    private String code;

    private String name;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "full_name_en")
    private String fullNameEn;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "code_name")
    private String codeName;

    private String type;
    private String slug;

    @Column(name = "name_with_type")
    private String nameWithType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "administrative_unit_id")
    private AdministrativeUnit administrativeUnit;
}
