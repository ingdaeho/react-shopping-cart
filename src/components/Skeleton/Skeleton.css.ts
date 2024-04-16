import { keyframes, style } from '@vanilla-extract/css';

const pulse = keyframes({
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
  '100%': {
    opacity: 1,
  },
});

export const skeleton = style({
  backgroundColor: '#e0e0e0',
  borderRadius: 4,
  display: 'inline-block',
  height: '100%',
  width: '100%',
  animation: `${pulse} 1.5s infinite ease-in-out`,
});
