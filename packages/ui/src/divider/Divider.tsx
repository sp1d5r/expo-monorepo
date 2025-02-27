import {
  GetProps,
  SizeTokens,
  FontSizeTokens,
  createStyledContext,
  styled,
  withStaticProperties,
  Text,
} from '@tamagui/web';
import { forwardRef } from 'react';
import { ThemeableStack } from 'tamagui';

// Custom token for divider thickness
export type DividerSizeTokens = SizeTokens;

export const DividerContext = createStyledContext({
  size: '$sm' as DividerSizeTokens,
});

export const DividerFrame = styled(ThemeableStack, {
  name: 'Divider',
  context: DividerContext,
  width: '100%',
  flexDirection: 'row',

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        // Use smaller sizes for the divider thickness
        const tokenName = name as keyof typeof tokens.size;
        const thickness = tokens.size[tokenName];
        return {
          height: typeof thickness === 'number' ? thickness / 10 : 1,
        };
      },
    },
    orientation: {
      horizontal: {
        width: '100%',
        height: 1,
        flexDirection: 'row',
      },
      vertical: {
        height: '100%',
        width: 1,
        flexDirection: 'column',
      },
    } as const,
    variant: {
      solid: {
        background: '$borderColor',
      },
      dashed: {
        background: 'transparent',
        borderStyle: 'dashed',
        borderWidth: 0,
        borderTopWidth: 1,
        borderColor: '$borderColor',
      },
      dotted: {
        background: 'transparent',
        borderStyle: 'dotted',
        borderWidth: 0,
        borderTopWidth: 1,
        borderColor: '$borderColor',
      },
    },
  } as const,

  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
    size: '$sm' as SizeTokens,
  },
});

// For dividers with text/elements in the middle
export const DividerLabel = styled(ThemeableStack, {
  name: 'DividerLabel',
  context: DividerContext,
  flexDirection: 'row',
  paddingBlock: '$2',
});

export const DividerText = styled(Text, {
  name: 'DividerText',
  context: DividerContext,
  color: '$color.subtle',
  fontWeight: '500',
  paddingBlock: '$2',

  variants: {
    size: {
      '...fontSize': (name, { font }) => {
        if (!font) return {};
        const tokenName = name as keyof typeof font.size;
        return {
          fontSize: font.size[tokenName],
        };
      },
    },
  } as const,
});

type DividerVariantProps = {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  size?: SizeTokens;
};

type DividerProps = GetProps<typeof DividerFrame> &
  DividerVariantProps & {
    children?: React.ReactNode;
  };

const DividerComponent = forwardRef<React.ElementRef<typeof DividerFrame>, DividerProps>(
  ({ children, ...props }, ref) => {
    if (!children || props.orientation === 'vertical') {
      return <DividerFrame ref={ref} {...props} />;
    }

    // Render a horizontal divider with content in the middle
    return (
      <DividerFrame
        ref={ref}
        {...props}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: 0,
        }}
      >
        <DividerFrame
          orientation="horizontal"
          variant={props.variant}
          size={props.size}
          style={{ flex: 1 }}
        />

        {typeof children === 'string' ? (
          <DividerText size={(props.size as FontSizeTokens) || ('$sm' as FontSizeTokens)}>
            {children}
          </DividerText>
        ) : (
          <DividerLabel>{children}</DividerLabel>
        )}

        <DividerFrame
          orientation="horizontal"
          variant={props.variant}
          size={props.size}
          style={{ flex: 1 }}
        />
      </DividerFrame>
    );
  }
);

export const Divider = withStaticProperties(DividerComponent, {
  Props: DividerContext.Provider,
  Text: DividerText,
});
