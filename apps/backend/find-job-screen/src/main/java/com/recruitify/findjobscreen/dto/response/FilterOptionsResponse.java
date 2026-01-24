package com.recruitify.findjobscreen.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FilterOptionsResponse {
    private List<FilterOption> categories;
    private List<FilterOption> provinces;
    private List<FilterOption> employmentTypes;
    private List<FilterOption> workApproaches;
    private List<FilterOption> experienceLevels;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FilterOption {
        private String value;
        private String label;
    }
}
