'use client';

import React, { useState } from 'react';
import { Button, Breadcrumb, Tag, Space } from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  BookOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import BookMarkOutline from '@/access/icons/BookMarkOutline.svg';
import BookMarkSimple from '@/access/icons/BookmarkSimple.svg';
import LinkIcon from '@/access/icons/Link.svg';
import PhoneIcon from '@/access/icons/Phone.svg';
import EmailIcon from '@/access/icons/Email.svg';
import { useStyles } from './style';

interface JobDetailProps {
  jobId?: string;
}

const JobDetail: React.FC<JobDetailProps> = ({ jobId: _jobId }) => {
  const { styles } = useStyles();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // TODO: Use _jobId to fetch actual job data from API
  const jobData = {
    title: 'Senior UX Designer',
    company: 'MB',
    companyIcon: '📱',
    isFeature: true,
    isFulltime: true,
    website: 'https://instagram.com',
    email: 'career@instagram.com',
    phone: '(406) 555-0120',
    salary: '$50k-80k/month',
    location: 'New York, USA',
    jobType: 'Full Time',
    postedDate: '14 June, 2021',
    deadline: '14 July, 2021',
    education: 'Graduation',
    experience: '10-15 Years',
    description: `The arrangement of elements is the result of values. Stay steady and firm. Keep your mind focused on what truly matters. Don't let yourself be distracted by trivial things. Strive to achieve your goals. Live true to your values and always move forward. Let your life be filled with meaning and joy.`,
    responsibilities: [
      'Quisque semper gravida est et consectetur.',
      'Curabitur blandit lorem velit, vitae pretium leo placerat eget.',
      'Morbi mattis in ipsum ac tempus.',
      'Curabitur eu vehicula libero. Vestibulum sed purus ullamcorper, lobortis lectus nec.',
      'vulputate turpis. Quisque ante dola, iaculis a porttitor sit amet.',
      'lobortis vel lectus. Nulla ut risus ut diam.',
      'commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.',
      'odio metus posuere lorem. id condimentum erat velit nec neque.',
      'dui sodales ut. Curabitur tempus augue.',
    ],
    skills: ['Product Design', 'UI/ UX Design'],
    preferredQualifications: [
      '5-7 years of UX experience in an Enterprise or retail environment or a degree-able in a related field',
      '5-7 years of experience working with agile software development teams',
      'Desire to thrive in a fast-moving environment',
      'Demonstrated ability to initiate and self-manage complex projects',
      'Experience bringing together multiple efforts into a cohesive end-to-end experience',
    ],
    benefits: [
      'Insurance benefits',
      'Training programs / Training policy',
      'Bonus policy / Performance bonuses',
      'Salary increase / Annual raise',
      'Company trips and annual leave',
      'Allowances and business travel expenses',
      'Uniform provided / Company uniform',
    ],
    companyInfo: {
      name: 'Instagram',
      type: 'Private Company',
      size: '100-300 Employers',
      founded: 'March 21, 2006',
      phone: '(406) 555-0120',
      email: 'twitter@gmail.com',
      website: 'https://twitter.com',
    },
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbWrapper}>
        <Breadcrumb
          items={[
            { title: 'Home' },
            { title: 'Graphics & Design' },
            { title: 'JobDetails' },
          ]}
        />
      </div>

      {/* Job Header - Full Width */}
      <div className={styles.jobHeader}>
        <div className={styles.headerTop}>
          <div className={styles.companyIconWrapper}>
            <div className={styles.companyIcon}>
              <span>{jobData.companyIcon}</span>
            </div>
            <div className={styles.titleWrapper}>
              <h1 className={styles.jobTitle}>
                {jobData.title}
                {jobData.isFeature && (
                  <Tag className={styles.featureTag}>Featured</Tag>
                )}
                {jobData.isFulltime && (
                  <Tag className={styles.fulltimeTag}>Fulltime</Tag>
                )}
              </h1>
              <div className={styles.companyMeta}>
                <span className={styles.website}>
                  <LinkIcon className={styles.metaIcon} />
                  {jobData.website}
                </span>
                <span className={styles.separator}>•</span>
                <span className={styles.phone}>
                  <PhoneIcon className={styles.metaIcon} />
                  {jobData.phone}
                </span>
                <span className={styles.separator}>•</span>
                <span className={styles.email}>
                  <EmailIcon className={styles.metaIcon} />
                  {jobData.email}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.headerActions}>
            <Button
              icon={isBookmarked ? <BookMarkSimple /> : <BookMarkOutline />}
              className={styles.bookmarkButton}
              onClick={() => setIsBookmarked(!isBookmarked)}
            />
            <div className={styles.applyWrapper}>
              <Button type="primary" className={styles.applyButton}>
                Apply Now →
              </Button>
              <div className={styles.jobExpiry}>
                Job expire in: <span className={styles.expiryDate}>June 30, 2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Left Column - Job Details */}
        <div className={styles.leftColumn}>
          {/* Job Description */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Job Description</h2>
            <p className={styles.description}>{jobData.description}</p>
          </div>

          {/* Key Responsibilities */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Responsibilities</h2>
            <ul className={styles.list}>
              {jobData.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className={styles.skillsWrapper}>
              {jobData.skills.map((skill, index) => (
                <Tag key={index} className={styles.skillTag}>
                  {skill}
                </Tag>
              ))}
            </div>
          </div>

          {/* Preferred Qualification */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Preferred Qualification</h2>
            <ul className={styles.list}>
              {jobData.preferredQualifications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Benefit */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Benefit</h2>
            <ul className={styles.list}>
              {jobData.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Share this job */}
          <div className={styles.shareSection}>
            <span className={styles.shareText}>Share this job:</span>
            <Space size="middle">
              <Button
                icon={<FacebookOutlined />}
                className={styles.shareButton}
              >
                Facebook
              </Button>
              <Button
                icon={<TwitterOutlined />}
                className={styles.shareButton}
              >
                Facebook
              </Button>
              <Button
                icon={<LinkedinOutlined />}
                className={styles.shareButton}
              >
                Pinterest
              </Button>
            </Space>
          </div>
        </div>

        {/* Right Column - Job Overview & Company Info */}
        <div className={styles.rightColumn}>
          {/* Job Overview */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Job Overview</h3>
            <div className={styles.overviewGrid}>
              {/* Row 1 */}
              <div className={styles.overviewItem}>
                <CalendarOutlined className={styles.overviewIcon} />
                <div className={styles.overviewContent}>
                  <div className={styles.overviewLabel}>JOB POSTED:</div>
                  <div className={styles.overviewValue}>{jobData.postedDate}</div>
                </div>
              </div>

              <div className={styles.overviewItem}>
                <ClockCircleOutlined className={styles.overviewIcon} />
                <div className={styles.overviewContent}>
                  <div className={styles.overviewLabel}>JOB EXPIRE IN:</div>
                  <div className={styles.overviewValue}>{jobData.deadline}</div>
                </div>
              </div>

              <div className={styles.overviewItem}>
                <BookOutlined className={styles.overviewIcon} />
                <div className={styles.overviewContent}>
                  <div className={styles.overviewLabel}>EDUCATION</div>
                  <div className={styles.overviewValue}>{jobData.education}</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className={styles.overviewItem}>
                <DollarOutlined className={styles.overviewIcon} />
                <div className={styles.overviewContent}>
                  <div className={styles.overviewLabel}>SALARY:</div>
                  <div className={styles.overviewValue}>{jobData.salary}</div>
                </div>
              </div>

              <div className={styles.overviewItem}>
                <EnvironmentOutlined className={styles.overviewIcon} />
                <div className={styles.overviewContent}>
                  <div className={styles.overviewLabel}>LOCATION:</div>
                  <div className={styles.overviewValue}>{jobData.location}</div>
                </div>
              </div>

              <div className={styles.overviewItem}>
                <ClockCircleOutlined className={styles.overviewIcon} />
                <div className={styles.overviewContent}>
                  <div className={styles.overviewLabel}>JOB TYPE:</div>
                  <div className={styles.overviewValue}>{jobData.jobType}</div>
                </div>
              </div>

              {/* Row 3 - spans full width or single item */}
              <div className={styles.overviewItem}>
                <BookOutlined className={styles.overviewIcon} />
                <div className={styles.overviewContent}>
                  <div className={styles.overviewLabel}>EXPERIENCE</div>
                  <div className={styles.overviewValue}>{jobData.experience}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className={styles.card}>
            <div className={styles.companyHeader}>
              <div className={styles.companyLogoWrapper}>
                <span>📷</span>
              </div>
              <h3 className={styles.companyName}>{jobData.companyInfo.name}</h3>
              <p className={styles.companyDescription}>Social networking service</p>
            </div>

            <div className={styles.companyInfoGrid}>
              <div className={styles.companyInfoItem}>
                <span className={styles.companyInfoLabel}>Founded in:</span>
                <span className={styles.companyInfoValue}>
                  {jobData.companyInfo.founded}
                </span>
              </div>
              <div className={styles.companyInfoItem}>
                <span className={styles.companyInfoLabel}>Organization type:</span>
                <span className={styles.companyInfoValue}>
                  {jobData.companyInfo.type}
                </span>
              </div>
              <div className={styles.companyInfoItem}>
                <span className={styles.companyInfoLabel}>Company size:</span>
                <span className={styles.companyInfoValue}>
                  {jobData.companyInfo.size}
                </span>
              </div>
              <div className={styles.companyInfoItem}>
                <span className={styles.companyInfoLabel}>Phone:</span>
                <span className={styles.companyInfoValue}>
                  {jobData.companyInfo.phone}
                </span>
              </div>
              <div className={styles.companyInfoItem}>
                <span className={styles.companyInfoLabel}>Email:</span>
                <span className={styles.companyInfoValue}>
                  {jobData.companyInfo.email}
                </span>
              </div>
              <div className={styles.companyInfoItem}>
                <span className={styles.companyInfoLabel}>Website:</span>
                <span className={styles.companyInfoValue}>
                  {jobData.companyInfo.website}
                </span>
              </div>
            </div>

            <div className={styles.companySocials}>
              <Button
                icon={<FacebookOutlined />}
                className={styles.socialButton}
              />
              <Button
                icon={<TwitterOutlined />}
                className={styles.socialButton}
              />
              <Button
                icon={<LinkedinOutlined />}
                className={styles.socialButton}
              />
              <Button
                icon={<YoutubeOutlined />}
                className={styles.socialButton}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;

