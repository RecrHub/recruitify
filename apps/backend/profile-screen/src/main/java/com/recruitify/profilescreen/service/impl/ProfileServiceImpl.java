package com.recruitify.profilescreen.service.impl;

import com.recruitify.profilescreen.dto.request.*;
import com.recruitify.profilescreen.dto.response.*;
import com.recruitify.profilescreen.model.*;
import com.recruitify.profilescreen.exception.ResourceNotFoundException;
import com.recruitify.profilescreen.repository.*;
import com.recruitify.profilescreen.service.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProfileServiceImpl implements IProfileService {

    private final ProfileRepository profileRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final EducationRepository educationRepository;
    private final ProvinceRepository provinceRepository;

    @Override
    @Transactional(readOnly = true)
    public ProfileResponse getProfile(Long accountId) {
        Profile profile = profileRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with account ID: " + accountId));
        return mapToProfileResponse(profile);
    }

    @Override
    public ProfileResponse updateProfile(Long accountId, ProfileUpdateRequest request) {
        Profile profile = profileRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with account ID: " + accountId));

        if (request.getFullName() != null) {
            profile.setFullName(request.getFullName());
        }
        if (request.getAbout() != null) {
            profile.setAbout(request.getAbout());
        }
        if (request.getTitle() != null) {
            profile.setTitle(request.getTitle());
        }
        if (request.getAvatarUrl() != null) {
            profile.setAvatarUrl(request.getAvatarUrl());
        }
        if (request.getPersonalLink() != null) {
            profile.setPersonalLink(request.getPersonalLink());
        }
        if (request.getPhoneNumber() != null) {
            profile.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getGender() != null) {
            profile.setGender(request.getGender());
        }
        if (request.getAddress() != null) {
            profile.setAddress(request.getAddress());
        }
        if (request.getDob() != null) {
            profile.setDob(request.getDob());
        }
        if (request.getProvinceCode() != null) {
            profile.setProvinceCode(request.getProvinceCode());
        }

        Profile updatedProfile = profileRepository.save(profile);
        return mapToProfileResponse(updatedProfile);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkExperienceResponse> getWorkExperiences(Long accountId) {
        validateProfileExists(accountId);
        return workExperienceRepository.findByUserProfileIdOrderByStartDateDesc(accountId)
                .stream()
                .map(this::mapToWorkExperienceResponse)
                .collect(Collectors.toList());
    }

    @Override
    public WorkExperienceResponse addWorkExperience(Long accountId, WorkExperienceRequest request) {
        validateProfileExists(accountId);
        
        WorkExperience workExperience = WorkExperience.builder()
                .userProfileId(accountId)
                .jobTitle(request.getJobTitle())
                .companyName(request.getCompanyName())
                .location(request.getLocation())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .description(request.getDescription())
                .build();

        WorkExperience saved = workExperienceRepository.save(workExperience);
        return mapToWorkExperienceResponse(saved);
    }

    @Override
    public WorkExperienceResponse updateWorkExperience(Long accountId, Long id, WorkExperienceRequest request) {
        WorkExperience workExperience = workExperienceRepository.findByIdAndUserProfileId(id, accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Work experience not found with ID: " + id));

        workExperience.setJobTitle(request.getJobTitle());
        workExperience.setCompanyName(request.getCompanyName());
        workExperience.setLocation(request.getLocation());
        workExperience.setStartDate(request.getStartDate());
        workExperience.setEndDate(request.getEndDate());
        workExperience.setDescription(request.getDescription());

        WorkExperience updated = workExperienceRepository.save(workExperience);
        return mapToWorkExperienceResponse(updated);
    }

    @Override
    public void deleteWorkExperience(Long accountId, Long id) {
        WorkExperience workExperience = workExperienceRepository.findByIdAndUserProfileId(id, accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Work experience not found with ID: " + id));
        workExperienceRepository.delete(workExperience);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EducationResponse> getEducations(Long accountId) {
        validateProfileExists(accountId);
        return educationRepository.findByUserProfileIdOrderByStartDateDesc(accountId)
                .stream()
                .map(this::mapToEducationResponse)
                .collect(Collectors.toList());
    }

    @Override
    public EducationResponse addEducation(Long accountId, EducationRequest request) {
        validateProfileExists(accountId);
        
        Education education = Education.builder()
                .userProfileId(accountId)
                .schoolName(request.getSchoolName())
                .degree(request.getDegree())
                .fieldOfStudy(request.getFieldOfStudy())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        Education saved = educationRepository.save(education);
        return mapToEducationResponse(saved);
    }

    @Override
    public EducationResponse updateEducation(Long accountId, Long id, EducationRequest request) {
        Education education = educationRepository.findByIdAndUserProfileId(id, accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found with ID: " + id));

        education.setSchoolName(request.getSchoolName());
        education.setDegree(request.getDegree());
        education.setFieldOfStudy(request.getFieldOfStudy());
        education.setStartDate(request.getStartDate());
        education.setEndDate(request.getEndDate());

        Education updated = educationRepository.save(education);
        return mapToEducationResponse(updated);
    }

    @Override
    public void deleteEducation(Long accountId, Long id) {
        Education education = educationRepository.findByIdAndUserProfileId(id, accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found with ID: " + id));
        educationRepository.delete(education);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProvinceResponse> getAllProvinces() {
        return provinceRepository.findAll()
                .stream()
                .map(this::mapToProvinceResponse)
                .collect(Collectors.toList());
    }

    private void validateProfileExists(Long accountId) {
        if (!profileRepository.existsById(accountId)) {
            throw new ResourceNotFoundException("Profile not found with account ID: " + accountId);
        }
    }

    private ProfileResponse mapToProfileResponse(Profile profile) {
        ProvinceResponse provinceResponse = null;
        if (profile.getProvince() != null) {
            provinceResponse = mapToProvinceResponse(profile.getProvince());
        }

        return ProfileResponse.builder()
                .accountId(profile.getAccountId())
                .fullName(profile.getFullName())
                .about(profile.getAbout())
                .title(profile.getTitle())
                .avatarUrl(profile.getAvatarUrl())
                .personalLink(profile.getPersonalLink())
                .phoneNumber(profile.getPhoneNumber())
                .gender(profile.getGender())
                .address(profile.getAddress())
                .dob(profile.getDob())
                .provinceCode(profile.getProvinceCode())
                .province(provinceResponse)
                .build();
    }

    private WorkExperienceResponse mapToWorkExperienceResponse(WorkExperience workExperience) {
        return WorkExperienceResponse.builder()
                .id(workExperience.getId())
                .userProfileId(workExperience.getUserProfileId())
                .jobTitle(workExperience.getJobTitle())
                .companyName(workExperience.getCompanyName())
                .location(workExperience.getLocation())
                .startDate(workExperience.getStartDate())
                .endDate(workExperience.getEndDate())
                .description(workExperience.getDescription())
                .build();
    }

    private EducationResponse mapToEducationResponse(Education education) {
        return EducationResponse.builder()
                .id(education.getId())
                .userProfileId(education.getUserProfileId())
                .schoolName(education.getSchoolName())
                .degree(education.getDegree())
                .fieldOfStudy(education.getFieldOfStudy())
                .startDate(education.getStartDate())
                .endDate(education.getEndDate())
                .build();
    }

    private ProvinceResponse mapToProvinceResponse(Province province) {
        return ProvinceResponse.builder()
                .code(province.getCode())
                .name(province.getName())
                .fullName(province.getFullName())
                .build();
    }
}
