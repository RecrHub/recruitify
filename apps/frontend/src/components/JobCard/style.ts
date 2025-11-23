import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css }) => ({
    jobCard: css`
        width: 100%;  /* Thay vì 417px */
        padding: 23px;
        border-radius: 8px;
        border: 1px solid #CCC;
        background: #FFFFFF;
        box-shadow: 0 12px 48px 0 rgba(0, 44, 109, 0.10);
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 16px;
          &:hover {
            border-color: #838383ff;
            transtaction: 0.3s
        }
    `,
    bookmarkIcon: css`
        position: absolute;
        top: 32px;
        right: 32px;
        cursor: pointer;
        
        svg {
            width: 24px;
            height: 24px;
        }
        
        &:hover {
            opacity: 0.7;
        }
    `,
    header: css`
        display: flex;
        align-items: flex-start;
        gap: 16px;
    `,
    companyIcon: css`
        width: 56px;
        height: 56px;
        padding: 16px;
        background: linear-gradient(135deg, #EC4899 0%, #EF4444 100%);
        border-radius: 8px;
        display: flex;
        align-items: center; 
        justify-content: center;
        color: #FFF;
        font-size: 28px;
        flex-shrink: 0;
    `,
    headerContent: css`
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
    `,
    companyName: css`
        color: #71717A;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin: 0;
    `,
    jobTitle: css`
        color: #18191C;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        margin: 0;
    `,
    salary: css`
        color: #09090B;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 32px;
        margin: 0;
    `,
    infoList: css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    `,
    infoRow: css`
        display: flex;
        align-items: center;
        gap: 8px;
        color: #71717A;
        font-size: 14px;
        line-height: 20px;
        
        .anticon {
            font-size: 18px;
        }
    `,
    cardFooter: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    `,
    postedDate: css`
        color: #767F8C;
        font-size: 14px;
        font-weight: 400;
    `,
    viewButton: css`
    display: flex;
    width: 110px;
    height: 38px;
    padding: 16px 32px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 6px;
    border: 1px solid #E1E1E1;
    background: #FFF;

    color: #11181C;
    /* Button/Button */
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
    text-transform: capitalize;
    `,
}));