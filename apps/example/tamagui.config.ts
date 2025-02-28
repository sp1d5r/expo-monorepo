import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createTamagui } from 'tamagui';

const config = createTamagui({
  fonts: {
    body: createInterFont(),
    heading: createInterFont(),
  },
  tokens,
  themes,
  shorthands,
});

export type AppConfig = typeof config;
export default config;
