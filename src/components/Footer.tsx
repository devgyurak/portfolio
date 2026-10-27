import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import { LuArrowUp, LuGithub, LuLinkedin, LuMail, LuPenLine } from 'react-icons/lu';
import { Container, Grid } from '../styles/layout';
import { profileData } from '../data/profile';
import { SvgIcon } from './SvgIcon';

const FooterContainer = styled.footer<{ $isDarkMode: boolean }>`
  margin-top: 6rem;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 3.5rem;
  }
`;

const FooterGrid = styled(Grid)<{ $isDarkMode: boolean }>`
  align-items: center;
  row-gap: 1rem;
  padding: 1.5rem 0 2.5rem;
  border-top: 2px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  font-size: 0.8125rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    align-items: flex-start;
  }
`;

const Copyright = styled.p`
  grid-column: 1 / 7;
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    order: 2;
  }
`;

const Actions = styled.div`
  grid-column: 7 / 13;
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const BackToTop = styled.button<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  min-height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  transition: color ${theme.animations.fast};

  &:hover {
    color: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const SocialLinks = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-right: 1rem;
  border-right: 1px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: -7.5px;
  }
`;

const IconLink = styled.a<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  transition: color ${theme.animations.fast};

  &:hover {
    color: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }

  svg {
    width: 17px;
    height: 17px;
  }
`;

const socialLinks = [
  { label: profileData.email, href: `mailto:${profileData.email}`, icon: LuMail },
  { label: 'GitHub', href: 'https://github.com/devgyurak', icon: LuGithub },
  { label: 'Blog', href: 'https://velog.io/@devgyurak', icon: LuPenLine },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/devgyurak', icon: LuLinkedin }
];

export const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <FooterContainer $isDarkMode={isDarkMode}>
      <Container>
        <FooterGrid $isDarkMode={isDarkMode}>
          <Copyright>© {new Date().getFullYear()} {t('footer.rights')}</Copyright>
          <Actions>
            <SocialLinks $isDarkMode={isDarkMode}>
              {socialLinks.map(({ icon: Icon, ...link }) => (
                <IconLink
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  title={link.label}
                  $isDarkMode={isDarkMode}
                  {...(link.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <SvgIcon icon={Icon} />
                </IconLink>
              ))}
            </SocialLinks>
            <BackToTop
              type="button"
              $isDarkMode={isDarkMode}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('footer.top')}
              <SvgIcon icon={LuArrowUp} />
            </BackToTop>
          </Actions>
        </FooterGrid>
      </Container>
    </FooterContainer>
  );
};
