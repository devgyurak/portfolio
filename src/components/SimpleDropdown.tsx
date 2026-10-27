import React from 'react';
import styled from 'styled-components';
import { useLanguage, Language } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { theme } from '../styles/theme';

const Toggle = styled.div<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
`;

const Option = styled.button<{ $isDarkMode: boolean; $active: boolean }>`
  height: 40px;
  padding: 0 0.25rem;
  border: none;
  background: transparent;
  font-size: inherit;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color ${theme.animations.fast};
  color: ${({ $isDarkMode, $active }) => {
    const colors = $isDarkMode ? theme.colors.dark : theme.colors.light;
    return $active ? colors.text : colors.textMuted;
  }};

  &:hover {
    color: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }
`;

const languages: Language[] = ['ko', 'en'];

const SimpleDropdown: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <Toggle $isDarkMode={isDarkMode} role="group" aria-label="Language">
      {languages.map((lang, index) => (
        <React.Fragment key={lang}>
          {index > 0 && <span aria-hidden="true">/</span>}
          <Option
            type="button"
            $isDarkMode={isDarkMode}
            $active={language === lang}
            aria-pressed={language === lang}
            onClick={() => setLanguage(lang)}
          >
            {lang.toUpperCase()}
          </Option>
        </React.Fragment>
      ))}
    </Toggle>
  );
};

export default SimpleDropdown;
