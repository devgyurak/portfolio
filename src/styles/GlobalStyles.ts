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
    overflow-x: hidden !important;
    width: 100vw;
    max-width: 100vw;
  }

  body {
    font-family: ${theme.fonts.body};
    background: ${theme.colors.dark.background};
    color: ${theme.colors.dark.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden !important;
    width: 100vw;
    max-width: 100vw;
    position: relative;
    margin: 0;
    padding: 0;
    -webkit-overflow-scrolling: touch;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at top right, rgba(168, 85, 247, 0.04) 0%, transparent 50%),
      radial-gradient(ellipse at bottom left, rgba(236, 72, 153, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(59, 130, 246, 0.04) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
    animation: backgroundFloat 20s ease-in-out infinite;
  }

  body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      conic-gradient(from 0deg at 50% 50%, 
        transparent 0deg, 
        rgba(99, 102, 241, 0.015) 60deg, 
        transparent 120deg, 
        rgba(168, 85, 247, 0.01) 180deg, 
        transparent 240deg, 
        rgba(236, 72, 153, 0.015) 300deg, 
        transparent 360deg);
    pointer-events: none;
    z-index: -1;
    animation: backgroundRotate 60s linear infinite;
  }

  @keyframes backgroundFloat {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    25% { transform: translate(-20px, -20px) scale(1.05); }
    50% { transform: translate(20px, -10px) scale(0.95); }
    75% { transform: translate(-10px, 20px) scale(1.02); }
  }

  @keyframes backgroundRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Prevent horizontal overflow */
  #root {
    overflow-x: hidden !important;
    width: 100vw;
    max-width: 100vw;
  }

  /* Ensure all containers prevent horizontal overflow */
  * {
    box-sizing: border-box;
  }

  section, main, div {
    overflow-x: hidden !important;
  }

  /* Only apply 100vw constraint to specific elements that need it */
  html, body, #root {
    max-width: 100vw !important;
  }

  /* Extra protection for specific elements that might cause overflow */
  img, svg, canvas, video {
    max-width: 100% !important;
    height: auto;
  }

  button {
    font-family: inherit;
  }

  a {
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Hide horizontal scrollbar completely */
  ::-webkit-scrollbar:horizontal {
    display: none;
  }
  
  /* Custom vertical scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 0px; /* Hide horizontal scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  /* Dark mode scrollbar */
  [data-theme="dark"] ::-webkit-scrollbar-track {
    background: ${theme.colors.dark.surface};
  }

  [data-theme="dark"] ::-webkit-scrollbar-thumb {
    background: ${theme.colors.dark.border};
  }

  [data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.dark.accent};
  }
  
  /* Firefox scrollbar */
  html {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  }

  [data-theme="dark"] html {
    scrollbar-color: ${theme.colors.dark.border} ${theme.colors.dark.surface};
  }
`;