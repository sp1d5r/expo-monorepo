import { useRouter } from 'expo-router';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Button, H1, Text, YStack } from 'tamagui';

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

  return (
    <YStack f={1} bg="$background">
      <Carousel
        loop={false}
        width={width}
        height={600}
        data={tourSlides}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <YStack f={1} p="$4" jc="center" ai="center">
            <Image source={item.image} style={styles.slideImage} resizeMode="contain" />
            <H1 c="$color" ta="center" fos={32} mt="$4">
              {item.title}
            </H1>
            <Text c="$color" ta="center" fos={16} mt="$2">
              {item.description}
            </Text>
          </YStack>
        )}
      />

      <YStack p="$4" space="$4">
        <Button size="$5" theme="dark" onPress={() => router.push('/(auth)/login')}>
          Continue with Sign In
        </Button>
        <Button size="$5" variant="outlined" onPress={() => router.back()}>
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
});
