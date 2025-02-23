import { useRouter } from 'expo-router';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Button, Card, H1, Text, XStack, YStack } from 'tamagui';

interface TourSlide {
  title: string;
  description: string;
  image: any;
}

const tourSlides: TourSlide[] = [
  {
    title: 'See where you overlap with friends',
    description: 'Connect with friends and see when your paths cross',
    image: require('../../assets/images/tour-overlap.png'),
  },
  {
    title: 'And when they are coming to town',
    description: 'Get notified when friends are visiting your city',
    image: require('../../assets/images/tour-notification.png'),
  },
  // Add more slides as needed
];

export default function TourScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const isDesktop = width >= 768;

  const handleBack = () => {
    try {
      router.back();
    } catch (e) {
      // If there's no history to go back to, go to root
      router.push('/');
    }
  };

  const handleSignIn = () => {
    router.push('/(auth)/login');
  };

  if (isDesktop) {
    const cardWidth = width * 0.5 - 32; // 50% of screen width minus padding
    return (
      <XStack flex={1} padding="$4" backgroundColor="$background">
        {/* Left Card with Carousel */}
        <Card
          width="50%"
          overflow="hidden"
          borderRadius="$4"
          backgroundColor="$background"
          elevation={10}
          margin="$4"
        >
          <Carousel
            loop
            autoPlay
            width={cardWidth}
            height={cardWidth} // Make it square
            data={tourSlides}
            scrollAnimationDuration={2000}
            autoPlayInterval={4000}
            renderItem={({ item }) => (
              <Image source={item.image} style={styles.desktopImage} resizeMode="cover" />
            )}
          />
        </Card>

        {/* Right Content with Carousel */}
        <YStack width="50%" padding="$8" justifyContent="center" space="$6">
          <Carousel
            loop
            autoPlay
            vertical={false}
            width={cardWidth}
            height={200}
            data={tourSlides}
            scrollAnimationDuration={2000}
            autoPlayInterval={4000}
            renderItem={({ item }) => (
              <YStack space="$4" padding="$4">
                <H1 color="$color" textAlign="center" fontSize={32}>
                  {item.title}
                </H1>
                <Text color="$color" textAlign="center" fontSize={18}>
                  {item.description}
                </Text>
              </YStack>
            )}
          />

          <YStack space="$4" width="100%" maxWidth={400} alignSelf="center">
            <Button size="$5" theme="dark" onPress={handleSignIn}>
              Continue with Sign In
            </Button>
            <Button size="$5" variant="outlined" onPress={handleBack}>
              Back
            </Button>
          </YStack>
        </YStack>
      </XStack>
    );
  }

  // Mobile layout
  return (
    <YStack flex={1} backgroundColor="$background">
      <Carousel
        loop={false}
        width={width}
        height={600}
        data={tourSlides}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <YStack flex={1} padding="$4" justifyContent="center" alignItems="center">
            <Image source={item.image} style={styles.slideImage} resizeMode="contain" />
            <H1 color="$color" textAlign="center" fontSize={32} marginTop="$4">
              {item.title}
            </H1>
            <Text color="$color" textAlign="center" fontSize={16} marginTop="$2">
              {item.description}
            </Text>
          </YStack>
        )}
      />

      <YStack padding="$4" space="$4">
        <Button size="$5" theme="dark" onPress={handleSignIn}>
          Continue with Sign In
        </Button>
        <Button size="$5" variant="outlined" onPress={handleBack}>
          Back
        </Button>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  slideImage: {
    width: '100%',
    height: 400,
  },
  desktopImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});
