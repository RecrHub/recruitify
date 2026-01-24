package com.recruitify.findjobscreen.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "administrative_units")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdministrativeUnit {
    @Id
    private Integer id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "full_name_en")
    private String fullNameEn;

    @Column(name = "short_name")
    private String shortName;

    @Column(name = "short_name_en")
    private String shortNameEn;

    @Column(name = "code_name")
    private String codeName;

    @Column(name = "code_name_en")
    private String codeNameEn;
}
