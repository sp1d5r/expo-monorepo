import { HomeMessage, HomeMessageIcon } from '@acme/feature-home';
import { Image, StyleSheet, Platform } from 'react-native';
import { Button, YStack, XStack } from 'tamagui';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <XStack gap="$2">
        <ThemedText>
          <HomeMessage />
        </ThemedText>
        <ThemedText>
          <HomeMessageIcon />
        </ThemedText>
      </XStack>

      <YStack gap="$4" mt="$4">
        <YStack gap="$2">
          <Button>
            <Button.Text>Step 1: Try it</Button.Text>
          </Button>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see
            changes. Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                web: 'F12',
              })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </YStack>

        <YStack gap="$2">
          <Button>
            <Button.Text>Step 2: Explore</Button.Text>
          </Button>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this starter app.
          </ThemedText>
        </YStack>
      </YStack>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
