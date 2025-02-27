import { getSize, getSpace } from '@tamagui/get-token';
import {
  GetProps,
  SizeTokens,
  View,
  Text,
  createStyledContext,
  styled,
  withStaticProperties,
  FontSizeTokens,
} from '@tamagui/web';
import { forwardRef } from 'react';

// Defining size token types to avoid type conflicts
export type BadgeSizeTokens = SizeTokens;

export const BadgeContext = createStyledContext({
  size: '$md' as BadgeSizeTokens,
});

export const BadgeFrame = styled(View, {
  name: 'Badge',
  context: BadgeContext,
  flexDirection: 'row',
  verticalAlign: 'center',

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        return {
          height: getSize(name, { shift: -2 }).val,
          paddingHorizontal: getSpace(name, { shift: -2 }).val,
        };
      },
    },
    variant: {
      solid: {
        background: '$background',
      },
      outline: {
        background: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      subtle: {
        background: '$backgroundSubtle',
      },
    },
    status: {
      primary: {
        background: '$primary',
      },
      success: {
        background: '$success',
      },
      warning: {
        background: '$warning',
      },
      error: {
        background: '$error',
      },
      info: {
        background: '$info',
      },
      neutral: {
        background: '$neutral',
      },
    },
  } as const,

  defaultVariants: {
    size: '$md' as SizeTokens,
    variant: 'solid',
  },
});

export const BadgeText = styled(Text, {
  name: 'BadgeText',
  context: BadgeContext,
  color: 'white',
  fontWeight: '500',
  text: 'center',

  variants: {
    size: {
      '...fontSize': (name, { font }) => {
        if (!font) return {};
        const tokenName = name as keyof typeof font.size;
        const fontSize = font.size[tokenName];
        return {
          fontSize: typeof fontSize === 'number' ? fontSize * 0.75 : fontSize,
        };
      },
    },
    status: {
      primary: {
        color: 'white',
      },
      success: {
        color: 'white',
      },
      warning: {
        color: 'white',
      },
      error: {
        color: 'white',
      },
      info: {
        color: 'white',
      },
      neutral: {
        color: 'white',
      },
    },
    variant: {
      outline: {
        color: '$color',
      },
      subtle: {
        color: '$color.subtle',
      },
      solid: {
        color: 'white',
      },
    },
  } as const,
});

type BadgeProps = GetProps<typeof BadgeFrame> & {
  children?: React.ReactNode;
};

const BadgeComponent = forwardRef<React.ElementRef<typeof BadgeFrame>, BadgeProps>(
  ({ children, ...props }, ref) => {
    return (
      <BadgeFrame ref={ref} {...props}>
        {typeof children === 'string' ? (
          <BadgeText
            size={(props.size as FontSizeTokens) || ('$md' as FontSizeTokens)}
            status={props.status}
            variant={props.variant}
          >
            {children}
          </BadgeText>
        ) : (
          children
        )}
      </BadgeFrame>
    );
  }
);

export const Badge = withStaticProperties(BadgeComponent, {
  Props: BadgeContext.Provider,
  Text: BadgeText,
});
