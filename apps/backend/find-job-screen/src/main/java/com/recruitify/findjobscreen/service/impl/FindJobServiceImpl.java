package com.recruitify.findjobscreen.service.impl;

import com.recruitify.findjobscreen.dto.request.JobSearchRequest;
import com.recruitify.findjobscreen.dto.response.*;
import com.recruitify.findjobscreen.service.IFindJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FindJobServiceImpl implements IFindJobService {

    @Override
    public FindJobPageResponse findJobs(JobSearchRequest request) {
        List<JobItemResponse> mockJobs = Arrays.asList(
                JobItemResponse.builder()
                        .id(1L)
                        .title("Senior Java Developer")
                        .companyName("Tech Corp")
                        .companyLogo("https://example.com/logo1.png")
                        .location("Ho Chi Minh City")
                        .salary("$2000 - $3500")
                        .employmentType("FULL_TIME")
                        .workApproach("REMOTE")
                        .postedAt(LocalDateTime.now().minusDays(1))
                        .build(),
                JobItemResponse.builder()
                        .id(2L)
                        .title("Frontend Developer")
                        .companyName("Digital Agency")
                        .companyLogo("https://example.com/logo2.png")
                        .location("Ha Noi")
                        .salary("$1500 - $2500")
                        .employmentType("FULL_TIME")
                        .workApproach("HYBRID")
                        .postedAt(LocalDateTime.now().minusDays(2))
                        .build()
        );

        PaginationResponse pagination = PaginationResponse.builder()
                .currentPage(request.getPage())
                .totalPages(1)
                .totalElements(2L)
                .size(request.getSize())
                .hasNext(false)
                .hasPrevious(false)
                .build();

        JobListResponse jobList = JobListResponse.builder()
                .jobs(mockJobs)
                .pagination(pagination)
                .build();

        return FindJobPageResponse.builder()
                .jobs(jobList)
                .filters(getFilterOptions())
                .build();
    }

    @Override
    public FilterOptionsResponse getFilterOptions() {
        return FilterOptionsResponse.builder()
                .categories(Arrays.asList(
                        FilterOptionsResponse.FilterOption.builder().value("1").label("Information Technology").build(),
                        FilterOptionsResponse.FilterOption.builder().value("2").label("Marketing").build(),
                        FilterOptionsResponse.FilterOption.builder().value("3").label("Finance").build(),
                        FilterOptionsResponse.FilterOption.builder().value("4").label("Human Resources").build()
                ))
                .provinces(Arrays.asList(
                        FilterOptionsResponse.FilterOption.builder().value("1").label("Ho Chi Minh City").build(),
                        FilterOptionsResponse.FilterOption.builder().value("2").label("Ha Noi").build(),
                        FilterOptionsResponse.FilterOption.builder().value("3").label("Da Nang").build()
                ))
                .employmentTypes(Arrays.asList(
                        FilterOptionsResponse.FilterOption.builder().value("FULL_TIME").label("Full Time").build(),
                        FilterOptionsResponse.FilterOption.builder().value("PART_TIME").label("Part Time").build(),
                        FilterOptionsResponse.FilterOption.builder().value("CONTRACT").label("Contract").build(),
                        FilterOptionsResponse.FilterOption.builder().value("INTERNSHIP").label("Internship").build()
                ))
                .workApproaches(Arrays.asList(
                        FilterOptionsResponse.FilterOption.builder().value("ONSITE").label("On-site").build(),
                        FilterOptionsResponse.FilterOption.builder().value("REMOTE").label("Remote").build(),
                        FilterOptionsResponse.FilterOption.builder().value("HYBRID").label("Hybrid").build()
                ))
                .experienceLevels(Arrays.asList(
                        FilterOptionsResponse.FilterOption.builder().value("ENTRY").label("Entry Level").build(),
                        FilterOptionsResponse.FilterOption.builder().value("JUNIOR").label("Junior").build(),
                        FilterOptionsResponse.FilterOption.builder().value("MID").label("Mid Level").build(),
                        FilterOptionsResponse.FilterOption.builder().value("SENIOR").label("Senior").build(),
                        FilterOptionsResponse.FilterOption.builder().value("LEAD").label("Lead").build()
                ))
                .build();
    }
}
