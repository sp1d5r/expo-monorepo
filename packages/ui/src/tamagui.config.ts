import { defaultConfig } from '@tamagui/config/v4';
import { createFont, createTamagui } from 'tamagui';

const playfairFont = createFont({
  family: 'Playfair',
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 18,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
    9: 48,
    10: 56,
  },
  lineHeight: {
    1: 17,
    2: 22,
    3: 25,
    4: 28,
    5: 30,
    6: 36,
    7: 44,
    8: 52,
    9: 60,
    10: 68,
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
  },
  letterSpacing: {
    4: 0,
    8: -1,
  },
});

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  fonts: {
    ...defaultConfig.fonts,
    heading: playfairFont,
    body: playfairFont,
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
