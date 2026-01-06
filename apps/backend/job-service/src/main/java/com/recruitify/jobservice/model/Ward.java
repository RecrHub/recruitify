package com.recruitify.jobservice.model;
import com.recruitify.jobservice.model.AdministrativeUnit;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wards")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ward {
    @Id
    private String code;
    private String name;
    private String nameEn;
    private String fullName;
    private String fullNameEn;
    private String codeName;

    @ManyToOne
    @JoinColumn(name = "province_code")
    private Province province;

    @ManyToOne
    @JoinColumn(name = "administrative_unit_id")
    private AdministrativeUnit administrativeUnit;
}