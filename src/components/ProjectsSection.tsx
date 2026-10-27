import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import { LuArrowUpRight, LuGithub, LuGlobe } from 'react-icons/lu';
import { Container, Grid, SectionShell, displayType, reveal } from '../styles/layout';
import { blogPosts, BlogPost } from '../data/profile';
import { SectionTitle } from './SectionTitle';
import { SvgIcon } from './SvgIcon';

const ProjectRow = styled(Grid)<{ $isDarkMode: boolean; $clickable?: boolean }>`
  ${reveal}
  row-gap: 1rem;
  padding: 2.5rem 0 3rem;
  border-top: 1px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};

  &:first-of-type {
    border-top: none;
    padding-top: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem 0 2.5rem;
  }
`;

const Meta = styled.div<{ $isDarkMode: boolean }>`
  grid-column: 1 / 3;
  display: grid;
  align-content: start;
  gap: 0.25rem;
  padding-top: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    gap: 1rem;
    padding-top: 0;
  }
`;

const ProjectIndex = styled.span<{ $isDarkMode: boolean }>`
  font-weight: 700;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
`;

const ProjectTitle = styled.h3<{ $isDarkMode: boolean }>`
  grid-column: 3 / 7;
  align-self: start;
  margin: 0;
  ${displayType}
  font-size: clamp(2.375rem, 4.4vw, 4.25rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  transition: color ${theme.animations.fast};
  word-break: keep-all;

  ${ProjectRow}:hover & {
    color: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-column: 3 / -1;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
  }
`;

const TitleArrow = styled.span`
  display: inline-flex;
  vertical-align: -0.08em;
  margin-left: 0.1em;
  transition: transform ${theme.animations.fast};

  svg {
    width: 0.8em;
    height: 0.8em;
    stroke-width: 2.25;
  }

  ${ProjectRow}:hover & {
    transform: translate(0.05em, -0.05em);
  }
`;

const Body = styled.div`
  grid-column: 7 / -1;
  min-width: 0;
  padding-top: 0.5rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-column: 3 / -1;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
    padding-top: 0;
  }
`;

const ProjectDescription = styled.p<{ $isDarkMode: boolean }>`
  max-width: 38rem;
  margin: 0 0 1.5rem;
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9375rem;
  }
`;

const TagsContainer = styled.ul<{ $isDarkMode: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0;
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
`;

const Tag = styled.li`
  &:not(:last-child)::after {
    content: '/';
    margin: 0 0.5rem;
    opacity: 0.6;
  }
`;

const ProjectActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
`;

const ActionLink = styled.a<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 32px;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  border-bottom: 1px solid currentColor;
  transition: color ${theme.animations.fast};

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  &:hover {
    color: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }
`;

const getHostname = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const ProjectItem: React.FC<{ post: BlogPost; index: number; isDarkMode: boolean }> = ({ post, index, isDarkMode }) => {
  const { t } = useLanguage();

  const getTitle = () => {
    switch (post.slug) {
      case 'pykorail':
        return t('proj.pykorail.title');
      case 'mysql-gcm':
        return t('proj.mysql-gcm.title');
      case 'syncintosh':
        return t('proj.syncintosh.title');
      case 'hipchapedia':
        return t('proj.hipchapedia.title');
      default:
        return post.title;
    }
  };

  const getDescription = () => {
    switch (post.slug) {
      case 'pykorail':
        return t('proj.pykorail.desc');
      case 'mysql-gcm':
        return t('proj.mysql-gcm.desc');
      case 'syncintosh':
        return t('proj.syncintosh.desc');
      case 'hipchapedia':
        return t('proj.hipchapedia.desc');
      default:
        return post.excerpt;
    }
  };

  const handleCardClick = () => {
    if (post.url) {
      window.open(post.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <ProjectRow
      as="article"
      $isDarkMode={isDarkMode}
      $clickable={!!post.url}
      onClick={handleCardClick}
      data-reveal
    >
      <Meta $isDarkMode={isDarkMode}>
        <ProjectIndex $isDarkMode={isDarkMode}>{String(index + 1).padStart(2, '0')}</ProjectIndex>
        <span>{post.date}</span>
      </Meta>
      <ProjectTitle $isDarkMode={isDarkMode}>
        {getTitle()}
        {post.url && <TitleArrow aria-hidden="true"><SvgIcon icon={LuArrowUpRight} /></TitleArrow>}
      </ProjectTitle>
      <Body>
        <ProjectDescription $isDarkMode={isDarkMode}>
          {getDescription()}
        </ProjectDescription>
        <TagsContainer $isDarkMode={isDarkMode}>
          {post.tags.map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>
        <ProjectActions>
          <ActionLink
            href={post.githubUrl || "https://github.com/devgyurak"}
            target="_blank"
            rel="noopener noreferrer"
            $isDarkMode={isDarkMode}
            onClick={(e) => e.stopPropagation()}
          >
            <SvgIcon icon={LuGithub} />
            {t('projects.viewGithub')}
          </ActionLink>
          {post.url && (
            <ActionLink
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              $isDarkMode={isDarkMode}
              onClick={(e) => e.stopPropagation()}
            >
              <SvgIcon icon={LuGlobe} />
              {getHostname(post.url)}
            </ActionLink>
          )}
        </ProjectActions>
      </Body>
    </ProjectRow>
  );
};

export const ProjectsSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <SectionShell id="projects">
      <Container>
        <SectionTitle
          isDarkMode={isDarkMode}
          index="02"
        >
          {t('section.projects')}
        </SectionTitle>

        {blogPosts.map((post, index) => (
          <ProjectItem
            key={post.slug}
            post={post}
            index={index}
            isDarkMode={isDarkMode}
          />
        ))}
      </Container>
    </SectionShell>
  );
};
