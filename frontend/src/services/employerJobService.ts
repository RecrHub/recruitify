import api from "./apiAdmin/api";
import { Job } from "../types/job";

export interface ApiJob extends Job {
  responsibilities?: string;
  requirement?: string;
  benefit?: string;
  minSalary?: number;
  maxSalary?: number;
  isHidden?: boolean;
  companyId?: number;
  categoryId?: number;
  categoryName?: string;
  employmentTypeId?: number;
  employmentTypeName?: string;
  experienceLevelId?: number;
  experienceLevelName?: string;
  workApproachId?: number;
  workApproachName?: string;
  wardCode?: string;
  wardName?: string;
  provinceName?: string;
  status?: string;
  skillsName?: string[];
  applied?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedJobsResponse {
  jobs: ApiJob[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface JobsQueryParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: 'ACTIVE' | 'DRAFT' | 'CLOSED';
  categoryIds?: number[];
  wardCodes?: string[];
  employmentTypeIds?: number[];
  createdDate?: string;
}

export type JobFilterOption = {
  id: number;
  label: string;
};

const normalizeFilterOptions = (data: unknown): JobFilterOption[] => {
  const payload = (data as { data?: unknown })?.data ?? data;
  const list = Array.isArray(payload) ? payload : [];

  return list.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const source = item as Record<string, unknown>;
    const id = Number(source.id ?? source.value);
    const label = source.name ?? source.label ?? source.title;

    if (!Number.isFinite(id) || label === undefined) return [];
    return [{ id, label: String(label) }];
  });
};

export const employerJobService = {
  async getJobs(params: JobsQueryParams | number = {}): Promise<PaginatedJobsResponse> {
    const queryParams = typeof params === 'number' ? { page: params } : params;
    const {
      page = 0,
      pageSize = 20,
      keyword,
      status,
      categoryIds = [],
      wardCodes = [],
      employmentTypeIds = [],
      createdDate,
    } = queryParams;
    const selectedCategoryIds = categoryIds.filter((categoryId) => Number.isFinite(categoryId));
    const selectedWardCodes = wardCodes.filter(Boolean);
    const selectedEmploymentTypeIds = employmentTypeIds.filter((employmentTypeId) =>
      Number.isFinite(employmentTypeId),
    );

    const res = await api.get('/api/v1/hr/jobs', {
      params: {
        page,
        size: pageSize,
        keyword: keyword || undefined,
        status,
        categoryId: selectedCategoryIds.length === 1 ? selectedCategoryIds[0] : undefined,
        categoryIds: selectedCategoryIds.length > 1 ? selectedCategoryIds.join(',') : undefined,
        wardCode: selectedWardCodes.length === 1 ? selectedWardCodes[0] : undefined,
        wardCodes: selectedWardCodes.length > 1 ? selectedWardCodes.join(',') : undefined,
        employmentTypeId: selectedEmploymentTypeIds.length === 1 ? selectedEmploymentTypeIds[0] : undefined,
        employmentTypeIds:
          selectedEmploymentTypeIds.length > 1 ? selectedEmploymentTypeIds.join(',') : undefined,
        createdDate: createdDate || undefined,
      },
    });

    const payload = res.data?.data ?? res.data;
    const jobs = payload.jobs ?? payload.items ?? payload.content ?? [];
    const totalElements = payload.totalElements ?? payload.totalItems ?? payload.total ?? jobs.length;

    return {
      jobs,
      currentPage: payload.currentPage ?? payload.page ?? page,
      totalPages: payload.totalPages ?? Math.max(1, Math.ceil(totalElements / pageSize)),
      totalElements,
      pageSize: payload.pageSize ?? payload.size ?? pageSize,
      hasNext: payload.hasNext ?? page + 1 < (payload.totalPages ?? Math.ceil(totalElements / pageSize)),
      hasPrevious: payload.hasPrevious ?? page > 0,
    };
  },

  async getJobById(id: string | number): Promise<Job> {
    const res = await api.get(`/api/v1/hr/jobs/${id}`);
    return res.data.data ?? res.data;
  },

};

