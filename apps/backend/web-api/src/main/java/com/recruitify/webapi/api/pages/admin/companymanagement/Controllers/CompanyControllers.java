package com.recruitify.webapi.api.pages.admin.companymanagement.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.recruitify.webapi.api.pages.admin.companymanagement.Services.Impl.CompanyServicesImpl;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.Request.CompanyRequest;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.Response.CompanyResponse;
import com.recruitify.webapi.common.vo.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/companies")
@Tag(name = "companies", description = "companies management APIs - CRUD operations for news companies")
@RequiredArgsConstructor
public class CompanyControllers {
    private final CompanyServicesImpl companyServicesImpl;

    @PostMapping(consumes = "multipart/form-data")
    // @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new companies", description = "Creates a new companies with auto-generated slug. Requires ADMIN role.", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "companies created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request data or companies name already exists", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized - JWT token missing or invalid", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Forbidden - Requires ADMIN role", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<ApiResponse<CompanyResponse>> createCategory(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "companies creation request", required = true, content = @Content(schema = @Schema(implementation = CompanyRequest.class)))  @RequestPart("request") @Valid CompanyRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        CompanyResponse category = companyServicesImpl.createCompany(request, image);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(category, "companies created successfully"));
    }
}
