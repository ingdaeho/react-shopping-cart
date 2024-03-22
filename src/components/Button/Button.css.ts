import { recipe } from '@vanilla-extract/recipes';

export const contained = recipe({
  base: {
    color: 'white',
    width: '100%',
  },
  variants: {
    color: {
      primary: {
        backgroundColor: '#2ac1bc',
      },
      secondary: {
        backgroundColor: '#73675c',
      },
    },
    size: {
      small: {
        fontSize: 20,
        padding: '14px 28px',
      },
      medium: {
        fontSize: 24,
        padding: 20,
      },
    },
  },
});

export const outlined = recipe({
  base: {
    border: '1px solid #bbbbbb',
    padding: '12px 22px',
  },
  variants: {
    size: {
      small: {
        fontSize: 20,
      },
      medium: {
        fontSize: 24,
      },
    },
  },
});
