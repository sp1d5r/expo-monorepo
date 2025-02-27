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
import { forwardRef, useState } from 'react';
import { Pressable } from 'react-native';

export const CheckboxContext = createStyledContext({
  size: '$md' as SizeTokens,
});

type CheckboxFrameProps = { checked?: boolean };

export const CheckboxFrame = styled(Pressable, {
  name: 'Checkbox',
  context: CheckboxContext,
  verticalAlign: 'center',
  background: 'transparent',
  borderWidth: 2,
  borderColor: '$borderColor',
  overflow: 'hidden',

  hoverStyle: {
    borderColor: '$borderColorHover',
  },

  focusStyle: {
    borderColor: '$borderColorFocus',
  },

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        const size = getSize(name, {
          shift: -1,
        });
        return {
          width: size.val,
          height: size.val,
          borderRadius: Number(tokens.radius[name as keyof typeof tokens.radius]) * 0.25,
        };
      },
    },
    checked: {
      true: {
        backgroundColor: '$accentColor',
        borderColor: '$accentColor',
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
} as const);

const CheckIcon = styled(View, {
  name: 'CheckIcon',
  width: '60%',
  height: '30%',
  borderLeftWidth: 2,
  borderBottomWidth: 2,
  borderColor: 'white',
  transform: [{ rotate: '-45deg' }],
  position: 'absolute',
  y: '35%',
});

export const CheckboxLabel = styled(Text, {
  name: 'CheckboxLabel',
  context: CheckboxContext,
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

export const CheckboxContainer = styled(View, {
  name: 'CheckboxContainer',
  context: CheckboxContext,
  flexDirection: 'row',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,
});

type CheckboxProps = GetProps<typeof CheckboxFrame> & {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const CheckboxComponent = forwardRef<React.ElementRef<typeof CheckboxFrame>, CheckboxProps>(
  ({ defaultChecked, checked: checkedProp, onChange, ...props }, ref) => {
    const [checkedState, setCheckedState] = useState(defaultChecked || false);
    const isControlled = checkedProp !== undefined;
    const isChecked = isControlled ? checkedProp : checkedState;

    const handlePress = () => {
      if (!isControlled) {
        setCheckedState((prev) => !prev);
      }
      onChange?.(!isChecked);
    };

    return (
      <CheckboxFrame ref={ref} checked={isChecked} onPress={handlePress} {...props}>
        {isChecked && <CheckIcon />}
      </CheckboxFrame>
    );
  }
);

export const Checkbox = withStaticProperties(CheckboxComponent, {
  Props: CheckboxContext.Provider,
  Label: CheckboxLabel,
  Container: CheckboxContainer,
});
