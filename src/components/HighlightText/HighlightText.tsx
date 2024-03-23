import { PropsWithChildren } from 'react';
import { highlightText } from './HighlightText.css';

const HighlightText = ({ children }: PropsWithChildren) => {
  return <span className={highlightText}>{children}</span>;
};

export default HighlightText;
