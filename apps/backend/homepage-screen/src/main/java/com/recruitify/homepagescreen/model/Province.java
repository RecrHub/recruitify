package com.recruitify.homepagescreen.model;

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

    @Column(name = "full_name")
    private String fullName;
}
