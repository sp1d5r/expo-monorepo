import { useRouter } from 'expo-router';
import { Image, ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';
import { Button, Card, Text, XStack, YStack } from 'tamagui';

export function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768; // Breakpoint for desktop
  const router = useRouter();

  const handleTourPress = () => {
    router.push('/(auth)/tour');
  };

  const handleSignIn = () => {
    router.push('/(auth)/login');
  };

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
              onPress={handleSignIn}
            >
              Sign in with Apple
            </Button>

            <Button size="$5" variant="outlined" onPress={handleTourPress}>
              Take a quick tour
            </Button>
          </YStack>
        </YStack>
      </XStack>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding-hero.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <YStack flex={1} padding="$4" backgroundColor="rgba(0, 0, 0, 0.4)">
        {/* Main Content Container */}
        <YStack flex={1} justifyContent="center" alignItems="center" minHeight="100%">
          <Image source={require('../../assets/images/react-logo.png')} style={styles.mobileLogo} />
          <Text color="white" fontSize={20} fontWeight="400" marginTop="$2">
            A place for your people
          </Text>
        </YStack>

        {/* Buttons Container */}
        <YStack position="absolute" bottom={0} left={0} right={0} padding="$4" space="$3">
          <Button
            size="$5"
            backgroundColor="black"
            opacity={0.9}
            borderRadius="$10"
            icon={
              <Image
                source={require('../../assets/images/react-logo.png')}
                style={[styles.buttonIcon, { marginRight: 8 }]}
              />
            }
            onPress={handleSignIn}
          >
            Sign in with Apple
          </Button>

          <Button
            size="$5"
            backgroundColor="transparent"
            borderWidth={1}
            borderColor="rgba(255, 255, 255, 0.3)"
            borderRadius="$10"
            color="white"
            onPress={handleTourPress}
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
    height: '100%', // Added to ensure full height
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
  mobileLogo: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});
