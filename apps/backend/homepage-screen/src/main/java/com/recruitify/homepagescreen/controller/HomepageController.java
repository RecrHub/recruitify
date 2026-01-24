package com.recruitify.homepagescreen.controller;

import com.recruitify.homepagescreen.dto.response.HomepageResponse;
import com.recruitify.homepagescreen.service.IHomepageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/homepage")
@RequiredArgsConstructor
@Tag(name = "Homepage", description = "Homepage API - provides all data for the homepage in a single call")
public class HomepageController {

    private final IHomepageService homepageService;

    @GetMapping
    @Operation(summary = "Get homepage data", description = "Returns all data needed for the homepage including featured jobs, categories, and statistics")
    public ResponseEntity<HomepageResponse> getHomepageData() {
        return ResponseEntity.ok(homepageService.getHomepageData());
    }
}
