package com.recruitify.webapi.api.pages.admin.jobmanagement.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.recruitify.webapi.api.pages.admin.jobmanagement.Services.Impl.JobServicesImpl;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Request.JobRequest;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Response.JobListResponse;
import com.recruitify.webapi.api.pages.admin.jobmanagement.dto.Response.JobResponse;
import com.recruitify.webapi.common.exception.ResourceNotFoundException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = JobControllers.class)
@AutoConfigureMockMvc(addFilters = false)
class JobControllersTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    @MockBean private JobServicesImpl jobServices;

    private JobResponse sampleJobResponse;
    private JobRequest validJobRequest;

    @BeforeEach
    void setUp() {
        Set<Long> skillIds = new HashSet<>();
        skillIds.add(100L);
        skillIds.add(101L);

        sampleJobResponse = JobResponse.builder()
                .id(1L)
                .title("Senior Java Developer")
                .description("Develop backend services")
                .requirement("5+ years Java")
                .salary(new BigDecimal("3000.00"))
                .isHidden(false)
                .companyId(1L)
                .companyName("Acme Corp")
                .categoryId(10L)
                .categoryName("Engineering")
                .employmentTypeId(20L)
                .employmentTypeName("Full-time")
                .wardCode("W001")
                .wardName("Ward 1")
                .status("Active")
                .skillIds(skillIds)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        validJobRequest = JobRequest.builder()
                .title("Senior Java Developer")
                .description("Develop backend services")
                .responsibilities("Code, review, mentor")
                .requirement("5+ years Java")
                .benefit("Health insurance")
                .salary(new BigDecimal("3000.00"))
                .isHidden(false)
                .companyId(1L)
                .categoryId(10L)
                .employmentTypeId(20L)
                .experienceLevelId(30L)
                .workApproachId(40L)
                .wardCode("W001")
                .skillIds(skillIds)
                .build();
    }

    // ===================== GET /api/v1/jobs =====================

    @Nested
    @DisplayName("GET /api/v1/jobs")
    class ListJobsEndpoint {

        @Test
        @DisplayName("returns 200 OK with paginated list")
        void listJobs_ok() throws Exception {
            JobListResponse page = JobListResponse.builder()
                    .jobs(List.of(sampleJobResponse))
                    .totalElements(1)
                    .totalPages(1)
                    .currentPage(0)
                    .pageSize(10)
                    .hasNext(false)
                    .hasPrevious(false)
                    .build();
            when(jobServices.listJobs(any(), any(), anyInt(), anyInt())).thenReturn(page);

            mockMvc.perform(get("/api/v1/jobs")
                            .param("keyword", "java")
                            .param("status", "ACTIVE")
                            .param("page", "0")
                            .param("size", "10"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.jobs[0].id", is(1)))
                    .andExpect(jsonPath("$.data.jobs[0].title", is("Senior Java Developer")))
                    .andExpect(jsonPath("$.data.totalElements", is(1)))
                    .andExpect(jsonPath("$.data.currentPage", is(0)))
                    .andExpect(jsonPath("$.message", is("Jobs retrieved successfully")));

            verify(jobServices, times(1)).listJobs(eq("java"), eq("ACTIVE"), eq(0), eq(10));
        }

        @Test
        @DisplayName("uses default page=0, size=10 when params omitted")
        void listJobs_defaults() throws Exception {
            when(jobServices.listJobs(any(), any(), anyInt(), anyInt()))
                    .thenReturn(JobListResponse.builder().jobs(List.of()).totalElements(0).totalPages(0).build());

            mockMvc.perform(get("/api/v1/jobs"))
                    .andExpect(status().isOk());

            verify(jobServices).listJobs(eq(null), eq(null), eq(0), eq(10));
        }
    }

    // ===================== POST /api/v1/jobs =====================

    @Nested
    @DisplayName("POST /api/v1/jobs")
    class CreateJobEndpoint {

        @Test
        @DisplayName("returns 201 Created with response body when valid request")
        void createJob_ok() throws Exception {
            when(jobServices.createJob(any(JobRequest.class))).thenReturn(sampleJobResponse);

            mockMvc.perform(post("/api/v1/jobs")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validJobRequest)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.data.id", is(1)))
                    .andExpect(jsonPath("$.data.title", is("Senior Java Developer")))
                    .andExpect(jsonPath("$.message", is("Job created successfully")));

            verify(jobServices, times(1)).createJob(any(JobRequest.class));
        }

        @Test
        @DisplayName("returns 400 Bad Request when title is blank (validation)")
        void createJob_validation_titleBlank() throws Exception {
            validJobRequest.setTitle("");

            mockMvc.perform(post("/api/v1/jobs")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validJobRequest)))
                    .andExpect(status().isBadRequest());

            verify(jobServices, times(0)).createJob(any(JobRequest.class));
        }

        @Test
        @DisplayName("returns 400 Bad Request when companyId is null (validation)")
        void createJob_validation_companyIdMissing() throws Exception {
            validJobRequest.setCompanyId(null);

            mockMvc.perform(post("/api/v1/jobs")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validJobRequest)))
                    .andExpect(status().isBadRequest());

            verify(jobServices, times(0)).createJob(any(JobRequest.class));
        }

        @Test
        @DisplayName("returns 400 Bad Request when wardCode is blank (validation)")
        void createJob_validation_wardCodeMissing() throws Exception {
            validJobRequest.setWardCode("");

            mockMvc.perform(post("/api/v1/jobs")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validJobRequest)))
                    .andExpect(status().isBadRequest());

            verify(jobServices, times(0)).createJob(any(JobRequest.class));
        }

        @Test
        @DisplayName("returns 400 Bad Request when body is malformed JSON")
        void createJob_malformedJson() throws Exception {
            mockMvc.perform(post("/api/v1/jobs")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{not valid json"))
                    .andExpect(status().isBadRequest());

            verify(jobServices, times(0)).createJob(any(JobRequest.class));
        }
    }

    // ===================== GET /api/v1/jobs/{id} =====================

    @Nested
    @DisplayName("GET /api/v1/jobs/{id}")
    class GetJobByIdEndpoint {

        @Test
        @DisplayName("returns 200 OK when job exists")
        void findById_ok() throws Exception {
            when(jobServices.findJobById(1L)).thenReturn(sampleJobResponse);

            mockMvc.perform(get("/api/v1/jobs/{id}", 1L))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.id", is(1)))
                    .andExpect(jsonPath("$.data.companyName", is("Acme Corp")))
                    .andExpect(jsonPath("$.message", is("Job retrieved successfully")));

            verify(jobServices).findJobById(1L);
        }

        @Test
        @DisplayName("propagates ResourceNotFoundException when job does not exist")
        void findById_notFound() throws Exception {
            when(jobServices.findJobById(404L))
                    .thenThrow(ResourceNotFoundException.create("Job", "id", 404L));

            // Without GlobalExceptionHandler in slice context, the framework returns 500 for the exception.
            // We only assert that the service was invoked (the handler is exercised in integration tests).
            mockMvc.perform(get("/api/v1/jobs/{id}", 404L))
                    .andExpect(status().isInternalServerError());

            verify(jobServices).findJobById(404L);
        }
    }

    // ===================== PATCH /api/v1/jobs/{id} =====================

    @Nested
    @DisplayName("PATCH /api/v1/jobs/{id}")
    class UpdateJobEndpoint {

        @Test
        @DisplayName("returns 200 OK with updated job")
        void updateJob_ok() throws Exception {
            JobResponse updated = JobResponse.builder()
                    .id(1L)
                    .title("Updated Title")
                    .description("Develop backend services")
                    .requirement("5+ years Java")
                    .status("Active")
                    .build();
            when(jobServices.updateJob(eq(1L), any(JobRequest.class))).thenReturn(updated);

            mockMvc.perform(patch("/api/v1/jobs/{id}", 1L)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validJobRequest)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.id", is(1)))
                    .andExpect(jsonPath("$.data.title", is("Updated Title")))
                    .andExpect(jsonPath("$.message", is("Job updated successfully")));

            verify(jobServices).updateJob(eq(1L), any(JobRequest.class));
        }

        @Test
        @DisplayName("returns 400 when required fields missing in body")
        void updateJob_validation() throws Exception {
            validJobRequest.setTitle(null);
            validJobRequest.setCompanyId(null);

            mockMvc.perform(patch("/api/v1/jobs/{id}", 1L)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validJobRequest)))
                    .andExpect(status().isBadRequest());

            verify(jobServices, times(0)).updateJob(anyLong(), any(JobRequest.class));
        }

        @Test
        @DisplayName("propagates 500 when service throws ResourceNotFoundException")
        void updateJob_notFound() throws Exception {
            when(jobServices.updateJob(eq(404L), any(JobRequest.class)))
                    .thenThrow(ResourceNotFoundException.create("Job", "id", 404L));

            mockMvc.perform(patch("/api/v1/jobs/{id}", 404L)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validJobRequest)))
                    .andExpect(status().isInternalServerError());

            verify(jobServices).updateJob(eq(404L), any(JobRequest.class));
        }
    }

    // ===================== DELETE /api/v1/jobs/{id} =====================

    @Nested
    @DisplayName("DELETE /api/v1/jobs/{id}")
    class DeleteJobEndpoint {

        @Test
        @DisplayName("returns 200 OK with success message when delete succeeds")
        void deleteJob_ok() throws Exception {
            doNothing().when(jobServices).deleteJob(1L);

            mockMvc.perform(delete("/api/v1/jobs/{id}", 1L))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.message", is("Job deleted successfully")));

            verify(jobServices).deleteJob(1L);
        }

        @Test
        @DisplayName("propagates 500 when service throws ResourceNotFoundException")
        void deleteJob_notFound() throws Exception {
            doThrow(ResourceNotFoundException.create("Job", "id", 404L))
                    .when(jobServices).deleteJob(404L);

            mockMvc.perform(delete("/api/v1/jobs/{id}", 404L))
                    .andExpect(status().isInternalServerError());

            verify(jobServices).deleteJob(404L);
        }
    }
}
