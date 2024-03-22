import { style } from '@vanilla-extract/css';

export const nav = style({
  width: '100%',
  height: 80,
  background: '#2ac1bc',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
});

export const navTitle = style({
  fontSize: 40,
  fontWeight: 900,
  textAlign: 'center',
  verticalAlign: 'middle',
  color: '#ffffff',
});

export const navButton = style({
  fontWeight: 500,
  fontSize: 24,
  color: '#ffffff',
});
