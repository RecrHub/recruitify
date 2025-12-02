import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  findJobContainer: css`
    padding-top: calc(13. 5px + 1px);
  `,

  header: css`
    position: sticky;
    top: 0;
    z-index: 100;
    height: 13.5px;
    box-sizing: border-box;
  `,

  logo: css`
    display: flex;
    align-items: center;
    gap: 10px;
  `,

  logoIcon: css`
    width: 41px;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      width: 100%;
      height: 100%;
    }
  `,

  logoText: css`
    font-size: 20px;
    font-weight: 600;
    color: #000;
  `,

  navMenu: css`
    display: flex;
    gap: 32px;
  `,

  navLink: css`
    color: #666;
    font-size: 14px;
    transition: color 0.3s;

    &:hover {
      color: #000;
    }
  `,

  headerActions: css`
    display: flex;
    align-items: center;
    gap: 20px;
  `,

  employerLink: css`
    color: #666;
    font-size: 14px;
  `,

  notificationIcon: css`
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
  `,

  breadcrumb: css`
    padding: 16px 80px;
    font-size: 14px;
    color: #666;
  `,

  breadcrumbSeparator: css`
    margin: 0 8px;
    color: #d9d9d9;
  `,

  breadcrumbCurrent: css`
    color: #000;
  `,

  searchSection: css`
    padding: 40px 80px;
    background: white;
  `,

  searchBar: css`
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  `,

  searchInputWrapper: css`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  `,

  searchIcon: css`
    color: #10b981;
    font-size: 18px;
  `,

  searchInput: css`
    font-size: 14px;

    & input::placeholder {
      color: #bfbfbf;
    }
  `,

  categorySelect: css`
    width: 100%;

    & . ant-select-selector {
      border: none ! important;
      box-shadow: none !important;
    }
  `,

  findJobBtn: css`
    background: #10b981;
    border: none;
    height: 44px;
    padding: 0 32px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;

    &:hover {
      background: #059669 !important;
    }
  `,

  mainContent: css`
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 20px;
    padding: 1px 80px;
    max-width: 1600px;
    margin: 0 auto;
  `,

  sidebar: css`
    background: white;
    border-radius: 8px;
    padding: 20px;
    height: fit-content;
    position: sticky;
    top: 100px;
  `,

  filterHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h3 {
      color: #1F2938;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px;
    }
  `,

  clearAll: css`
    color: #10b981;
    padding: 0;
    font-size: 13px;
    font-weight: 500;

    &:hover {
      color: #059669 !important;
    }
  `,

  filterSection: css`
    margin-bottom: 20px;

    & h4 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 10px;
      color: #000;
    }

    & . ant-select {
      border-radius: 8px;
    }

    & .ant-select-selector {
      border-color: #e5e7eb ! important;
      border-radius: 8px ! important;
      padding: 8px 12px ! important;
      height: auto !important;

      &:hover {
        border-color: #10b981 !important;
      }
    }

    & .ant-select-focused .ant-select-selector {
      border-color: #10b981 !important;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1) !important;
    }
  `,

  checkboxGroup: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #ffffff ! important;
    padding: 14px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;

    & .ant-checkbox-wrapper {
      font-size: 14px;
      color: #111827;

      &:hover . ant-checkbox-inner {
        border-color: #10b981;
      }
    }

    & .ant-checkbox-checked . ant-checkbox-inner {
      background-color: #10b981 !important;
      border-color: #10b981 !important;
    }

    & . ant-checkbox-wrapper .ant-checkbox-checked::after {
      border-color: #10b981;
    }
  `,

  salarySlider: css`
    margin-top: 12px;
    background: #f9fafb;
    padding: 14px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  `,

  customSlider: css`
    & .ant-slider-track {
      background-color: #10b981 !important;
    }

    & .ant-slider-handle {
      background-color: #10b981 ! important;
      border-color: #10b981 !important;

      &::after {
        box-shadow: 0 0 0 2px #10b981 !important;
      }

      &:hover {
        border-color: #059669 ! important;
      }

      &:focus {
        border-color: #10b981 !important;
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2) !important;
      }
    }

    & .ant-slider-rail {
      background-color: #e5e7eb;
    }
  `,

  salaryInputs: css`
    display: flex;
    gap: 12px;
    margin-top: 12px;
  `,

  salaryInput: css`
    flex: 1;
    text-align: center;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
  `,

  jobListings: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  listingsHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius: 8px;
  `,

  resultsCount: css`
    font-size: 14px;
    color: #666;

    & .count {
      color: #000;
      font-weight: 600;
    }
  `,

  sorting: css`
    display: flex;
    gap: 12px;
  `,

  sortSelect: css`
    min-width: 130px;
  `,

  headerBottom: css`
    padding: 1px 80px;
  `,

  headerBottomInner: css`
    max-width: 1450px;
    margin: 0 auto;
    padding: 19px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
  `,

  pageTitle: css`
    font-size: 20px;
    font-weight: 300;
    color: #111827;
  `,

  pageBreadcrumb: css`
    font-size: 13px;
    color: #9aa0a6;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;

    & .ant-breadcrumb-link > a,
    & .ant-breadcrumb-link {
      color: #9aa0a6;
      text-decoration: none;

      &:hover {
        color: #666;
        text-decoration: underline;
      }
    }

    & .anticon {
      vertical-align: middle;
    }

    @media (max-width: 640px) {
      font-size: 12px;
    }
  `,
  paginationWrapper: css`
    display: flex;
    justify-content: center;
    padding: 24px 0;
    margin-top: 16px;

    & .ant-pagination {
      & .ant-pagination-item-active {
        border-color: #10b981;
        background-color: #10b981;

        & a {
          color: white;
        }
      }

      & .ant-pagination-item:hover {
        border-color: #10b981;

        & a {
          color: #10b981;
        }
      }

      & .ant-pagination-prev:hover . ant-pagination-item-link,
      & .ant-pagination-next:hover .ant-pagination-item-link {
        color: #10b981;
        border-color: #10b981;
      }
    }
  `,
    noResults: css`
    text-align: center;
    padding: 60px 20px;
    color: #666;

    & p:first-child {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    & p:last-child {
      font-size: 14px;
      color: #999;
    }
  `,
}));