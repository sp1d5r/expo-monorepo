import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Button, Text, YStack } from 'tamagui';

const taglines = [
  'PERSONALISED MEDIDATIONS FOR YOU',
  'FIND YOUR INNER PEACE',
  'DISCOVER MINDFULNESS',
  'TRANSFORM YOUR PRACTICE',
];

export function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();
  const [currentTagline, setCurrentTagline] = useState(0);
  const [nextTagline, setNextTagline] = useState(1);
  const slideAnim = useSharedValue(0);

  const currentTextStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(slideAnim.value, [0, 1], [0, -30]),
      },
    ],
    opacity: interpolate(slideAnim.value, [0, 1], [1, 0]),
  }));

  const nextTextStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(slideAnim.value, [0, 1], [30, 0]),
      },
    ],
    opacity: interpolate(slideAnim.value, [0, 1], [0, 1]),
  }));

  const animateText = () => {
    slideAnim.value = 0;
    setNextTagline((currentTagline + 1) % taglines.length);
    slideAnim.value = withTiming(1, { duration: 500 }, () => {
      runOnJS(setCurrentTagline)((currentTagline + 1) % taglines.length);
    });
  };

  useEffect(() => {
    const interval = setInterval(animateText, 4000);
    return () => clearInterval(interval);
  }, [currentTagline]);

  const handleGetStarted = () => {
    router.push('/(auth)/register');
  };

  const handleSignIn = () => {
    router.push('/(auth)/login');
  };

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      justifyContent="space-between"
      paddingVertical="$12"
      paddingHorizontal="$4"
    >
      {/* Logo and Tagline Section */}
      <YStack flex={1} alignItems="center" justifyContent="center" space="$6">
        <Text fontFamily="Playfair" fontSize={40} fontWeight="400" color="black" textAlign="center">
          Nadine
        </Text>
        <YStack h={20} ai="center" jc="center" pos="relative" width="100%">
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              currentTextStyle,
            ]}
          >
            <Text
              fontFamily="SpaceMono"
              fontSize={14}
              color="black"
              letterSpacing={1}
              textAlign="center"
            >
              {taglines[currentTagline]}
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              nextTextStyle,
            ]}
          >
            <Text
              fontFamily="SpaceMono"
              fontSize={14}
              color="black"
              letterSpacing={1}
              textAlign="center"
            >
              {taglines[nextTagline]}
            </Text>
          </Animated.View>
        </YStack>
      </YStack>

      {/* Buttons Section */}
      <YStack space="$4" width="100%" maxWidth={isDesktop ? 400 : '100%'} alignSelf="center">
        <Button
          size="$3"
          backgroundColor="black"
          color="white"
          borderRadius="$4"
          onPress={handleGetStarted}
        >
          GET STARTED
        </Button>

        <Button
          size="$3"
          backgroundColor="transparent"
          color="black"
          textDecoration="underline"
          onPress={handleSignIn}
        >
          I ALREADY HAVE AN ACCOUNT
        </Button>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  // Add any additional styles if needed
});
