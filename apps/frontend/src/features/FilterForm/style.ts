import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    width: 100%;
  `,

  filterHeader: css`
    margin-bottom: 16px;
  `,

  filterTitle: css`
    font-size: 20px;
    font-weight: 600;
    color: ${token.colorText};
    margin: 0;
  `,

  filterSection: css`
    margin-bottom: 24px;
  `,

  sectionTitle: css`
    font-size: 16px;
    font-weight: 600;
    color: ${token.colorText};
    margin-bottom: 12px;
    margin-top: 0;
  `,

  // Border container for Expected Salary
  borderedSection: css`
    border: 1px solid #D3D3D3;
    border-radius: 8px;
    padding: 20px;
    gap: 1.5px;
    background-color: ${token.colorBgContainer};
  `,

  checkboxGroup: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  checkboxRow: css`
    display: flex;
    justify-content: space-between;
    gap: 12px;
  `,

  checkboxGrid: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `,

  salarySlider: css`
    margin-top: 16px;
  `,

  sliderLabels: css`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  `,

  sliderLabel: css`
    font-size: 14px;
    color: ${token.colorTextSecondary};
    font-weight: 500;
  `,
}));