import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { LuFileText, LuGithub, LuLinkedin, LuMail, LuMapPin } from 'react-icons/lu';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import { Container, Grid, displayType } from '../styles/layout';
import { profileData, heroMetrics } from '../data/profile';
import { RotatingTitle } from './RotatingTitle';
import { SvgIcon } from './SvgIcon';

// 첫 화면에 다음 섹션의 괘선이 걸리지 않도록 히어로가 최소 한 화면 높이를 차지합니다.
const HeroContainer = styled.section`
  min-height: 100vh;
  min-height: 100svh;
  padding: calc(60px + 3rem) 0 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-top: calc(56px + 2rem);
  }
`;

const MetaBar = styled(Grid)<{ $isDarkMode: boolean }>`
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 3.5rem;
  border-bottom: 1px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1.25rem;
    margin-bottom: 2.5rem;
  }
`;

const IntroLabel = styled.span`
  grid-column: 1 / 8;
`;

const MetricsLabel = styled.span`
  grid-column: 8 / 13;
  padding-left: ${theme.layout.gutter};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Main = styled.div`
  grid-column: 1 / 8;
  min-width: 0;
  padding-bottom: 4rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-column: 1 / -1;
    padding-bottom: 3rem;
  }

  /* 모바일에서는 자식을 Grid 흐름에 풀어, 이름·직함 바로 뒤에 성과 수치를 배치합니다. */
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: contents;
  }
`;

const Name = styled.h1<{ $isDarkMode: boolean }>`
  overflow: hidden;
  margin: 0 0 0.75rem;
  ${displayType}
  font-size: clamp(4rem, 10.5vw, 10.5rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.05em;
  white-space: pre-line;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 25vw;
    margin-bottom: 0.5rem;
  }

  > span {
    display: block;
    padding-bottom: 0.06em;
    animation: rise 0.9s ${theme.animations.easing} both;
  }
`;

const Role = styled.div<{ $isDarkMode: boolean }>`
  ${displayType}
  font-size: clamp(1.625rem, 3.2vw, 3rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.025em;
  min-height: 1.2em;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
`;

const Location = styled.p<{ $isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4375rem;
  margin: 1rem 0 2.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 0.75rem 0 2rem;
  }
`;

const Description = styled.p<{ $isDarkMode: boolean }>`
  max-width: 36rem;
  margin: 0 0 3rem;
  font-size: 1.0625rem;
  line-height: 1.7;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.mobile}) {
    order: 2;
    font-size: 0.9375rem;
    margin-bottom: 2rem;
  }
`;

const LinkList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    order: 3;
    display: grid;
    grid-template-columns: repeat(2, max-content);
    gap: 0.75rem 2.5rem;
  }
`;

const LinkItem = styled.a<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  min-height: 32px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  border-bottom: 1px solid currentColor;
  transition: color ${theme.animations.fast};

  svg {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
  }

  &:hover {
    color: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }
`;

const Figures = styled.div<{ $isDarkMode: boolean }>`
  grid-column: 8 / 13;
  min-width: 0;
  padding-left: ${theme.layout.gutter};
  border-left: 1px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-column: 1 / -1;
    padding: 2.5rem 0 0;
    border-left: none;
    border-top: 1px solid ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    order: 1;
    padding-top: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const BigFigure = styled.div<{ $isDarkMode: boolean }>`
  ${displayType}
  font-size: clamp(6.5rem, 14vw, 14rem);
  font-weight: 800;
  line-height: 0.82;
  letter-spacing: -0.045em;
  margin-left: -0.05em;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  white-space: nowrap;
`;

const BigCaption = styled.p<{ $isDarkMode: boolean }>`
  margin: 1.75rem 0 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  word-break: keep-all;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 1.25rem 0 1.5rem;
    font-size: 0.9375rem;
  }
`;

const CaptionMeta = styled.span<{ $isDarkMode: boolean }>`
  display: block;
  margin-top: 0.125rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
`;

const MetricTable = styled.dl`
  margin: 0;
`;

const MetricRow = styled.div<{ $isDarkMode: boolean }>`
  display: grid;
  grid-template-columns: 8.5rem minmax(0, 1fr);
  align-items: baseline;
  gap: 1rem;
  padding: 0.875rem 0;
  border-top: 1px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 6.25rem minmax(0, 1fr);
    gap: 0.75rem;
    padding: 0.75rem 0;
  }
`;

const MetricValue = styled.dd<{ $isDarkMode: boolean }>`
  order: -1;
  margin: 0;
  ${displayType}
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  white-space: nowrap;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.375rem;
  }
`;

const MetricLabel = styled.dt<{ $isDarkMode: boolean }>`
  font-size: 0.875rem;
  line-height: 1.45;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8125rem;
  }
`;

const MetricCompany = styled.span<{ $isDarkMode: boolean }>`
  display: block;
  font-size: 0.75rem;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
`;

export const HeroSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { language, t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getDescription = () => {
    if (isMobile) {
      return t('hero.mobileDescription');
    }
    return t('hero.description');
  };

  const getName = () => {
    return language === 'ko' ? '이규락' : 'Gyurak\nLee';
  };

  const [leadMetric, ...otherMetrics] = heroMetrics;

  const links = [
    { label: t('hero.email'), icon: LuMail, href: `mailto:${profileData.email}`, title: profileData.email },
    profileData.github && { label: 'GitHub', icon: LuGithub, href: profileData.github },
    profileData.linkedin && { label: 'LinkedIn', icon: LuLinkedin, href: profileData.linkedin },
    { label: 'Resume', icon: LuFileText, href: 'https://cdn.devgyurak.com/resume_leegyurak.pdf', title: t('hero.resume'), download: 'resume_leegyurak.pdf' }
  ].filter(Boolean) as { label: string; icon: IconType; href: string; title?: string; download?: string }[];

  return (
    <HeroContainer id="home">
      <Container>
        <MetaBar $isDarkMode={isDarkMode}>
          <IntroLabel>{t('hero.intro')}</IntroLabel>
          <MetricsLabel>{t('hero.metrics')}</MetricsLabel>
        </MetaBar>

        <Grid>
          <Main>
            <Name $isDarkMode={isDarkMode}>
              <span key={language}>{getName()}</span>
            </Name>
            <Role $isDarkMode={isDarkMode}>
              <RotatingTitle
                texts={[
                  'Software Engineer',
                  'Backend Engineer',
                  'Forward Deployed Engineer',
                  'AX Engineer',
                ]}
              />
            </Role>
            <Location $isDarkMode={isDarkMode}>
              <SvgIcon icon={LuMapPin} />
              {t('hero.location')}
            </Location>

            <Description $isDarkMode={isDarkMode}>
              {getDescription()}
            </Description>

            <LinkList>
              {links.map(({ label, icon: Icon, href, title, download }) => (
                <li key={label}>
                  <LinkItem
                    href={href}
                    title={title}
                    $isDarkMode={isDarkMode}
                    {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    {...(download ? { download } : {})}
                  >
                    <SvgIcon icon={Icon} />
                    {label}
                  </LinkItem>
                </li>
              ))}
            </LinkList>
          </Main>

          <Figures $isDarkMode={isDarkMode}>
            <BigFigure $isDarkMode={isDarkMode}>{leadMetric.value}</BigFigure>
            <BigCaption $isDarkMode={isDarkMode}>
              {t(`metric.${leadMetric.slug}`)}
              <CaptionMeta $isDarkMode={isDarkMode}>{leadMetric.company}</CaptionMeta>
            </BigCaption>
            <MetricTable>
              {otherMetrics.map((metric) => (
                <MetricRow key={metric.slug} $isDarkMode={isDarkMode}>
                  <MetricLabel $isDarkMode={isDarkMode}>
                    {t(`metric.${metric.slug}`)}
                    <MetricCompany $isDarkMode={isDarkMode}>{metric.company}</MetricCompany>
                  </MetricLabel>
                  <MetricValue $isDarkMode={isDarkMode}>{metric.value}</MetricValue>
                </MetricRow>
              ))}
            </MetricTable>
          </Figures>
        </Grid>
      </Container>
    </HeroContainer>
  );
};
