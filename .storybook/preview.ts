import type { Preview } from '@storybook/sveltekit'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    backgrounds: {
      options: {
        gray: { name: 'Gray', value: '#888888' },
        dark: { name: 'Dark', value: '#4a4a4a' },
        light: { name: 'Light', value: '#f0f0f0' },
        white: { name: 'White', value: '#ffffff' },
      },
      default: 'gray',
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;