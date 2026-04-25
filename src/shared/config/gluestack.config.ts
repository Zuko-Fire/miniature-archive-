import { createConfig } from '@gluestack-ui/themed';
import { config as defaultConfig } from '@gluestack-ui/themed';

export const gluestackConfig = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      dark900: '#1a1a1a',
      dark800: '#262626',
      dark700: '#404040',
      accentPurple: '#6d28d9',
      accentPurpleHover: '#5b21b6',
    },
  },
});

export type Config = typeof gluestackConfig;