import React, { createContext, useContext, ReactNode, useState, useEffect, useLayoutEffect } from 'react';
import { ThemeProps } from '../types/theme';

const ThemeContext = createContext<ThemeProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'darkMode';
const DARK_QUERY = '(prefers-color-scheme: dark)';

// 직접 고른 테마가 저장돼 있으면 그것을, 없으면 시스템 설정을 따릅니다.
const getSavedMode = (): boolean | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? null : JSON.parse(saved);
  } catch {
    return null;
  }
};

const getSystemMode = () => window.matchMedia?.(DARK_QUERY).matches ?? false;

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => getSavedMode() ?? getSystemMode());

  // 저장된 선택이 없는 동안에는 시스템 테마가 바뀌면 함께 바뀝니다.
  useEffect(() => {
    const media = window.matchMedia?.(DARK_QUERY);
    if (!media) return;
    const onChange = (event: MediaQueryListEvent) => {
      if (getSavedMode() === null) setIsDarkMode(event.matches);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // 첫 페인트 전에 붙여서, 다크 시스템에서 밝은 배경이 잠깐 보였다가 바뀌지 않게 합니다.
  useLayoutEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMode));
    } catch {
      // 저장소를 쓸 수 없는 환경에서는 이번 방문에만 적용합니다.
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, toggleDarkMode: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
