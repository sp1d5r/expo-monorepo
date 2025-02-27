import { getSize } from '@tamagui/get-token';
import {
  GetProps,
  SizeTokens,
  createStyledContext,
  styled,
  withStaticProperties,
  FontSizeTokens,
} from '@tamagui/web';
import { forwardRef, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { ThemeableStack, Text } from 'tamagui';

// Proper typing for size tokens
export type SpinnerSizeTokens = SizeTokens;

export const SpinnerContext = createStyledContext({
  size: '$md' as SpinnerSizeTokens,
});

export const SpinnerFrame = styled(ThemeableStack, {
  name: 'Spinner',
  context: SpinnerContext,

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

// Circle shape for spinner
export const SpinnerCircle = styled(Animated.View, {
  name: 'SpinnerCircle',
  context: SpinnerContext,
  borderWidth: 2,
  borderTopColor: '$color.primary',
  borderRightColor: '$color.primary',
  borderBottomColor: 'transparent',
  borderLeftColor: 'transparent',

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        const sizeValue = getSize(name, {}).val;
        const borderWidth = Math.max(2, sizeValue * 0.1);

        return {
          width: sizeValue,
          height: sizeValue,
          borderWidth,
        };
      },
    },
    variant: {
      primary: {
        borderTopColor: '$color.primary',
        borderRightColor: '$color.primary',
      },
      secondary: {
        borderTopColor: '$color.secondary',
        borderRightColor: '$color.secondary',
      },
      success: {
        borderTopColor: '$color.success',
        borderRightColor: '$color.success',
      },
      warning: {
        borderTopColor: '$color.warning',
        borderRightColor: '$color.warning',
      },
      error: {
        borderTopColor: '$color.error',
        borderRightColor: '$color.error',
      },
      neutral: {
        borderTopColor: '$color.neutral',
        borderRightColor: '$color.neutral',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
  },
});

// Container for spinner that includes optional label
export const SpinnerContainer = styled(ThemeableStack, {
  name: 'SpinnerContainer',
  context: SpinnerContext,
  flexDirection: 'column',
  gap: '$space.0',
});

// Type for the spinner component
type SpinnerProps = GetProps<typeof SpinnerFrame> & {
  label?: string;
  speed?: number; // Duration of one complete rotation in ms
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
};

const SpinnerComponent = forwardRef<React.ElementRef<typeof SpinnerFrame>, SpinnerProps>(
  ({ label, speed = 1000, variant = 'primary', ...props }, ref) => {
    const spinAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Create rotation animation
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: speed,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      return () => {
        // Cleanup animation when component unmounts
        spinAnim.stopAnimation();
      };
    }, [spinAnim, speed]);

    // Create the rotation transform
    const spin = spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <SpinnerContainer gap="$space.2">
        <SpinnerFrame ref={ref} {...props}>
          <SpinnerCircle
            size={props.size || ('$md' as SizeTokens)}
            variant={variant}
            style={{
              transform: [{ rotate: spin }],
            }}
          />
        </SpinnerFrame>

        {label && (
          <Text color="$color.subtle" fontSize={'$sm' as FontSizeTokens}>
            {label}
          </Text>
        )}
      </SpinnerContainer>
    );
  }
);

export const Spinner = withStaticProperties(SpinnerComponent, {
  Props: SpinnerContext.Provider,
});
