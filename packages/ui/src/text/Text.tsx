import {
  GetProps,
  FontSizeTokens,
  Text as TamaguiText,
  createStyledContext,
  styled,
  withStaticProperties,
} from '@tamagui/web';

export const TextContext = createStyledContext({
  size: 'md' as FontSizeTokens,
  weight: 'normal',
  align: 'left',
});

export const TextFrame = styled(TamaguiText, {
  name: 'Text',
  context: TextContext,
  color: '$color',

  variants: {
    size: {
      '...fontSize': (name, { font }) => ({
        fontSize: font?.size[name],
        lineHeight: font?.lineHeight[name],
      }),
    },
    weight: {
      thin: { fontWeight: '100' },
      extralight: { fontWeight: '200' },
      light: { fontWeight: '300' },
      normal: { fontWeight: '400' },
      medium: { fontWeight: '500' },
      semibold: { fontWeight: '600' },
      bold: { fontWeight: '700' },
      extrabold: { fontWeight: '800' },
      black: { fontWeight: '900' },
    },
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
      justify: { textAlign: 'justify' },
    },
    ellipsis: {
      true: {
        numberOfLines: 1,
        ellipsizeMode: 'tail',
      },
    },
    numberOfLines: {
      1: { numberOfLines: 1 },
      2: { numberOfLines: 2 },
      3: { numberOfLines: 3 },
      4: { numberOfLines: 4 },
      5: { numberOfLines: 5 },
    },
  } as const,

  defaultVariants: {
    size: 'md' as FontSizeTokens,
    weight: 'normal',
    align: 'left',
  },
});

type TextProps = GetProps<typeof TextFrame>;

export const Text = withStaticProperties(TextFrame, {
  Props: TextContext.Provider,
});
