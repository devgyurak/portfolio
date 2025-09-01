import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

const SimpleDropdown: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { isDarkMode } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  const buttonStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '8px 4px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    minWidth: '48px',
    minHeight: '44px',
    justifyContent: 'center',
    WebkitTapHighlightColor: 'transparent',
    transition: 'color 0.2s ease'
  };

  return (
    <button 
      style={buttonStyle}
      onClick={toggleLanguage}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
      }}
    >
      {language === 'ko' ? 'KO' : 'EN'}
    </button>
  );
};

export default SimpleDropdown;