import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';

interface SvgIconProps extends IconBaseProps {
  icon: IconType;
}

// TypeScript 4.9는 ReactNode를 반환하는 react-icons 컴포넌트를 JSX로 받지 않아 타입만 맞춰 렌더링합니다.
export const SvgIcon: React.FC<SvgIconProps> = ({ icon, ...props }) => {
  const Component = icon as unknown as React.FC<IconBaseProps>;
  return <Component aria-hidden="true" focusable="false" {...props} />;
};
