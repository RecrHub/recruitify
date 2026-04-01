import api from "./api";

export interface FeatureJob {
    id: number;
    title: string;
    companyName: string;
    companyLogo: string;
    location: string;
    salaryRange: string;
    createAt: string;
    employmentType: string;
}

export interface FeatureCompany {
    id: number;
    companyTitle: string;
    companyImg: string;
    companyOver: string;
}

export interface Category {
    id: number;
    name: string;
    jobCount: number;
}

export interface homePageData {
    featureJobs: FeatureJob[];
    featureCompanies: FeatureCompany[];
    categories: Category[];
    stats: {
        totalJobs: number;
        totalCompanies: number;
        totalUsers: number;
    }
}

export const homepageService = {
    async getHomepageData(): Promise<homePageData> {
        const res = await api.get('api/v1/homepage');
        return res.data;
    }
}