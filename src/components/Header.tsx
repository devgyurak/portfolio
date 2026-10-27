import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import { LuMoon, LuSun } from 'react-icons/lu';
import { Container, displayType } from '../styles/layout';
import SimpleDropdown from './SimpleDropdown';
import { SvgIcon } from './SvgIcon';

const HeaderContainer = styled.header<{ $isDarkMode: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.background : theme.colors.light.background};
  border-bottom: 1px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 56px;
  }
`;

const Logo = styled.a<{ $isDarkMode: boolean }>`
  ${displayType}
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-decoration: none;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
`;

// 4×4 격자로 짠 G 심볼입니다. 한 칸이 4px이 되도록 16px로 그리고, 가로획 칸만 시그널 레드로 채웁니다.
// 파비콘(public/favicon.svg)과 같은 도형입니다.
const LogoMark = styled.svg<{ $isDarkMode: boolean }>`
  flex-shrink: 0;
  width: 16px;
  height: 16px;

  .block {
    fill: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 1rem;
  }
`;

const IconButton = styled.button<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  transition: color ${theme.animations.fast};

  &:hover {
    color: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }

  svg {
    width: 19px;
    height: 19px;
  }
`;

const Buttons = styled.div`
  display: flex;
  margin-right: -10px;
`;

// 두 줄 햄버거가 열릴 때 X로 겹쳐집니다.
const Burger = styled.span<{ $isOpen: boolean }>`
  position: relative;
  display: block;
  width: 18px;
  height: 12px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1.5px;
    background: currentColor;
    transition: top 0.35s ${theme.animations.easing}, transform 0.35s ${theme.animations.easing};
  }

  &::before {
    top: ${({ $isOpen }) => ($isOpen ? '5.25px' : '2px')};
    transform: rotate(${({ $isOpen }) => ($isOpen ? '45deg' : '0')});
  }

  &::after {
    top: ${({ $isOpen }) => ($isOpen ? '5.25px' : '8.5px')};
    transform: rotate(${({ $isOpen }) => ($isOpen ? '-45deg' : '0')});
  }
`;

const MenuPanel = styled.div<{ $isDarkMode: boolean; $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  right: 0;
  clip-path: inset(0 0 ${({ $isOpen }) => ($isOpen ? '0' : '100%')} 0);
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    clip-path 0.5s ${theme.animations.easing},
    visibility 0s linear ${({ $isOpen }) => ($isOpen ? '0s' : '0.5s')};
  background: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.background : theme.colors.light.background};
  border-bottom: 1px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;

  li:last-child > a {
    border-bottom: none;
  }
`;

const MenuItem = styled.li<{ $isOpen: boolean; $index: number }>`
  overflow: hidden;

  > a {
    transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '105%')});
    transition: transform 0.6s ${theme.animations.easing}
      ${({ $isOpen, $index }) => ($isOpen ? `${0.1 + $index * 0.06}s` : '0s')};
  }
`;

const MenuLink = styled.a<{ $isDarkMode: boolean }>`
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  ${displayType}
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  text-decoration: none;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  transition: color ${theme.animations.fast};

  &:hover {
    color: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }
`;

const MenuIndex = styled.span<{ $isDarkMode: boolean }>`
  min-width: 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
`;

const navItems = ['experience', 'projects', 'skills'];

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 60;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: sectionId === 'home' ? 0 : elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <HeaderContainer ref={headerRef} $isDarkMode={isDarkMode}>
      <Container>
        <Nav>
          <Logo
            href="#home"
            $isDarkMode={isDarkMode}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <LogoMark $isDarkMode={isDarkMode} viewBox="32 32 192 192" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M32 32H224V80H80V176H176V128H224V224H32Z" />
              <path className="block" d="M128 128H176V176H128Z" />
            </LogoMark>
            Devgyurak
          </Logo>

          <RightSection>
            <SimpleDropdown />
            <Buttons>
              <IconButton
                $isDarkMode={isDarkMode}
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <SvgIcon icon={LuSun} /> : <SvgIcon icon={LuMoon} />}
              </IconButton>
              <IconButton
                $isDarkMode={isDarkMode}
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="site-menu"
              >
                <Burger $isOpen={isMenuOpen} aria-hidden="true" />
              </IconButton>
            </Buttons>
          </RightSection>
        </Nav>
      </Container>

      <MenuPanel id="site-menu" $isDarkMode={isDarkMode} $isOpen={isMenuOpen}>
        <Container>
          <MenuList>
            {navItems.map((id, index) => (
              <MenuItem key={id} $isOpen={isMenuOpen} $index={index}>
                <MenuLink
                  href={`#${id}`}
                  $isDarkMode={isDarkMode}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                >
                  <MenuIndex $isDarkMode={isDarkMode}>{String(index + 1).padStart(2, '0')}</MenuIndex>
                  {t(`nav.${id}`)}
                </MenuLink>
              </MenuItem>
            ))}
          </MenuList>
        </Container>
      </MenuPanel>
    </HeaderContainer>
  );
};
