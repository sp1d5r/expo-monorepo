import { getSize } from '@tamagui/get-token';
import {
  GetProps,
  SizeTokens,
  createStyledContext,
  styled,
  useTheme,
  withStaticProperties,
} from '@tamagui/web';
import React, { forwardRef, useContext } from 'react';
import { Pressable } from 'react-native';
import { ThemeableStack } from 'tamagui';

// Proper typing for size tokens
export type IconSizeTokens = SizeTokens;

export const IconContext = createStyledContext({
  size: '$md' as IconSizeTokens,
  color: undefined as string | undefined,
});

export const IconFrame = styled(ThemeableStack, {
  name: 'Icon',
  context: IconContext,

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        return {
          width: getSize(name, {}).val,
          height: getSize(name, {}).val,
        };
      },
    },
  } as const,

  defaultVariants: {
    size: '$md' as SizeTokens,
  },
});

// Pressable icon wrapper
export const IconButton = styled(Pressable, {
  name: 'IconButton',
  context: IconContext,
  verticalAlign: 'center',

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        const iconSize = getSize(name, {}).val;
        // Make the button a bit larger than the icon for better touch area
        return {
          width: iconSize * 1.5,
          height: iconSize * 1.5,
        };
      },
    },
    variant: {
      ghost: {
        background: 'transparent',
      },
      subtle: {
        background: '$backgroundSubtle',
      },
      solid: {
        background: '$background',
      },
      outline: {
        background: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'ghost',
  },

  hoverStyle: {
    background: '$backgroundHover',
  },

  pressStyle: {
    background: '$backgroundPress',
    opacity: 0.7,
  },
});

export const IconGroup = styled(ThemeableStack, {
  name: 'IconGroup',
  context: IconContext,
  flexDirection: 'row',
  gap: '$2',
});

// Create a simple icon props interface
interface IconElementProps {
  width?: number;
  height?: number;
  color?: string;
  size?: number;
  [key: string]: any; // Allow other props that icon libraries might use
}

type IconProps = GetProps<typeof IconFrame> & {
  children: React.ReactElement<IconElementProps>;
  color?: string;
};

const IconComponent = forwardRef<React.ElementRef<typeof IconFrame>, IconProps>(
  ({ children, color, ...props }, ref) => {
    const theme = useTheme();
    const contextColor = useContext(IconContext.context).color;

    // Determine the color to use (prop > context > theme)
    const finalColor = color || contextColor || theme?.color?.val || '#000';

    // Clone the SVG element to pass the color and size
    const iconElement = React.isValidElement<IconElementProps>(children)
      ? React.cloneElement<IconElementProps>(children, {
          width: getSize(props.size || '$md', {}).val,
          height: getSize(props.size || '$md', {}).val,
          color: finalColor,
          ...(typeof children.props === 'object' ? children.props : {}),
        })
      : null;

    return (
      <IconFrame ref={ref} {...props}>
        {iconElement}
      </IconFrame>
    );
  }
);

export const Icon = withStaticProperties(IconComponent, {
  Props: IconContext.Provider,
  Button: IconButton,
  Group: IconGroup,
});
