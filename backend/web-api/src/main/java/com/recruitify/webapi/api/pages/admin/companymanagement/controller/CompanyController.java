package com.recruitify.webapi.api.pages.admin.companymanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.recruitify.webapi.api.pages.admin.companymanagement.service.impl.CompanyServiceImpl;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.request.CompanyRequest;
import com.recruitify.webapi.api.pages.admin.companymanagement.dto.response.CompanyResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/companies")
@Tag(name = "companies", description = "companies management APIs - CRUD operations for news companies")
@RequiredArgsConstructor
public class CompanyController {
        private final CompanyServiceImpl companyServiceImpl;

        @PostMapping(consumes = "multipart/form-data")
        @PreAuthorize("hasAuthority('COMPANY_CREATE')")
        @Operation(summary = "Create a new companies", description = "Creates a new companies with auto-generated slug. Requires ADMIN role.", security = @SecurityRequirement(name = "bearerAuth"))
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "companies created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class))),
                        @ApiResponse(responseCode = "400", description = "Invalid request data or companies name already exists", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class))),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token missing or invalid", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class))),
                        @ApiResponse(responseCode = "403", description = "Forbidden - Requires ADMIN role", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class)))
        })
        public ResponseEntity<com.recruitify.webapi.common.vo.ApiResponse<CompanyResponse>> createCompany(
                        @RequestPart("request") @Valid CompanyRequest request,
                        @RequestParam(value = "image", required = false) MultipartFile image) {
                CompanyResponse updateCompany = companyServiceImpl.createCompany(request, image);
                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(com.recruitify.webapi.common.vo.ApiResponse.created(updateCompany,
                                                "companies created successfully"));
        }

        @GetMapping("/{id}")
        @Operation(summary = "Find By id company", description = "Returns a id company without pagination. Useful for dropdowns and filters.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "company retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class))),
                        @ApiResponse(responseCode = "404", description = "company not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class)))
        })
        public ResponseEntity<com.recruitify.webapi.common.vo.ApiResponse<CompanyResponse>> findById(
                        @Parameter(description = "Company id", required = true, example = "1") @PathVariable Long id) {
                CompanyResponse companies = companyServiceImpl.findCompanyByid(id);
                return ResponseEntity.ok(com.recruitify.webapi.common.vo.ApiResponse.success(companies,
                                "Companies retrieved successfully"));
        }

        @GetMapping("/all")
        @PreAuthorize("hasAuthority('COMPANY_VIEW')")
        @Operation(summary = "get All companies", description = "Returns a list of all companies without pagination. Useful for dropdowns and filters.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "companies get successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class)))
        })
        public ResponseEntity<com.recruitify.webapi.common.vo.ApiResponse<List<CompanyResponse>>> getAllCompanies() {
                List<CompanyResponse> companies = companyServiceImpl.getAllCompanies();
                return ResponseEntity.ok(com.recruitify.webapi.common.vo.ApiResponse.success(companies,
                                "Companies retrieved successfully"));
        }

        @PatchMapping("/{id}")
        @PreAuthorize("hasAuthority('COMPANY_UPDATE')")
        @Operation(summary = "Update a company", description = "Updates an existing category by ID. Slug will be regenerated based on new name. Requires ADMIN role.", security = @SecurityRequirement(name = "bearerAuth"))
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "companies update successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class))),
                        @ApiResponse(responseCode = "400", description = "Invalid request data or companies name already exists", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class))),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token missing or invalid", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class))),
                        @ApiResponse(responseCode = "403", description = "Forbidden - Requires ADMIN role", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class)))
        })
        public ResponseEntity<com.recruitify.webapi.common.vo.ApiResponse<CompanyResponse>> updateCompany(
                        @PathVariable Long id,
                        @RequestPart("request") @Valid CompanyRequest request,
                        @RequestParam(value = "image", required = false) MultipartFile image) {
                CompanyResponse updateCompany = companyServiceImpl.updateCompany(id, request, image);
                return ResponseEntity.ok(com.recruitify.webapi.common.vo.ApiResponse.success(updateCompany,
                                "Update Company successfully"));
        }

        @DeleteMapping("/{id}")
        @PreAuthorize("hasAuthority('COMPANY_DELETE')")
        @Operation(summary = "Delete a company", description = "Deletes a Company by ID. Cannot delete if Company has associated news articles. Requires ADMIN role.", security = @SecurityRequirement(name = "bearerAuth"))
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "companies delete successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class))),
                        @ApiResponse(responseCode = "400", description = "Invalid request data or companies name already exists", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class))),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token missing or invalid", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class))),
                        @ApiResponse(responseCode = "403", description = "Forbidden - Requires ADMIN role", content = @Content(mediaType = "application/json", schema = @Schema(implementation = com.recruitify.webapi.common.vo.ApiResponse.class)))
        })
        public ResponseEntity<com.recruitify.webapi.common.vo.ApiResponse<Void>> deleteCompany(@PathVariable Long id) {
                companyServiceImpl.deleteCompany(id);
                return ResponseEntity.ok(com.recruitify.webapi.common.vo.ApiResponse.success(null,
                                "Company deleted successfully"));
        }
}
