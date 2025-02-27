import {
  GetProps,
  SizeTokens,
  Text,
  createStyledContext,
  styled,
  withStaticProperties,
  FontSizeTokens,
} from '@tamagui/web';
import { forwardRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { ThemeableStack } from 'tamagui';

// Proper typing for size tokens
export type ProgressSizeTokens = SizeTokens;

export const ProgressContext = createStyledContext({
  size: '$md' as ProgressSizeTokens,
});

// Track (background)
export const ProgressTrack = styled(ThemeableStack, {
  name: 'ProgressTrack',
  context: ProgressContext,
  width: '100%',
  overflow: 'hidden',
  background: '$backgroundSubtle',

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        const tokenName = name as keyof typeof tokens.size;
        // Make the height smaller than standard size tokens
        const size = tokens.size[tokenName];
        return {
          height: typeof size === 'number' ? size / 3 : 8,
          borderRadius: typeof size === 'number' ? size / 6 : 4,
        };
      },
    },
    rounded: {
      true: {
        borderRadius: 999,
      },
    },
  } as const,

  defaultVariants: {
    size: '$md' as SizeTokens,
  },
});

// Indicator (filled part)
export const ProgressIndicator = styled(Animated.View, {
  name: 'ProgressIndicator',
  height: '100%',
  width: '0%', // Will be overridden by animated style
  background: '$primary',

  variants: {
    variant: {
      primary: {
        background: '$primary',
      },
      secondary: {
        background: '$secondary',
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
      neutral: {
        background: '$neutral',
      },
    },
    striped: {
      true: {
        backgroundImage:
          'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)',
        backgroundSize: '1rem 1rem',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
  },
});

// Container for the progress that includes optional label
export const ProgressContainer = styled(ThemeableStack, {
  name: 'ProgressContainer',
  context: ProgressContext,
  width: '100%',
  gap: '$space.1',
});

// Label for the progress
export const ProgressLabel = styled(Text, {
  name: 'ProgressLabel',
  context: ProgressContext,
  color: '$color',
  fontWeight: '500',

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

// Description for the progress
export const ProgressDescription = styled(Text, {
  name: 'ProgressDescription',
  context: ProgressContext,
  color: '$color.subtle',

  variants: {
    size: {
      '...fontSize': (name, { font }) => {
        if (!font) return {};
        const tokenName = name as keyof typeof font.size;
        // Make description slightly smaller
        const fontSize = font.size[tokenName];
        return {
          fontSize: typeof fontSize === 'number' ? fontSize * 0.85 : fontSize,
        };
      },
    },
  } as const,
});

// Value indicator (percentage)
export const ProgressValue = styled(Text, {
  name: 'ProgressValue',
  context: ProgressContext,
  color: '$color.subtle',
  fontWeight: '500',

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

// Headers row container
export const ProgressHeader = styled(ThemeableStack, {
  name: 'ProgressHeader',
  context: ProgressContext,
  width: '100%',
  flexDirection: 'row',
});

// Left side of the header
export const ProgressHeaderLeft = styled(ThemeableStack, {
  name: 'ProgressHeaderLeft',
  context: ProgressContext,
  flex: 1,
});

// Type for the progress component
type ProgressProps = GetProps<typeof ProgressTrack> & {
  value: number; // 0-100
  max?: number; // Default is 100
  label?: string;
  description?: string;
  showValue?: boolean;
  animated?: boolean;
  striped?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
};

const ProgressComponent = forwardRef<React.ElementRef<typeof ProgressTrack>, ProgressProps>(
  (
    {
      value,
      max = 100,
      label,
      description,
      showValue = false,
      animated = true,
      striped = false,
      variant = 'primary',
      ...props
    },
    ref
  ) => {
    // Normalize the value
    const normalizedValue = Math.min(Math.max(0, value), max);
    const percentage = (normalizedValue / max) * 100;

    // Animation for smooth transitions
    const [widthAnim] = useState(new Animated.Value(0));

    useEffect(() => {
      if (animated) {
        Animated.timing(widthAnim, {
          toValue: percentage,
          duration: 300,
          useNativeDriver: false, // Layout animations can't use native driver
        }).start();
      } else {
        widthAnim.setValue(percentage);
      }
    }, [percentage, animated, widthAnim]);

    const hasHeader = label || description || showValue;

    return (
      <ProgressContainer>
        {hasHeader && (
          <ProgressHeader>
            <ProgressHeaderLeft>
              {label && (
                <ProgressLabel size={(props.size as FontSizeTokens) || ('$md' as FontSizeTokens)}>
                  {label}
                </ProgressLabel>
              )}
              {description && (
                <ProgressDescription
                  size={(props.size as FontSizeTokens) || ('$md' as FontSizeTokens)}
                >
                  {description}
                </ProgressDescription>
              )}
            </ProgressHeaderLeft>

            {showValue && (
              <ProgressValue size={(props.size as FontSizeTokens) || ('$md' as FontSizeTokens)}>
                {`${Math.round(percentage)}%`}
              </ProgressValue>
            )}
          </ProgressHeader>
        )}

        <ProgressTrack ref={ref} {...props}>
          <ProgressIndicator
            variant={variant}
            striped={striped}
            style={{
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </ProgressTrack>
      </ProgressContainer>
    );
  }
);

export const Progress = withStaticProperties(ProgressComponent, {
  Props: ProgressContext.Provider,
});
