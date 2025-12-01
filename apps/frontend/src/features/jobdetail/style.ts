import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    max-width: 1320px;
    margin: 0 auto;
    padding: 40px 24px;
    background-color: #f8f9fa;
    min-height: calc(100vh - 64px);
  `,

  breadcrumbWrapper: css`
    margin-bottom: 24px;

    .ant-breadcrumb {
      font-size: 14px;
      color: #767f8c;

      .ant-breadcrumb-link {
        color: #767f8c;
      }

      .ant-breadcrumb-separator {
        color: #767f8c;
      }
    }
  `,

  content: css`
    display: grid;
    grid-template-columns: 1fr 460px;
    gap: 32px;
    align-items: start;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  `,

  leftColumn: css`
    display: flex;
    flex-direction: column;
    gap: 32px;
  `,

  rightColumn: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: sticky;
    top: 24px;
  `,

  jobHeader: css`
    background: #ffffff;
    border-radius: 8px;
    padding: 24px;
    border: 1px solid #e4e5e8;
    margin-bottom: 24px;
    width: 100%;
  `,

  headerTop: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    gap: 16px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,

  companyIconWrapper: css`
    display: flex;
    gap: 16px;
    align-items: flex-start;
    flex: 1;
  `,

  companyIcon: css`
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #ec4899 0%, #ef4444 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
  `,

  titleWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  `,

  jobTitle: css`
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    color: #18191c;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  `,

  featureTag: css`
    background-color: #ffeded;
    color: #e05151;
    border: none;
    border-radius: 4px;
    padding: 2px 12px;
    font-size: 13px;
    font-weight: 500;
  `,

  fulltimeTag: css`
    background-color: #e7f6ea;
    color: #0ba02c;
    border: none;
    border-radius: 4px;
    padding: 2px 12px;
    font-size: 13px;
    font-weight: 500;
  `,

  companyMeta: css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #767f8c;
    flex-wrap: wrap;
  `,

  metaIcon: css`
    width: 16px;
    height: 16px;
    color: #5e6670;
    flex-shrink: 0;
  `,

  website: css`
    display: flex;
    align-items: center;
    gap: 4px;
    color: #5e6670;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #0a65cc;
    }
  `,

  separator: css`
    color: #d6ddeb;
  `,

  phone: css`
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  email: css`
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  headerActions: css`
    display: flex;
    gap: 12px;
    align-items: flex-start;
  `,

  applyWrapper: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  `,

  bookmarkButton: css`
    width: 48px;
    height: 48px;
    border: 1px solid #e4e5e8;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    cursor: pointer;
    padding: 0;

    &:hover {
      border-color: #0a65cc !important;
      background: #f1f7ff !important;
    }

    svg {
      width: 24px;
      height: 24px;
      color: #18191c;
    }
  `,

  applyButton: css`
    height: 48px;
    padding: 0 32px;
    background: #18191c;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background: #000000 !important;
    }
  `,

  jobExpiry: css`
    font-size: 13px;
    color: #767f8c;
    text-align: right;
    line-height: 18px;
  `,

  expiryDate: css`
    color: #e05151;
    font-weight: 500;
  `,

  section: css`
    background: #ffffff;
    border-radius: 8px;
    padding: 32px;
    border: 1px solid #e4e5e8;
  `,

  sectionTitle: css`
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    color: #18191c;
    margin: 0 0 16px 0;
  `,

  description: css`
    font-size: 14px;
    line-height: 24px;
    color: #5e6670;
    margin: 0;
  `,

  list: css`
    margin: 0;
    padding-left: 24px;
    list-style-type: disc;

    li {
      font-size: 14px;
      line-height: 24px;
      color: #5e6670;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  `,

  skillsWrapper: css`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  `,

  skillTag: css`
    background-color: #f1f2f4;
    color: #474c54;
    border: none;
    border-radius: 4px;
    padding: 6px 16px;
    font-size: 14px;
    font-weight: 500;
    margin: 0;
  `,

  shareSection: css`
    background: #ffffff;
    border-radius: 8px;
    padding: 32px;
    border: 1px solid #e4e5e8;
    display: flex;
    align-items: center;
    gap: 16px;

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `,

  shareText: css`
    font-size: 16px;
    font-weight: 500;
    color: #18191c;
  `,

  shareButton: css`
    height: 40px;
    border: 1px solid #e4e5e8;
    border-radius: 6px;
    background: #ffffff;
    color: #5e6670;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      border-color: #0a65cc;
      color: #0a65cc;
      background: #f1f7ff;
    }

    .anticon {
      font-size: 16px;
    }
  `,

  card: css`
    display: flex;
    padding: 32px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #e4e5e8;
  `,

  cardTitle: css`
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    color: #18191c;
    margin: 0;
  `,

  overviewGrid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px 24px;
    width: 100%;
    align-self: stretch;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  `,

  overviewItem: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  `,

  overviewIcon: css`
    font-size: 32px;
    color: #9199a3;
    line-height: 1;
  `,

  overviewContent: css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
  `,

  overviewLabel: css`
    font-size: 12px;
    font-weight: 400;
    color: #9199a3;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    line-height: 18px;
  `,

  overviewValue: css`
    font-size: 14px;
    font-weight: 400;
    color: #18191c;
    line-height: 20px;
  `,

  companyHeader: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e4e5e8;
    width: 100%;
  `,

  companyLogoWrapper: css`
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  `,

  companyName: css`
    font-size: 20px;
    font-weight: 600;
    color: #18191c;
    margin: 0;
    text-align: center;
    line-height: 28px;
  `,

  companyDescription: css`
    font-size: 14px;
    font-weight: 400;
    color: #767f8c;
    margin: 0;
    text-align: center;
    line-height: 20px;
  `,

  companyInfoGrid: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  `,

  companyInfoItem: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  `,

  companyInfoLabel: css`
    font-size: 14px;
    font-weight: 400;
    color: #5e6670;
    flex-shrink: 0;
    line-height: 20px;
  `,

  companyInfoValue: css`
    font-size: 14px;
    font-weight: 400;
    color: #18191c;
    text-align: right;
    line-height: 20px;
  `,

  companySocials: css`
    display: flex;
    justify-content: center;
    gap: 12px;
    width: 100%;
    padding-top: 8px;
  `,

  socialButton: css`
    width: 40px;
    height: 40px;
    border: 1px solid #e4e5e8;
    border-radius: 6px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    min-width: 40px;

    &:hover {
      border-color: #0a65cc;
      color: #0a65cc;
      background: #f1f7ff;
    }

    .anticon {
      font-size: 18px;
    }
  `,
}));

