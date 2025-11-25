'use client';

import React, { useState } from 'react';
import {
    Button,
    Card,
    Tag,
    Avatar,
    Pagination,
    Breadcrumb,
} from 'antd';
import {
    EnvironmentOutlined,
    BellOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import JobFilterForm, { JobFilters } from './JobFilterForm';
import JobSearchBarForm from './JobSearchBarForm';
import './FindJob.css';

// Calendar Icon Component
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13 1.75H11.75V1.5C11.75 1.30109 11.671 1.11032 11.5303 0.96967C11.3897 0.829018 11.1989 0.75 11 0.75C10.8011 0.75 10.6103 0.829018 10.4697 0.96967C10.329 1.11032 10.25 1.30109 10.25 1.5V1.75H5.75V1.5C5.75 1.30109 5.67098 1.11032 5.53033 0.96967C5.38968 0.829018 5.19891 0.75 5 0.75C4.80109 0.75 4.61032 0.829018 4.46967 0.96967C4.32902 1.11032 4.25 1.30109 4.25 1.5V1.75H3C2.66848 1.75 2.35054 1.8817 2.11612 2.11612C1.8817 2.35054 1.75 2.66848 1.75 3V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H13C13.3315 14.25 13.6495 14.1183 13.8839 13.8839C14.1183 13.6495 14.25 13.3315 14.25 13V3C14.25 2.66848 14.1183 2.35054 13.8839 2.11612C13.6495 1.8817 13.3315 1.75 13 1.75ZM4.25 3.25C4.25 3.44891 4.32902 3.63968 4.46967 3.78033C4.61032 3.92098 4.80109 4 5 4C5.19891 4 5.38968 3.92098 5.53033 3.78033C5.67098 3.63968 5.75 3.44891 5.75 3.25H10.25C10.25 3.44891 10.329 3.63968 10.4697 3.78033C10.6103 3.92098 10.8011 4 11 4C11.1989 4 11.3897 3.92098 11.5303 3.78033C11.671 3.63968 11.75 3.44891 11.75 3.25H12.75V4.75H3.25V3.25H4.25ZM3.25 12.75V6.25H12.75V12.75H3.25Z" fill="#616A75"/>
    </svg>
);

// Clock Icon Component
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.25C6.66498 1.25 5.35994 1.64588 4.2499 2.38758C3.13987 3.12928 2.27471 4.18349 1.76382 5.41689C1.25292 6.65029 1.11925 8.00749 1.3797 9.31686C1.64015 10.6262 2.28303 11.829 3.22703 12.773C4.17104 13.717 5.37377 14.3598 6.68314 14.6203C7.99252 14.8808 9.34971 14.7471 10.5831 14.2362C11.8165 13.7253 12.8707 12.8601 13.6124 11.7501C14.3541 10.6401 14.75 9.33502 14.75 8C14.748 6.2104 14.0362 4.49466 12.7708 3.22922C11.5053 1.96378 9.78961 1.25199 8 1.25ZM8 13.25C6.96165 13.25 5.94662 12.9421 5.08326 12.3652C4.2199 11.7883 3.547 10.9684 3.14964 10.0091C2.75228 9.04978 2.64831 7.99418 2.85088 6.97578C3.05345 5.95738 3.55347 5.02191 4.28769 4.28769C5.02192 3.55346 5.95738 3.05345 6.97578 2.85088C7.99418 2.6483 9.04978 2.75227 10.0091 3.14963C10.9684 3.54699 11.7883 4.2199 12.3652 5.08326C12.9421 5.94661 13.25 6.96165 13.25 8C13.2485 9.39193 12.6949 10.7264 11.7107 11.7107C10.7264 12.6949 9.39193 13.2485 8 13.25ZM12.25 8C12.25 8.19891 12.171 8.38968 12.0303 8.53033C11.8897 8.67098 11.6989 8.75 11.5 8.75H8C7.80109 8.75 7.61032 8.67098 7.46967 8.53033C7.32902 8.38968 7.25 8.19891 7.25 8V4.5C7.25 4.30109 7.32902 4.11032 7.46967 3.96967C7.61032 3.82902 7.80109 3.75 8 3.75C8.19892 3.75 8.38968 3.82902 8.53033 3.96967C8.67098 4.11032 8.75 4.30109 8.75 4.5V7.25H11.5C11.6989 7.25 11.8897 7.32902 12.0303 7.46967C12.171 7.61032 12.25 7.80109 12.25 8Z" fill="#616A75"/>
    </svg>
);

// Bookmark Icon Components
const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M17.4495 2.625H6.94946C6.45218 2.625 5.97527 2.82254 5.62364 3.17417C5.27201 3.52581 5.07446 4.00272 5.07446 4.5V21C5.0744 21.2008 5.1281 21.3981 5.23 21.5711C5.3319 21.7442 5.47828 21.8869 5.65393 21.9843C5.82959 22.0817 6.02812 22.1302 6.2289 22.125C6.42968 22.1197 6.62539 22.0608 6.79571 21.9544L12.1985 18.5794L17.6032 21.9544C17.7735 22.0608 17.9692 22.1197 18.17 22.125C18.3708 22.1302 18.5693 22.0817 18.745 21.9843C18.9206 21.8869 19.067 21.7442 19.1689 21.5711C19.2708 21.3981 19.3245 21.2008 19.3245 21V4.5C19.3245 4.00272 19.1269 3.52581 18.7753 3.17417C18.4237 2.82254 17.9467 2.625 17.4495 2.625ZM17.0745 18.9703L12.7948 16.2956C12.616 16.1839 12.4094 16.1246 12.1985 16.1246C11.9877 16.1246 11.7811 16.1839 11.6023 16.2956L7.32446 18.9703V4.875H17.0745V18.9703Z" fill="#00AA6C" />
    </svg>
);

const BookmarkFilledIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M17.4495 2.625H6.94946C6.45218 2.625 5.97527 2.82254 5.62364 3.17417C5.27201 3.52581 5.07446 4.00272 5.07446 4.5V21C5.0744 21.2008 5.1281 21.3981 5.23 21.5711C5.3319 21.7442 5.47828 21.8869 5.65393 21.9843C5.82959 22.0817 6.02812 22.1302 6.2289 22.125C6.42968 22.1197 6.62539 22.0608 6.79571 21.9544L12.1985 18.5794L17.6032 21.9544C17.7735 22.0608 17.9692 22.1197 18.17 22.125C18.3708 22.1302 18.5693 22.0817 18.745 21.9843C18.9206 21.8869 19.067 21.7442 19.1689 21.5711C19.2708 21.3981 19.3245 21.2008 19.3245 21V4.5C19.3245 4.00272 19.1269 3.52581 18.7753 3.17417C18.4237 2.82254 17.9467 2.625 17.4495 2.625Z" fill="#00AA6C" />
    </svg>
);

// Mock data for job listings
const mockJobs = Array(5).fill(null).map((_, index) => ({
    id: index + 1,
    company: 'Hopin',
    position: 'Frontend Developer',
    logo: '/assets/logo.jpg',
    salary: '$90-120/hr',
    location: 'Hybrid, North America',
    timezone: 'UTC-5',
    hours: '20+ hrs/wk',
    posted: 'Posted Apr 6, 2025',
    skills: ['Tailwind CSS', 'React.js', 'JavaScript', 'CSS3', 'TypeScript']
}));

const FindJobForm = () => {
    const [filters, setFilters] = useState<JobFilters | null>(null);
    const [favorites, setFavorites] = useState(new Set<number>());

    const handleFilterChange = (newFilters: JobFilters) => {
        console.log('Filters changed:', newFilters);
        setFilters(newFilters);
    };

    const handleSearch = (keyword: string) => {
        console.log('Search:', { keyword, filters });
        // TODO: Implement search logic here
    };

    const toggleFavorite = (jobId: number) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(jobId)) {
                newFavorites.delete(jobId);
            } else {
                newFavorites.add(jobId);
            }
            return newFavorites;
        });
    };


    return (
        <div className="find-job-container">
            {/* Header */}
            <div className="header">
                <div className="logo">
                    <div className="logo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="24" viewBox="0 0 41 24" fill="none">
                            <path d="M12.542 10.5V23.5H1V10.5H12.542Z" fill="black" stroke="black" />
                            <path d="M30.2649 16.7662L30.0862 16.6168L21.7249 9.61682L21.5852 9.49963H13.5422V1.16663H25.3831L39.717 14.8795V23.4996H30.2649V16.7662Z" fill="black" stroke="black" />
                        </svg>
                    </div>
                    <span className="logo-text">Recruitify</span>
                </div>
                <nav className="nav-menu">
                    <a href="#" className="nav-link">Favourite Jobs</a>
                    <a href="#" className="nav-link">Applied Jobs</a>
                    <a href="#" className="nav-link">Job History</a>
                </nav>
                <div className="header-actions">
                    <Button type="link" className="employer-link">For Employers</Button>
                    <div className="notification-icon">
                        <BellOutlined style={{ fontSize: '20px' }} />
                    </div>
                    <Avatar size={36} src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                </div>
            </div>

            {/* Header bottom — use Ant Design Breadcrumb */}
            <div className="header-bottom">
                <div className="header-bottom-inner">
                    <div className="page-title">Find Job</div>

                    {/* Ant Design Breadcrumb - last item is not a link */}
                    <Breadcrumb
                        separator=" / "
                        className="page-breadcrumb"
                        aria-label="Breadcrumb"
                        items={[
                            {
                                key: 'home',
                                title: (
                                    <>
                                        <HomeOutlined />
                                        <span style={{ marginLeft: 6 }}>Home</span>
                                    </>
                                ),
                                href: '#',
                            },
                            { key: 'category', title: 'Graphics & Design', href: '#' },
                            { key: 'details', title: 'JobDetails' },
                        ]}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Sidebar - JobFilterForm */}
                <div className="sidebar">
                    <JobFilterForm onFilterChange={handleFilterChange} />
                </div>

                {/* Job Listings */}
                <div className="job-listings">
                    {/* Search Bar */}
                    <JobSearchBarForm onSearch={handleSearch} />

                    {/* Job Cards */}
                    <div style={{
                        maxHeight: 'calc(100vh - 450px)',
                        overflowY: 'auto',
                        paddingRight: '8px',
                        marginBottom: '16px',
                    }}>
                        <div className="job-cards">
                            {mockJobs.map((job) => (
                                <Card key={job.id} className="job-card" hoverable>
                                    <div className="job-card-content">
                                        {/* Top Section: Logo, Info, Bookmark, Salary */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                            {/* Left: Logo + Company + Position */}
                                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1 }}>
                                                <div className="company-logo">
                                                    <div style={{
                                                        width: '48px',
                                                        height: '48px',
                                                        backgroundColor: '#0066FF',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0,
                                                    }}>
                                                        <span style={{ color: '#fff', fontSize: '20px', fontWeight: 600 }}>{job.position.charAt(0)}</span>
                                                    </div>
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <h3 className="company-name" style={{ margin: 0, fontSize: '20px', fontWeight: 600, lineHeight: '1.4' }}>{job.position}</h3>
                                                    <p className="position-title" style={{ margin: '2px 0 0 0', fontSize: '18px', color: '#666', lineHeight: '1.4' }}>{job.company}</p>
                                                </div>
                                            </div>

                                            {/* Right: Bookmark + Salary + Details */}
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', marginLeft: '16px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                    <Button
                                                        type="text"
                                                        icon={favorites.has(job.id) ? <BookmarkFilledIcon /> : <BookmarkIcon />}
                                                        onClick={() => toggleFavorite(job.id)}
                                                        className="favorite-btn"
                                                        style={{ padding: 0, height: 'auto', minWidth: 'auto' }}
                                                    />
                                                </div>
                                                <div className="salary" style={{ fontSize: '19px', fontWeight: 600, color: '#000', lineHeight: '1.4' }}>{job.salary}</div>

                                                {/* Location, Timezone, Hours on right */}
                                                <div style={{ display: 'flex', gap: '8px', fontSize: '15px', color: '#666', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
                            <EnvironmentOutlined style={{ fontSize: '14px' }} /> {job.location}
                          </span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
                            <ClockIcon /> {job.timezone}
                          </span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
                            <CalendarIcon /> {job.hours}
                          </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skills Section */}
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', marginLeft: '60px' }}>
                                            {job.skills.map((skill, idx) => (
                                                <Tag
                                                    key={idx}
                                                    className="skill-tag"
                                                    style={{
                                                        margin: 0,
                                                        fontSize: '18px',
                                                        padding: '4px 14px',
                                                        borderRadius: '100px',
                                                        lineHeight: '1.5',
                                                    }}
                                                >
                                                    {skill}
                                                </Tag>
                                            ))}
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginLeft: '150px' }}>
                                                <span className="posted-date" style={{ fontSize: '12px', color: '#999' }}>{job.posted}</span>
                                                <Button className="apply-btn" style={{ height: '36px', padding: '0 20px', fontSize: '14px' }}>
                                                    Apply Job
                                                </Button>
                                            </div>
                                        </div>
                                        {/* Footer: Posted Date + Apply Button */}

                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '16px 0',
                    }}>
                        <Pagination
                            current={1}
                            total={50}
                            pageSize={12}
                            showSizeChanger={false}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Company</h4>
                        <a href="#">Features</a>
                        <a href="#">Pricing</a>
                    </div>
                    <div className="footer-section">
                        <h4>Resources</h4>
                        <a href="#">Insights</a>
                        <a href="#">Review</a>
                    </div>
                    <div className="footer-section">
                        <h4>Legal</h4>
                        <a href="#">Testimonials</a>
                    </div>
                    <div className="footer-section">
                        <h4>Stay connected</h4>
                        <div className="social-icons">
                            <a href="#" className="social-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <g clipPath="url(#clip0_1263_1093)">
                                        <path d="M12.3999 0.100412L10.3259 0.0974121C7.99493 0.0974121 6.48793 1.64341 6.48793 4.03541V5.85041H4.40193C4.35903 5.85041 4.31656 5.85888 4.27694 5.87532C4.23733 5.89177 4.20134 5.91587 4.17106 5.94625C4.14077 5.97663 4.11678 6.01268 4.10046 6.05235C4.08413 6.09202 4.0758 6.13452 4.07593 6.17741V8.80741C4.07593 8.98741 4.22193 9.13341 4.40193 9.13341H6.48793V15.7714C6.48793 15.9514 6.63393 16.0974 6.81393 16.0974H9.53593C9.71593 16.0974 9.86193 15.9514 9.86193 15.7714V9.13341H12.3019C12.4819 9.13341 12.6279 8.98741 12.6279 8.80741V6.17741C12.6279 6.09103 12.5938 6.00816 12.5329 5.94689C12.472 5.88562 12.3893 5.85094 12.3029 5.85041H9.86293V4.31141C9.86293 3.57141 10.0389 3.19641 11.0029 3.19641H12.3999C12.5799 3.19641 12.7259 3.04941 12.7259 2.86941V0.427412C12.7261 0.384517 12.7177 0.342018 12.7014 0.30235C12.6851 0.262683 12.6611 0.226626 12.6308 0.196249C12.6005 0.165871 12.5645 0.141768 12.5249 0.125323C12.4853 0.108877 12.4428 0.100412 12.3999 0.100412Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1263_1093">
                                            <rect width="16" height="16" fill="white" transform="translate(0.399902 0.0974121)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                            <a href="#" className="social-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <g clipPath="url(#clip0_1263_1100)">
                                        <path d="M2.32334 0.111167C2.06688 0.104914 1.81176 0.150027 1.573 0.243849C1.33424 0.337671 1.11666 0.478307 0.933064 0.65748C0.74947 0.836652 0.603572 1.05074 0.503958 1.28714C0.404344 1.52355 0.353027 1.77749 0.353027 2.03402C0.353027 2.29056 0.404344 2.5445 0.503958 2.7809C0.603572 3.01731 0.74947 3.2314 0.933064 3.41057C1.11666 3.58974 1.33424 3.73038 1.573 3.8242C1.81176 3.91802 2.06688 3.96313 2.32334 3.95688C2.82519 3.94465 3.30238 3.73669 3.653 3.37742C4.00362 3.01814 4.19988 2.53603 4.19988 2.03402C4.19988 1.53202 4.00362 1.0499 3.653 0.690632C3.30238 0.33136 2.82519 0.123403 2.32334 0.111167ZM0.662766 5.41402H3.97934V16.0837H0.662766V5.41402ZM12.4228 5.15117C10.8102 5.15117 9.72791 6.03574 9.28562 6.8746H9.24105V5.41631H6.06048V16.0849H9.37477V10.8072C9.37477 9.41631 9.63762 8.06774 11.3633 8.06774C13.0639 8.06774 13.0868 9.65974 13.0868 10.8963V16.0849H16.4011V10.2346C16.4011 7.36145 15.7805 5.15231 12.4239 5.15231L12.4228 5.15117Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1263_1100">
                                            <rect width="16" height="16" fill="white" transform="translate(0.399902 0.0974121)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                            <a href="#" className="social-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <g clipPath="url(#clip0_1263_1107)">
                                        <mask id="mask0_1263_1107" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                                            <path d="M0.399902 0.0974121H16.3999V16.0974H0.399902V0.0974121Z" fill="white" />
                                        </mask>
                                        <g mask="url(#mask0_1263_1107)">
                                            <path d="M11.3999 0.0974121H5.3999C4.07382 0.0974121 2.80205 0.624196 1.86437 1.56188C0.926687 2.49956 0.399902 3.77133 0.399902 5.09741L0.399902 11.0974C0.399902 12.4235 0.926687 13.6953 1.86437 14.6329C2.80205 15.5706 4.07382 16.0974 5.3999 16.0974H11.3999C12.726 16.0974 13.9978 15.5706 14.9354 14.6329C15.8731 13.6953 16.3999 12.4235 16.3999 11.0974V5.09741C16.3999 3.77133 15.8731 2.49956 14.9354 1.56188C13.9978 0.624196 12.726 0.0974121 11.3999 0.0974121ZM14.8999 11.0974C14.8999 13.0274 13.3299 14.5974 11.3999 14.5974H5.3999C3.4699 14.5974 1.8999 13.0274 1.8999 11.0974V5.09741C1.8999 3.16741 3.4699 1.59741 5.3999 1.59741H11.3999C13.3299 1.59741 14.8999 3.16741 14.8999 5.09741V11.0974Z" fill="white" />
                                            <path d="M8.3999 4.09738C7.33904 4.09738 6.32162 4.51881 5.57148 5.26895C4.82133 6.0191 4.3999 7.03651 4.3999 8.09738C4.3999 9.15825 4.82133 10.1757 5.57148 10.9258C6.32162 11.676 7.33904 12.0974 8.3999 12.0974C9.46077 12.0974 10.4782 11.676 11.2283 10.9258C11.9785 10.1757 12.3999 9.15825 12.3999 8.09738C12.3999 7.03651 11.9785 6.0191 11.2283 5.26895C10.4782 4.51881 9.46077 4.09738 8.3999 4.09738ZM8.3999 10.5974C7.7371 10.5966 7.10168 10.3329 6.63301 9.86427C6.16434 9.3956 5.9007 8.76018 5.8999 8.09738C5.8999 6.71838 7.0219 5.59738 8.3999 5.59738C9.7779 5.59738 10.8999 6.71838 10.8999 8.09738C10.8999 9.47538 9.7779 10.5974 8.3999 10.5974ZM12.6989 4.33138C12.7689 4.33138 12.8382 4.31759 12.9029 4.29081C12.9675 4.26402 13.0263 4.22476 13.0758 4.17527C13.1253 4.12578 13.1645 4.06702 13.1913 4.00235C13.2181 3.93768 13.2319 3.86838 13.2319 3.79838C13.2319 3.72839 13.2181 3.65908 13.1913 3.59441C13.1645 3.52974 13.1253 3.47099 13.0758 3.42149C13.0263 3.372 12.9675 3.33274 12.9029 3.30595C12.8382 3.27917 12.7689 3.26538 12.6989 3.26538C12.5575 3.26538 12.422 3.32154 12.322 3.42149C12.2221 3.52145 12.1659 3.65702 12.1659 3.79838C12.1659 3.93974 12.2221 4.07531 12.322 4.17527C12.422 4.27523 12.5575 4.33138 12.6989 4.33138Z" fill="white" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1263_1107">
                                            <rect width="16" height="16" fill="white" transform="translate(0.399902 0.0974121)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-left">
                        <div className="footer-logo">
                            <div className="logo-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="24" viewBox="0 0 41 24" fill="none">
                                    <path d="M12.542 10.5V23.5H1V10.5H12.542Z" fill="black" stroke="black" />
                                    <path d="M30.2649 16.7662L30.0862 16.6168L21.7249 9.61682L21.5852 9.49963H13.5422V1.16663H25.3831L39.717 14.8795V23.4996H30.2649V16.7662Z" fill="black" stroke="black" />
                                </svg>
                            </div>
                            <span className="logo-text">Recruitify</span>
                        </div>
                        <p className="footer-description">
                            Recruitify is designed to<br />
                            revolutionize<br />
                            how businesses operate.
                        </p>
                    </div>
                    <p className="copyright">© 2025 Recruitify, Inc. All rights reserved</p>
                </div>
            </footer>
        </div>
    );
};
export default FindJobForm;
