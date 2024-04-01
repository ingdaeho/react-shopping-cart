import { style } from '@vanilla-extract/css';

export const modalContainer = style({
  position: 'fixed',
  minWidth: 360,
  minHeight: 200,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  background: 'white',
  padding: 20,
  borderRadius: 5,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const modalDimmed = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  position: 'absolute',
  top: 0,
  left: 0,
});

export const modalTitle = style({
  fontSize: 20,
  fontWeight: 600,
});

export const modalContent = style({
  padding: 24,
});

export const modalFooter = style({});
