import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token, responsive }) => ({
    jobWrapper: css`
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        padding-block: 95px;
        padding-inline: 24px;

        ${responsive.tablet} {
            padding-block: 120px;
            max-width: 960px;
        }

        ${responsive.mobile} {
            padding-block: 80px;
            padding-inline: 16px;
        }
    `,
    header: css`
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
    `,
    heading: css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    `,
    headingTitle: css`
        color: #09090B;
        font-size: 40px;
        font-weight: 600;
        line-height: 48px;
        margin: 0;
    `,
    description: css`
        color: #52525B;
        font-size: 20px;
        font-weight: 400;
        line-height: 28px;
        margin: 0;
    `,
    viewAllButton: css`
        display: flex;
        padding: 12px 24px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 3px;
        border: 1px solid #C6C6C6;
        background: #FFF;
        color: #09090B;
        font-size: 16px;
        font-weight: 500;
        height: auto;
        flex-shrink: 0;
        
        &:hover {
            border-color: #09090B;
            color: #09090B;
        }
    `,
    jobCard: css`
        background: #FEF2F2;
        border-radius: 12px;
        padding: 24px;
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
    `,
    bookmarkIcon: css`
        position: absolute;
        top: 24px;
        right: 24px;
        font-size: 20px;
        color: #71717A;
        cursor: pointer;
        
        &:hover {
            color: #09090B;
        }
    `,
    companyIcon: css`
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #EC4899 0%, #EF4444 100%);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFF;
        font-size: 24px;
    `,
    jobTitle: css`
        color: #09090B;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        margin: 0;
    `,
    companyName: css`
        color: #71717A;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        margin: 0;
    `,
    salary: css`
        color: #09090B;
        font-size: 24px;
        font-weight: 600;
        line-height: 32px;
        margin: 12px 0;
    `,
    infoRow: css`
        display: flex;
        align-items: center;
        gap: 6px;
        color: #71717A;
        font-size: 14px;
        line-height: 20px;
    `,
    cardFooter: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        padding-top: 16px;
    `,
    postedDate: css`
        color: #A1A1AA;
        font-size: 14px;
        font-weight: 400;
    `,
    applyButton: css`
        background: #FFF;
        border: 1px solid #E4E4E7;
        color: #09090B;
        font-weight: 500;
        border-radius: 6px;
        padding: 8px 20px;
        height: auto;
        
        &:hover {
            border-color: #09090B;
            color: #09090B;
        }
    `,
}));