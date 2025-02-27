import { getSize } from '@tamagui/get-token';
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
import { forwardRef, useState } from 'react';
import { Image } from 'tamagui';

export const AvatarContext = createStyledContext({
  size: '$md' as SizeTokens,
});

export const AvatarFrame = styled(View, {
  name: 'Avatar',
  context: AvatarContext,
  verticalAlign: 'center',
  background: '$backgroundAvatar',
  overflow: 'hidden',

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        const size = getSize(name, {});
        return {
          width: size.val,
          height: size.val,
          borderRadius: size.val / 2, // Circle by default
        };
      },
    },
    square: {
      true: {
        borderRadius: '$radius.sm',
      },
    },
    rounded: {
      true: {
        borderRadius: '$radius.md',
      },
    },
  } as const,

  defaultVariants: {
    size: '$md' as SizeTokens,
  },
});

export const AvatarImage = styled(Image, {
  name: 'AvatarImage',
  width: '100%',
  height: '100%',
  position: 'absolute',
});

export const AvatarFallback = styled(View, {
  name: 'AvatarFallback',
  verticalAlign: 'center',
  width: '100%',
  height: '100%',
});

export const AvatarText = styled(Text, {
  name: 'AvatarText',
  context: AvatarContext,
  color: 'white',
  fontWeight: 500,

  variants: {
    size: {
      '...fontSize': (name, { font }) => {
        // Make the font a bit smaller than the standard size for the avatar
        const fontSize = font?.size[name] || 16;
        return {
          fontSize: typeof fontSize === 'number' ? fontSize * 0.75 : fontSize,
        };
      },
    },
  } as const,
});

// Optional badge component that can be positioned on the avatar
export const AvatarBadge = styled(View, {
  name: 'AvatarBadge',
  context: AvatarContext,
  position: 'absolute',
  background: '$accentColor',
  borderWidth: 2,
  borderColor: 'white',

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        const avatarSize = getSize(name, {});
        const badgeSize = avatarSize.val * 0.25;
        return {
          width: badgeSize,
          height: badgeSize,
          borderRadius: badgeSize / 2,
          right: 0,
          bottom: 0,
        };
      },
    },
    position: {
      topRight: {
        top: 0,
        right: 0,
        bottom: 'auto',
        left: 'auto',
      },
      topLeft: {
        top: 0,
        left: 0,
        bottom: 'auto',
        right: 'auto',
      },
      bottomRight: {
        bottom: 0,
        right: 0,
        top: 'auto',
        left: 'auto',
      },
      bottomLeft: {
        bottom: 0,
        left: 0,
        top: 'auto',
        right: 'auto',
      },
    },
    status: {
      online: {
        backgroundColor: '$success',
      },
      offline: {
        backgroundColor: '$neutral',
      },
      busy: {
        backgroundColor: '$error',
      },
      away: {
        backgroundColor: '$warning',
      },
    },
  } as const,

  defaultVariants: {
    position: 'bottomRight',
  },
});

export const AvatarGroup = styled(View, {
  name: 'AvatarGroup',
  context: AvatarContext,
  flexDirection: 'row',

  variants: {
    spacing: {
      sm: {
        gap: -10,
      },
      md: {
        gap: -15,
      },
      lg: {
        gap: -20,
      },
    },
  } as const,

  defaultVariants: {
    spacing: 'md',
  },
});

type AvatarComponentProps = GetProps<typeof AvatarFrame> & {
  src?: string;
  alt?: string;
  fallback?: string;
  onError?: () => void;
};

const AvatarComponent = forwardRef<React.ElementRef<typeof AvatarFrame>, AvatarComponentProps>(
  ({ src, alt, fallback, onError, ...props }, ref) => {
    const [error, setError] = useState(!src);

    const handleError = () => {
      setError(true);
      onError?.();
    };

    // Generate initials from name/alt if fallback is not provided
    const getInitials = () => {
      if (fallback) return fallback;
      if (!alt) return '';

      return alt
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    };

    return (
      <AvatarFrame ref={ref} {...props}>
        {src && !error ? (
          <AvatarImage source={{ uri: src }} alt={alt} onError={handleError} />
        ) : (
          <AvatarFallback>
            <AvatarText size={(props.size as FontSizeTokens) || ('$md' as FontSizeTokens)}>
              {getInitials()}
            </AvatarText>
          </AvatarFallback>
        )}
      </AvatarFrame>
    );
  }
);

export const Avatar = withStaticProperties(AvatarComponent, {
  Props: AvatarContext.Provider,
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Text: AvatarText,
  Badge: AvatarBadge,
  Group: AvatarGroup,
});
