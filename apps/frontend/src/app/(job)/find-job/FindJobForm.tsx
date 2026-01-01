'use client';

import  { useState } from 'react';
import { Pagination, Breadcrumb } from 'antd';
import JobFilterForm from '@/components/FilterForm/index';
import type { JobFilters } from '@/components/FilterForm/index';
import JobSearchBarForm from './JobSearchBarForm';
import JobCardList from '@/components/JobCardList';
import { generateMockJobs } from '@/components/JobCardList/mockdata';
import type { Job } from '@/components/JobCardList/type';
import Grid from '@/components/Grid';
import { useStyles } from './styles';

const FindJobForm = () => {
    const { styles, cx } = useStyles();
    // State management
    const [allJobs] = useState(generateMockJobs(50)); // Generate 50 jobs
    const [filteredJobs, setFilteredJobs] = useState(allJobs);
    const [displayedJobs, setDisplayedJobs] = useState(allJobs.slice(0, 12));
    const [favorites, setFavorites] = useState<Set<number>>(new Set());
    const [filters, setFilters] = useState<JobFilters>({
        category: 'Marketing',
        jobType: [],
        experienceLevel: [],
        workApproad: [],
        salaryRange: [10, 5000],
        salaryOptions: [],
    });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    // Filter logic
    const applyFilters = (
        jobs: Job[],
        currentFilters: JobFilters,
        keyword: string
    ) => {
        let filtered = jobs;

        // Search by keyword
        if (keyword) {
            filtered = filtered.filter(
                (job) =>
                    job.position.toLowerCase().includes(keyword.toLowerCase()) ||
                    job.company.toLowerCase().includes(keyword.toLowerCase()) ||
                    job.skills.some((skill) =>
                        skill.toLowerCase().includes(keyword.toLowerCase())
                    )
            );
        }

        // Filter by job type
        if (currentFilters.jobType.length > 0) {
            filtered = filtered.filter((job) =>
                currentFilters.jobType.includes(job.type || '')
            );
        }

        // Filter by experience level
        if (currentFilters.experienceLevel.length > 0) {
            filtered = filtered.filter((job) =>
                currentFilters.experienceLevel.includes(job.experienceLevel || '')
            );
        }

        // Filter by work approach
        if (currentFilters.workApproad.length > 0) {
            const hasRemote = currentFilters.workApproad.includes('Remote');
            const hasOnSite = currentFilters.workApproad.includes('On-Site');

            filtered = filtered.filter((job) => {
                if (hasRemote && job.location.toLowerCase().includes('remote')) {
                    return true;
                }
                if (hasOnSite && !job.location.toLowerCase().includes('remote')) {
                    return true;
                }
                return false;
            });
        }

        // Filter by salary range
        const [minSalary, maxSalary] = currentFilters.salaryRange;
        filtered = filtered.filter((job) => {
            const salaryMatch = job.salary.match(/\$(\d+)/g);
            if (salaryMatch && salaryMatch.length >= 1) {
                const jobMinSalary = parseInt(salaryMatch[0].replace(/\$/g, ''));
                return jobMinSalary >= minSalary && jobMinSalary <= maxSalary;
            }
            return true;
        });

        return filtered;
    };

    // Handle filter change
    const handleFilterChange = (newFilters: JobFilters) => {
        setFilters(newFilters);
        setLoading(true);

        setTimeout(() => {
            const filtered = applyFilters(allJobs, newFilters, searchKeyword);
            setFilteredJobs(filtered);
            setDisplayedJobs(filtered.slice(0, pageSize));
            setCurrentPage(1);
            setLoading(false);
        }, 300);
    };

    // Handle search
    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
        setLoading(true);

        setTimeout(() => {
            const filtered = applyFilters(allJobs, filters, keyword);
            setFilteredJobs(filtered);
            setDisplayedJobs(filtered.slice(0, pageSize));
            setCurrentPage(1);
            setLoading(false);
        }, 300);
    };

    // Handle pagination change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setDisplayedJobs(filteredJobs.slice(startIndex, endIndex));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className={cx(styles.findJobContainer)}>
            {/* Header Bottom */}
            <div className={styles.headerBottom}>
                <div className={styles.headerBottomInner}>
                    <h1 className={styles.pageTitle}>Find Job</h1>
                    <Breadcrumb
                        className={styles.pageBreadcrumb}
                        items={[
                            {
                                href: '/',
                                title: 'Home',
                            },
                            {
                                title: 'Find Job',
                            },
                        ]}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Sidebar - JobFilterForm */}
                <aside className={styles.sidebar}>
                    <JobFilterForm onFilterChange={handleFilterChange} />
                </aside>

                {/* Job Listings */}
                <div className={styles.jobListings}>
                    {/* Search Bar */}
                    <JobSearchBarForm onSearch={handleSearch} />

                    {/* Results Count */}
                    <div className={styles.resultsCount}>
                        {loading ? (
                            'Searching...'
                        ) : (
                            <>
                                <span className="count">{filteredJobs.length}</span> jobs found
                            </>
                        )}
                    </div>

                    {/* Job Cards Grid */}
                    {!loading && displayedJobs.length > 0 && (
                        <Grid width="100%" gap={17} rows={1} maxItemWidth={200}>
                            {displayedJobs.map((job) => (
                                <JobCardList
                                    key={job.id}  // Thêm dòng này
                                    // job={job}
                                // ... các props khác nếu có
                                />
                            ))}
                        </Grid>
                    )}

                    {/* No Results */}
                    {!loading && displayedJobs.length === 0 && (
                        <div className={styles.noResults}>
                            <p>No jobs found matching your criteria.</p>
                            <p>Try adjusting your filters or search keywords.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && filteredJobs.length > 0 && (
                        <div className={styles.paginationWrapper}>
                            <Pagination
                                current={currentPage}
                                total={filteredJobs.length}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                                showTotal={(total, range) =>
                                    `${range[0]}-${range[1]} of ${total} jobs`
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindJobForm;