import { createStyles } from 'antd-style';

export const useJobFilterFormStyles = createStyles(({ token }) => ({
  filterHeader: {
    marginBottom: 16,
    h3: {
      fontSize: 20,
      fontWeight: 600,
      color: '#1a1a1a',
      marginBottom: 16,
    },
  },
  filterSection: {
    marginBottom: 24,
    h4: {
      fontSize: 16,
      fontWeight: 600,
      color: '#1a1a1a',
      marginBottom: 12,
    },
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  checkboxRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginTop: 12,
    marginBottom: 20,
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  salaryCheckbox: {
    fontSize: 14,
    color: '#333',
    '.ant-checkbox': {
      borderRadius: 4,
    },
  },
  salarySlider: {
    marginTop: 16,
    '.ant-slider': {
      marginBottom: 8,
    },
    '.ant-slider-track': {
      backgroundColor: '#10b981',
      height: 6,
    },
    '.ant-slider-rail': {
      backgroundColor: '#e5e5e5',
      height: 6,
    },
    '.ant-slider-handle': {
      width: 18,
      height: 18,
      border: '3px solid #10b981',
      backgroundColor: '#ffffff',
      marginTop: -6,
      '&:hover, &:focus': {
        borderColor: '#059669',
        boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.1)',
      },
    },
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 8,
    '.slider-label': {
      fontSize: 14,
      color: '#666',
      fontWeight: 500,
    },
  },
}));
