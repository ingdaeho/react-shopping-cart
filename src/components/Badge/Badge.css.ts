import { style } from '@vanilla-extract/css';

export const badgeContainer = style({
  position: 'relative',
  display: 'inline-flex',
});

export const badge = style({
  position: 'absolute',
  top: 0,
  right: 0,
  minWidth: 20,
  height: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.75rem',
  borderRadius: 10,
  backgroundColor: 'red',
  color: 'white',
  placeContent: 'center',
  transform: 'scale(1) translate(50%, -50%)',
  transformOrigin: '100% 0%',
});
