import { getSize } from '@tamagui/get-token';
import {
  GetProps,
  SizeTokens,
  View,
  Text,
  createStyledContext,
  styled,
  withStaticProperties,
} from '@tamagui/web';
import { forwardRef, useContext, useState } from 'react';
import { Pressable, Animated, Easing } from 'react-native';

export const SwitchContext = createStyledContext({
  size: '$md' as SizeTokens,
});

export const SwitchFrame = styled(Pressable, {
  name: 'Switch',
  context: SwitchContext,
  flexDirection: 'row',
  verticalAlign: 'center',
  background: '$backgroundSwitch',

  hoverStyle: {
    opacity: 0.9,
  },

  focusStyle: {
    borderWidth: 2,
    borderColor: '$borderColorFocus',
  },

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        const height = getSize(name, {
          shift: -1,
        });
        return {
          width: height.val * 1.8,
          height: height.val,
          borderRadius: height.val / 2,
        };
      },
    },
    active: {
      true: {
        backgroundColor: '$accentColor',
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

const SwitchThumb = styled(Animated.View, {
  name: 'SwitchThumb',
  background: 'white',
  borderEndEndRadius: 999,
  position: 'absolute',
  y: 2,
  x: 2,

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        const height = getSize(name, {
          shift: -1,
        });
        const thumbSize = height.val - 4;
        return {
          width: thumbSize,
          height: thumbSize,
        };
      },
    },
  } as const,
});

export const SwitchLabel = styled(Text, {
  name: 'SwitchLabel',
  context: SwitchContext,
  color: '$color',
  marginStart: '$2',

  variants: {
    size: {
      '...fontSize': (name, { font }) => ({
        fontSize: font?.size[name],
      }),
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
});

export const SwitchContainer = styled(View, {
  name: 'SwitchContainer',
  context: SwitchContext,
  flexDirection: 'row',
  verticalAlign: 'center',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,
});

type SwitchProps = GetProps<typeof SwitchFrame> & {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const SwitchComponent = forwardRef<React.ElementRef<typeof SwitchFrame>, SwitchProps>(
  ({ defaultChecked, checked: checkedProp, onChange, ...props }, ref) => {
    const [checkedState, setCheckedState] = useState(defaultChecked || false);
    const isControlled = checkedProp !== undefined;
    const isChecked = isControlled ? checkedProp : checkedState;
    const { size } = useContext(SwitchContext.context);

    // Animation value
    const [thumbAnim] = useState(new Animated.Value(isChecked ? 1 : 0));

    const handlePress = () => {
      if (!isControlled) {
        setCheckedState((prev) => !prev);
      }

      // Animate the thumb
      Animated.timing(thumbAnim, {
        toValue: isChecked ? 0 : 1,
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }).start();

      onChange?.(!isChecked);
    };

    // Calculate the translation based on size
    const translateX = thumbAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, getSize(size, { shift: -1 }).val * 0.8], // Adjust this calculation based on your design
    });

    return (
      <SwitchFrame ref={ref} active={isChecked} onPress={handlePress} {...props}>
        <SwitchThumb
          size={size}
          style={{
            transform: [{ translateX }],
          }}
        />
      </SwitchFrame>
    );
  }
);

export const Switch = withStaticProperties(SwitchComponent, {
  Props: SwitchContext.Provider,
  Label: SwitchLabel,
  Container: SwitchContainer,
});
