import { getSize, getSpace } from '@tamagui/get-token';
import {
  GetProps,
  SizeTokens,
  View,
  Text,
  createStyledContext,
  styled,
  useTheme,
  withStaticProperties,
} from '@tamagui/web';
import { cloneElement, isValidElement, useContext } from 'react';

export const ButtonContext = createStyledContext({
  size: '$md' as SizeTokens,
});

export const ButtonFrame = styled(View, {
  name: 'Button',
  context: ButtonContext,
  background: '$background',
  flexDirection: 'row',

  hoverStyle: {
    background: '$backgroundHover',
  },

  pressStyle: {
    background: '$backgroundPress',
  },

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        return {
          height: tokens.size[name as keyof typeof tokens.size],
          borderRadius: tokens.radius[name as keyof typeof tokens.radius],
          gap: Number(tokens.space[name as keyof typeof tokens.space]) * 0.2,
          paddingHorizontal: getSpace(name, {
            shift: -1,
          }),
        };
      },
    },
  } as const,

  defaultVariants: {
    size: '$md' as SizeTokens,
  },
});

type ButtonProps = GetProps<typeof ButtonFrame>;

export const ButtonText = styled(Text, {
  name: 'ButtonText',
  context: ButtonContext,
  color: '$color',

  variants: {
    size: {
      '...fontSize': (name, { font }) => ({
        fontSize: font?.size[name],
      }),
    },
  } as const,
});

interface IconProps {
  size?: number;
  color?: string;
}

const ButtonIcon = (props: { children: React.ReactElement<IconProps> }) => {
  const { size } = useContext(ButtonContext.context);
  const smaller = getSize(size, {
    shift: -2,
  });
  const theme = useTheme();
  return isValidElement(props.children)
    ? cloneElement(props.children, {
        size: smaller.val * 0.5,
        color: theme?.color?.get(),
      })
    : null;
};

export const Button = withStaticProperties(ButtonFrame, {
  Props: ButtonContext.Provider,
  Text: ButtonText,
  Icon: ButtonIcon,
});
