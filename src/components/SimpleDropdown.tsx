import React, { useState, useEffect, useRef } from 'react';
import { useLanguage, Language } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

const SimpleDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{ top: number; right: number } | null>(null);
  const { language, setLanguage } = useLanguage();
  const { isDarkMode } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const newPosition = {
        top: rect.bottom + 8, // 버튼 아래에 8px 간격
        right: window.innerWidth - rect.right // 오른쪽 정렬
      };
      
      setButtonPosition(newPosition);
      
      if (!isOpen) {
        // 열기
        setIsAnimating(true);
        if (!buttonPosition) {
          // 첫 클릭인 경우에만 지연
          setTimeout(() => {
            setIsOpen(true);
          }, 10);
        } else {
          setIsOpen(true);
        }
      } else {
        // 닫기 - 애니메이션 후 숨김
        setIsOpen(false);
        // 애니메이션 시간과 동일하게 설정 (250ms)
        setTimeout(() => {
          setIsAnimating(false);
        }, 250);
      }
    } else {
      if (!isOpen) {
        setIsAnimating(true);
        setIsOpen(true);
      } else {
        setIsOpen(false);
        setTimeout(() => {
          setIsAnimating(false);
        }, 250);
      }
    }
  };

  const handleOptionClick = (lang: Language) => {
    setLanguage(lang);
    // 닫기 애니메이션
    setIsOpen(false);
    setTimeout(() => {
      setIsAnimating(false);
    }, 250);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;
      
      const target = event.target as HTMLElement;
      const dropdown = target.closest('.simple-dropdown');
      
      if (!dropdown) {
        // 외부 클릭 시 닫기 애니메이션
        setIsOpen(false);
        setTimeout(() => {
          setIsAnimating(false);
        }, 250);
      }
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block'
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
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  };

  const isVisible = buttonPosition !== null;
  const shouldRender = (isAnimating || isOpen) && isVisible;
  const shouldShow = isOpen && isVisible;

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: buttonPosition ? `${buttonPosition.top}px` : '-9999px',
    right: buttonPosition ? `${buttonPosition.right}px` : '-9999px',
    background: isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
    borderRadius: '8px',
    boxShadow: isDarkMode 
      ? '0 8px 32px rgba(0, 0, 0, 0.8)' 
      : '0 8px 32px rgba(0, 0, 0, 0.15)',
    minWidth: '140px',
    zIndex: 999999,
    // 애니메이션 스타일
    display: shouldRender ? 'block' : 'none',
    opacity: shouldShow ? 1 : 0,
    visibility: shouldShow ? 'visible' : 'hidden',
    transform: shouldShow
      ? 'translateY(0) scaleY(1)' 
      : 'translateY(-10px) scaleY(0.95)',
    transformOrigin: 'top center',
    transition: shouldRender ? 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
    pointerEvents: shouldShow ? 'auto' : 'none',
    overflow: 'hidden',
    backdropFilter: 'blur(20px) saturate(180%)'
  };

  const optionStyle = (isActive: boolean): React.CSSProperties => ({
    width: '100%',
    background: isActive 
      ? (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)')
      : 'transparent',
    border: 'none',
    color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: '0.75rem 1rem',
    textAlign: 'left',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateX(0)',
    borderRadius: 0
  });

  return (
    <div className="simple-dropdown" style={containerStyle}>
      <button 
        ref={buttonRef}
        style={buttonStyle}
        onClick={handleButtonClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
        }}
      >
        {language === 'ko' ? 'KO' : 'EN'} ▼
      </button>
      
      <div style={menuStyle}>
        <button 
          style={optionStyle(language === 'ko')}
          onClick={() => handleOptionClick('ko')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
            e.currentTarget.style.transform = 'translateX(4px) scale(1.02)';
            e.currentTarget.style.boxShadow = isDarkMode 
              ? '0 2px 8px rgba(255, 255, 255, 0.1)' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = language === 'ko' 
              ? (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)')
              : 'transparent';
            e.currentTarget.style.transform = 'translateX(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          한국어
        </button>
        <button 
          style={optionStyle(language === 'en')}
          onClick={() => handleOptionClick('en')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
            e.currentTarget.style.transform = 'translateX(4px) scale(1.02)';
            e.currentTarget.style.boxShadow = isDarkMode 
              ? '0 2px 8px rgba(255, 255, 255, 0.1)' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = language === 'en' 
              ? (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)')
              : 'transparent';
            e.currentTarget.style.transform = 'translateX(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default SimpleDropdown;