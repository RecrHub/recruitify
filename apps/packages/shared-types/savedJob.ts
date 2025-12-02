export interface SavedJob {
userId: string;
jobPostingId: string;
savedAt: string; // ISO datetime string
}


export interface SaveJobRequest {
userId: string;
jobPostingId: string;
}


export interface SaveJobStatusResponse {
isSaved: boolean;
}