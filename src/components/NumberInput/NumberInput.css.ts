import { style } from '@vanilla-extract/css';

export const numberInputContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const numberInput = style({
  width: 75,
  height: 58,
  border: '1px solid #dddddd',
  textAlign: 'center',
  fontSize: 24,
});

export const numberInputButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px 12px',
  border: '1px solid #dddddd',
  fontSize: '100%',
  cursor: 'pointer',

  ':focus': {
    outline: 'none',
  },
});
