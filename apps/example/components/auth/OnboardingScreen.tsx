import { Image, ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';
import { Button, Card, H1, Text, XStack, YStack } from 'tamagui';

export function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768; // Breakpoint for desktop

  if (isDesktop) {
    return (
      <XStack flex={1} padding="$4" backgroundColor="$background">
        {/* Left Card */}
        <Card
          width="50%"
          overflow="hidden"
          borderRadius="$4"
          backgroundColor="$background"
          elevation={10}
          margin="$4"
        >
          <Image
            source={require('../../assets/images/onboarding-hero.jpg')}
            style={styles.desktopImage}
            resizeMode="cover"
          />
        </Card>

        {/* Right Content */}
        <YStack width="50%" padding="$8" justifyContent="center" space="$6">
          <YStack alignItems="center" space="$4">
            <Image source={require('../../assets/images/react-logo.png')} style={styles.logo} />
            <Text color="$color" textAlign="center" fontSize={18}>
              A place for your people
            </Text>
          </YStack>

          <YStack space="$4" width="100%" maxWidth={400} alignSelf="center">
            <Button
              size="$5"
              theme="dark"
              icon={
                <Image
                  source={require('../../assets/images/react-logo.png')}
                  style={styles.buttonIcon}
                />
              }
              onPress={() => {}}
            >
              Sign in with Apple
            </Button>

            <Button size="$5" variant="outlined" onPress={() => {}}>
              Take a quick tour
            </Button>
          </YStack>
        </YStack>
      </XStack>
    );
  }

  // Mobile layout (unchanged)
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding-hero.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Content Container */}
      <YStack flex={1} padding="$4">
        {/* Centered Logo and Text */}
        <YStack flex={1} justifyContent="center" alignItems="center" space="$2">
          <Image source={require('../../assets/images/react-logo.png')} style={styles.logo} />
          <Text color="white" textAlign="center" fontSize={16}>
            A place for your people
          </Text>
        </YStack>

        {/* Action Buttons */}
        <YStack space="$2" marginBottom="$4">
          <Button
            size="$5"
            backgroundColor="rgba(0, 0, 0, 0.8)"
            color="white"
            icon={
              <Image
                source={require('../../assets/images/react-logo.png')}
                style={styles.buttonIcon}
              />
            }
            onPress={() => {}}
          >
            Sign in with Apple
          </Button>

          <Button
            size="$5"
            theme="dark"
            backgroundColor="rgba(255, 255, 255, 0.1)"
            borderColor="rgba(255, 255, 255, 0.2)"
            color="white"
            onPress={() => {}}
          >
            Take a quick tour
          </Button>
        </YStack>
      </YStack>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  desktopImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  logo: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: 'white',
  },
});
