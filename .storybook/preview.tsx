import type { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/styles/storybook.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },
    backgrounds: {
      disabled: true,
    },
    options: {
      storySort: {
        order: ['Foundations', 'Components'],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        Light: '',
        Dark: 'dark',
      },
      defaultTheme: 'Light',
    }),
    Story => (
      <div className="contents font-sans text-foreground antialiased">
        <Story />
      </div>
    ),
  ],
};

export default preview;
