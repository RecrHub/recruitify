package com.recruitify.webapi.api.pages.publicpage.findjob.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindJobPageResponse {
    private JobListResponse jobs;
    private FilterOptionsResponse filters;
}
