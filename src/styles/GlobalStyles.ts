import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
    overflow-x: clip;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: ${theme.fonts.body};
    background: ${theme.colors.light.background};
    color: ${theme.colors.light.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    overflow-x: clip;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  body[data-theme='dark'] {
    background: ${theme.colors.dark.background};
    color: ${theme.colors.dark.text};
    color-scheme: dark;
  }

  #root {
    width: 100%;
    overflow-x: hidden;
    overflow-x: clip;
  }

  h1, h2, h3, h4, p {
    text-wrap: pretty;
  }

  body {
    font-variant-numeric: tabular-nums;
  }

  img, svg, canvas, video {
    max-width: 100%;
    height: auto;
  }

  button {
    font-family: inherit;
  }

  a {
    color: inherit;
  }

  ::selection {
    background: ${theme.colors.light.accent};
    color: #ffffff;
  }

  body[data-theme='dark'] ::selection {
    background: ${theme.colors.dark.accent};
    color: ${theme.colors.dark.background};
  }

  :focus-visible {
    outline: 2px solid ${theme.colors.light.accent};
    outline-offset: 3px;
  }

  body[data-theme='dark'] :focus-visible {
    outline-color: ${theme.colors.dark.accent};
  }

  @keyframes rise {
    from {
      transform: translate3d(0, 105%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 0;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border: 3px solid transparent;
    background-clip: padding-box;
    border-radius: ${theme.radius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  body[data-theme='dark'] ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.12);
  }

  body[data-theme='dark'] ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.24);
  }

  html {
    scrollbar-width: thin;
  }
`;
