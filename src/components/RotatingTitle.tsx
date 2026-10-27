import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface RotatingTitleProps {
  texts: string[];
  interval?: number;
}

const Window = styled.span`
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
`;

const Item = styled.span`
  display: block;
  animation: rise 0.6s ${theme.animations.easing} both;
`;

// 표지판이 돌아가듯 직함을 한 줄씩 교체합니다.
export const RotatingTitle: React.FC<RotatingTitleProps> = ({ texts, interval = 2600 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <Window>
      <Item key={index}>{texts[index]}</Item>
    </Window>
  );
};
