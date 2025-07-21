// src/theme/globalStyles.tsx
import { GlobalStyles } from '@mui/material';

export const globalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        outline: 0,
        boxSizing: 'border-box',
        fontFamily: `'Iceberg', sans-serif`,
      },
      body: {
        backgroundColor: '#000000',
        backgroundSize: 'fill',
      },
      html: {
        scrollBehavior: 'smooth',
      },
      button: {
        cursor: 'pointer',
      },
    }}
  />
);
