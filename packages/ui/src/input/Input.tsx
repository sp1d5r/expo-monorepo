import { getSize, getSpace } from '@tamagui/get-token';
import {
  GetProps,
  SizeTokens,
  View,
  createStyledContext,
  styled,
  useTheme,
  withStaticProperties,
} from '@tamagui/web';
import { cloneElement, isValidElement, useContext } from 'react';
import { Input as TextInput } from 'tamagui';

export const InputContext = createStyledContext({
  size: '$md' as SizeTokens,
});

export const InputFrame = styled(TextInput, {
  name: 'Input',
  context: InputContext,
  background: '$backgroundInput',
  borderColor: '$borderColor',
  borderWidth: 1,
  color: '$color',

  // Add focus styles
  focusStyle: {
    borderColor: '$borderColorFocus',
    background: '$backgroundInputFocus',
  },

  // Add error styles
  variants: {
    size: {
      '...size': (name: SizeTokens, { tokens }: { tokens: any }) => {
        return {
          height: tokens.size[name],
          borderRadius: tokens.radius[name as keyof typeof tokens.radius],
          paddingHorizontal: getSpace(name, {
            shift: -1,
          }),
          fontSize: tokens.fontSize[name as keyof typeof tokens.fontSize],
        };
      },
    },
    error: {
      true: {
        borderColor: '$color.error',
        borderWidth: 1,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    size: '$md' as SizeTokens,
  },
});

export const InputContainer = styled(View, {
  name: 'InputContainer',
  context: InputContext,
  flexDirection: 'row',
  //   align: 'center',
  position: 'relative',

  variants: {
    size: {
      '...size': (name: SizeTokens, { tokens }: { tokens: any }) => {
        return {
          gap: Number(tokens.space[name]) * 0.2,
        };
      },
    },
  } as const,
});

type InputProps = GetProps<typeof InputFrame>;

interface IconProps {
  size?: number;
  color?: string;
}

// Icon components for leading and trailing icons
const LeadingIcon = (props: { children: React.ReactElement<IconProps> }) => {
  const { size } = useContext(InputContext.context);
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

const TrailingIcon = (props: { children: React.ReactElement<IconProps> }) => {
  const { size } = useContext(InputContext.context);
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

export const Input = withStaticProperties(InputFrame, {
  Props: InputContext.Provider,
  Container: InputContainer,
  LeadingIcon,
  TrailingIcon,
});
