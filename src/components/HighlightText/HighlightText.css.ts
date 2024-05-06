import { style } from '@vanilla-extract/css';

export const highlightText = style({
  position: 'relative',
  fontWeight: 700,
  display: 'inline-block',
  textAlign: 'center',
  padding: '0 2px',
  fontSize: 20,

  '::after': {
    content: '',
    display: 'block',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 8,
    backgroundColor: '#2ac1bc',
    opacity: 0.5,
    zIndex: -1,
  },
});
