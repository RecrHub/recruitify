package com.recruitify.webapi.api.pages.user.profile.service;

import java.util.List;

import com.recruitify.webapi.api.pages.user.profile.dto.request.*;
import com.recruitify.webapi.api.pages.user.profile.vo.EducationResponse;
import com.recruitify.webapi.api.pages.user.profile.vo.ProfileResponse;
import com.recruitify.webapi.api.pages.user.profile.vo.ProvinceResponse;
import com.recruitify.webapi.api.pages.user.profile.vo.WorkExperienceResponse;

public interface IProfileService {
    ProfileResponse getProfile(Long accountId);

    ProfileResponse updateProfile(Long accountId, ProfileUpdateRequest request);

    List<WorkExperienceResponse> getWorkExperiences(Long accountId);

    WorkExperienceResponse addWorkExperience(Long accountId, WorkExperienceRequest request);

    WorkExperienceResponse updateWorkExperience(Long accountId, Long id, WorkExperienceRequest request);

    void deleteWorkExperience(Long accountId, Long id);

    List<EducationResponse> getEducations(Long accountId);

    EducationResponse addEducation(Long accountId, EducationRequest request);

    EducationResponse updateEducation(Long accountId, Long id, EducationRequest request);

    void deleteEducation(Long accountId, Long id);

    List<ProvinceResponse> getAllProvinces();
}
