export const theme = {
  colors: {
    light: {
      primary: '#0a0a0a',
      secondary: '#525252',
      background: '#ffffff',
      surface: '#ffffff',
      surfaceHover: '#f3f3f3',
      accent: '#e2231a',
      accentHover: '#b81b14',
      accentLight: 'rgba(226, 35, 26, 0.08)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      border: 'rgba(0, 0, 0, 0.12)',
      borderHover: 'rgba(0, 0, 0, 0.3)',
      text: '#0a0a0a',
      textSecondary: '#525252',
      textMuted: '#737373',
      shadow: 'rgba(0, 0, 0, 0.04)',
      shadowMd: 'rgba(0, 0, 0, 0.06)',
      shadowLg: 'rgba(0, 0, 0, 0.12)',
      shadowXl: 'rgba(0, 0, 0, 0.15)'
    },
    dark: {
      primary: '#f2f2f2',
      secondary: '#a3a3a3',
      background: '#0b0b0b',
      surface: '#0b0b0b',
      surfaceHover: '#171717',
      accent: '#ff4136',
      accentHover: '#ff6a61',
      accentLight: 'rgba(255, 65, 54, 0.12)',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      border: 'rgba(255, 255, 255, 0.14)',
      borderHover: 'rgba(255, 255, 255, 0.34)',
      text: '#f2f2f2',
      textSecondary: '#a3a3a3',
      textMuted: '#8a8a8a',
      shadow: 'rgba(0, 0, 0, 0.5)',
      shadowMd: 'rgba(0, 0, 0, 0.6)',
      shadowLg: 'rgba(0, 0, 0, 0.7)',
      shadowXl: 'rgba(0, 0, 0, 0.8)'
    }
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  },
  layout: {
    maxWidth: '1320px',
    gutter: '1.5rem',
    padding: '2.5rem',
    paddingTablet: '1.5rem',
    paddingMobile: '1rem'
  },
  fonts: {
    display: '"Archivo", "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Helvetica Neue", sans-serif',
    body: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Helvetica Neue", "Noto Sans KR", sans-serif',
    heading: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Helvetica Neue", "Noto Sans KR", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem'
  },
  radius: {
    sm: '0',
    md: '0',
    lg: '0',
    xl: '0',
    full: '9999px'
  },
  animations: {
    fast: '0.15s ease-out',
    normal: '0.2s ease-out',
    slow: '0.45s cubic-bezier(0.22, 1, 0.36, 1)',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
  }
};
