import type { Preview } from '@storybook/react';
import '../src/styles/common/index.css';
import '../src/styles/page/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
