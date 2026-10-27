import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import { Container, Grid, SectionShell, displayType, reveal } from '../styles/layout';
import { experience, ExperienceItem as ExperienceItemType } from '../data/profile';
import { SectionTitle } from './SectionTitle';

const Rows = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Row = styled(Grid)<{ $isDarkMode: boolean }>`
  ${reveal}
  row-gap: 0.75rem;
  padding: 2.5rem 0;
  border-top: 1px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};

  &:first-child {
    border-top: none;
    padding-top: 0;
  }

  /* 모바일에서는 회사명과 기간을 한 줄에 두고, 역할 목록을 아래로 내립니다. */
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    column-gap: 1rem;
    padding: 2rem 0;
  }
`;

const Period = styled.div<{ $isDarkMode: boolean; $current: boolean }>`
  grid-column: 1 / 3;
  align-self: start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ $isDarkMode, $current }) => {
    const colors = $isDarkMode ? theme.colors.dark : theme.colors.light;
    return $current ? colors.text : colors.textMuted;
  }};

  &::before {
    content: '';
    display: ${({ $current }) => ($current ? 'block' : 'none')};
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    border-radius: ${theme.radius.full};
    background: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    white-space: normal;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    order: 1;
    padding-top: 0;
    white-space: nowrap;
  }
`;

const Company = styled.h3<{ $isDarkMode: boolean }>`
  grid-column: 3 / 6;
  margin: 0;
  ${displayType}
  font-size: clamp(1.875rem, 2.8vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.05;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
`;

const Roles = styled.div`
  grid-column: 6 / -1;
  display: grid;
  gap: 2rem;
  min-width: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    order: 2;
    flex-basis: 100%;
    margin-top: 0;
    gap: 1.75rem;
  }
`;

const RoleBlock = styled.div`
  display: grid;
  gap: 0.875rem;
`;

const RoleHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  padding-top: 0.5rem;
`;

const RoleTitle = styled.h4<{ $isDarkMode: boolean }>`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
`;

const RolePeriod = styled.span<{ $isDarkMode: boolean }>`
  font-size: 0.8125rem;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
  white-space: nowrap;
`;

const BulletList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
`;

const Bullet = styled.li<{ $isDarkMode: boolean }>`
  position: relative;
  padding-left: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  word-break: keep-all;
  overflow-wrap: break-word;

  &::before {
    content: '—';
    position: absolute;
    left: 0;
    color: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9375rem;
  }
`;

const Figure = styled.strong<{ $isDarkMode: boolean }>`
  margin-left: 0.5rem;
  font-weight: 700;
  white-space: nowrap;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};

  @media (max-width: ${theme.breakpoints.mobile}) {
    white-space: normal;
  }
`;

// 문장 끝의 "(15분 → 2분, -86%)"처럼 숫자가 들어간 괄호를 성과 수치로 분리해 강조합니다.
const METRIC_PATTERN = /^(.*?)\s*\(([^()]*\d[^()]*)\)\s*$/;

const DescriptionList: React.FC<{ text: string; isDarkMode: boolean }> = ({ text, isDarkMode }) => {
  const lines = text
    .split('\n')
    .map((line) => line.replace(/^•\s*/, '').trim())
    .filter(Boolean);

  return (
    <BulletList>
      {lines.map((line) => {
        const match = line.match(METRIC_PATTERN);
        return (
          <Bullet key={line} $isDarkMode={isDarkMode}>
            {match ? match[1] : line}
            {match && <Figure $isDarkMode={isDarkMode}>{match[2]}</Figure>}
          </Bullet>
        );
      })}
    </BulletList>
  );
};

const ExperienceRow: React.FC<{ item: ExperienceItemType; isDarkMode: boolean }> = ({ item, isDarkMode }) => {
  const { t } = useLanguage();

  const getDescription = (slug: string, fallback?: string) => {
    switch (slug) {
      case 'aitrics-2026':
        return t('exp.aitrics2026.desc');
      case 'nrise-backend':
        return t('exp.nrise.desc');
      case 'aitrics-fde':
        return t('exp.aitricsFde.desc');
      case 'aitrics-be':
        return t('exp.aitricsBe.desc');
      case '8percent-backend':
        return t('exp.8percent.desc');
      case 'qualson-backend':
        return t('exp.qualson.desc');
      default:
        return fallback || '';
    }
  };

  const roles = item.roles?.length
    ? item.roles
    : [{ slug: item.slug, title: item.title || '', period: '', description: item.description || '' }];

  return (
    <Row as="li" $isDarkMode={isDarkMode} data-reveal>
      <Period $isDarkMode={isDarkMode} $current={item.period.includes('Present')}>
        {item.period}
      </Period>
      <Company $isDarkMode={isDarkMode}>{item.company}</Company>
      <Roles>
        {roles.map((role) => (
          <RoleBlock key={role.slug}>
            <RoleHeader>
              <RoleTitle $isDarkMode={isDarkMode}>{role.title}</RoleTitle>
              {role.period && <RolePeriod $isDarkMode={isDarkMode}>{role.period}</RolePeriod>}
            </RoleHeader>
            <DescriptionList
              text={getDescription(role.slug, role.description)}
              isDarkMode={isDarkMode}
            />
          </RoleBlock>
        ))}
      </Roles>
    </Row>
  );
};

export const ExperienceSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <SectionShell id="experience">
      <Container>
        <SectionTitle
          isDarkMode={isDarkMode}
          index="01"
        >
          {t('section.experience')}
        </SectionTitle>
        <Rows>
          {experience.map((item) => (
            <ExperienceRow
              key={item.slug}
              item={item}
              isDarkMode={isDarkMode}
            />
          ))}
        </Rows>
      </Container>
    </SectionShell>
  );
};
