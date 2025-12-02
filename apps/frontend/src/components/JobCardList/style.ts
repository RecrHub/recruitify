import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token }) => ({
  jobCard: css`
    width: 100%;
    border: 1px solid rgba(156, 156, 156, 0.93);
    border-radius: 8px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      border-color: #838383ff;
      box-shadow: 0 4px 12px -2px rgba(0,0,0,0.06);
    }
  `,

  cardTopSize: css`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    /* Không cố định height để nội dung tự giãn */
  `,

  leftTopSize: css`
    display: flex;
    align-items: flex-start;
    padding: 16px 16px 0 16px;
    gap: 12px;
    flex: 1;
    min-width: 0;
  `,

  companyLogo: css`
    flex: 0 0 82px;
    width: 82px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #dfdfdf;
    background: #fffffe;
    overflow: hidden;
  `,

  info: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
  `,

  title: css`
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
    color: ${token.colorText || '#1f1f1f'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  company: css`
    font-size: 16px;
    color: ${token.colorTextSecondary || '#8c8c8c'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  rightTopSize: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    padding: 16px 16px 0 0; /* mép trên + phải */
    min-width: 220px;       /* đủ chỗ cho rate và meta */
  `,

  bookmarkRow: css`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    & > svg, & > span {
      font-size: 18px;
      color: ${token.colorText || '#1f1f1f'};
    }
  `,

  rateText: css`
    font-size: 18px;
    font-weight: 600;
    color: ${token.colorText || '#1f1f1f'};
    line-height: 1.2;
    white-space: nowrap;
  `,

  cardBottom: css`
    display: flex;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    & .metaItem {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      color: ${token.colorTextSecondary || '#595959'};
      font-size: 14px;
    }

    & .metaItem .anticon {
      color: ${token.colorTextSecondary || '#8c8c8c'};
      font-size: 16px;
    }
  `,

  /* Footer toàn thẻ: trái là tags, phải là Posted + Apply */
  bottomRow: css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    padding: 0 16px 16px 16px;
    flex-wrap: wrap; /* nếu hẹp, cho xuống dòng */
  `,

  tagsRow: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `,

  tagItem: css`
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    color: #2f2f2f;
    background: #f5f7fa;
    border: 1px solid #e2e6ea;
    border-radius: 8px;
    user-select: none;
    white-space: nowrap;
    transition: background 0.2s ease, border-color 0.2s ease;

    &:hover {
      background: #eef2f6;
      border-color: #d3d8dd;
    }
  `,

  rightBottom: css`
    display: flex;
    flex-direction: row;   /* trước đây là column */
    align-items: center;   /* canh giữa theo chiều dọc */
    gap: 10px;   
  `,

  postedText: css`
    font-size: 13px;
    color: ${token.colorTextSecondary || '#8c8c8c'};
    white-space: nowrap;
  `,

  applyButton: css`
    border-radius: 10px !important;
    border-color: #d9d9d9 !important;
    font-weight: 600;
    padding: 8px 14px;
    height: auto;
  `,
}));