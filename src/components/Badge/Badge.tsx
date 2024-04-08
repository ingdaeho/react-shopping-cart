import { PropsWithChildren, ReactNode } from 'react';
import { badgeContainer, badge } from './Badge.css';

interface Props extends PropsWithChildren {
  children: ReactNode;
  badgeContent: number;
  bgColor?: string;
  textColor?: string;
}

const Badge = ({
  children,
  badgeContent,
  bgColor = 'red',
  textColor = 'white',
}: Props) => {
  return (
    <div className={badgeContainer}>
      <div
        className={badge}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {badgeContent}
      </div>
      {children}
    </div>
  );
};

export default Badge;
