package com.recruitify.profilescreen.service;

import com.recruitify.profilescreen.dto.request.*;
import com.recruitify.profilescreen.dto.response.*;
import java.util.List;

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
