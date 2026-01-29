package com.recruitify.profilescreen.controller;

import com.recruitify.profilescreen.dto.request.*;
import com.recruitify.profilescreen.service.IProfileService;
import com.recruitify.profilescreen.vo.EducationResponse;
import com.recruitify.profilescreen.vo.ProfileResponse;
import com.recruitify.profilescreen.vo.ProvinceResponse;
import com.recruitify.profilescreen.vo.WorkExperienceResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/profiles")
@RequiredArgsConstructor
@Tag(name = "Profile", description = "Profile management APIs")
public class ProfileController {

    private final IProfileService profileService;

    @GetMapping("/{accountId}")
    @Operation(summary = "Get profile by account ID")
    public ResponseEntity<ProfileResponse> getProfile(@PathVariable Long accountId) {
        return ResponseEntity.ok(profileService.getProfile(accountId));
    }

    @PutMapping("/{accountId}")
    @Operation(summary = "Update profile")
    public ResponseEntity<ProfileResponse> updateProfile(
            @PathVariable Long accountId,
            @Valid @RequestBody ProfileUpdateRequest request) {
        return ResponseEntity.ok(profileService.updateProfile(accountId, request));
    }

    @GetMapping("/{accountId}/work-experiences")
    @Operation(summary = "Get all work experiences for a profile")
    public ResponseEntity<List<WorkExperienceResponse>> getWorkExperiences(@PathVariable Long accountId) {
        return ResponseEntity.ok(profileService.getWorkExperiences(accountId));
    }

    @PostMapping("/{accountId}/work-experiences")
    @Operation(summary = "Add work experience to profile")
    public ResponseEntity<WorkExperienceResponse> addWorkExperience(
            @PathVariable Long accountId,
            @Valid @RequestBody WorkExperienceRequest request) {
        return ResponseEntity.ok(profileService.addWorkExperience(accountId, request));
    }

    @PutMapping("/{accountId}/work-experiences/{id}")
    @Operation(summary = "Update work experience")
    public ResponseEntity<WorkExperienceResponse> updateWorkExperience(
            @PathVariable Long accountId,
            @PathVariable Long id,
            @Valid @RequestBody WorkExperienceRequest request) {
        return ResponseEntity.ok(profileService.updateWorkExperience(accountId, id, request));
    }

    @DeleteMapping("/{accountId}/work-experiences/{id}")
    @Operation(summary = "Delete work experience")
    public ResponseEntity<Void> deleteWorkExperience(
            @PathVariable Long accountId,
            @PathVariable Long id) {
        profileService.deleteWorkExperience(accountId, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{accountId}/educations")
    @Operation(summary = "Get all educations for a profile")
    public ResponseEntity<List<EducationResponse>> getEducations(@PathVariable Long accountId) {
        return ResponseEntity.ok(profileService.getEducations(accountId));
    }

    @PostMapping("/{accountId}/educations")
    @Operation(summary = "Add education to profile")
    public ResponseEntity<EducationResponse> addEducation(
            @PathVariable Long accountId,
            @Valid @RequestBody EducationRequest request) {
        return ResponseEntity.ok(profileService.addEducation(accountId, request));
    }

    @PutMapping("/{accountId}/educations/{id}")
    @Operation(summary = "Update education")
    public ResponseEntity<EducationResponse> updateEducation(
            @PathVariable Long accountId,
            @PathVariable Long id,
            @Valid @RequestBody EducationRequest request) {
        return ResponseEntity.ok(profileService.updateEducation(accountId, id, request));
    }

    @DeleteMapping("/{accountId}/educations/{id}")
    @Operation(summary = "Delete education")
    public ResponseEntity<Void> deleteEducation(
            @PathVariable Long accountId,
            @PathVariable Long id) {
        profileService.deleteEducation(accountId, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/provinces")
    @Operation(summary = "Get all provinces")
    public ResponseEntity<List<ProvinceResponse>> getAllProvinces() {
        return ResponseEntity.ok(profileService.getAllProvinces());
    }
}
