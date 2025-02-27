import { StyleSheet, View, Text, ScrollView, Image, Platform } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Explore</Text>
        </View>

        <Text style={styles.text}>This app includes example code to help you get started.</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>File-based routing</Text>
          <Text style={styles.text}>
            This app has two screens: app/(tabs)/index.tsx and app/(tabs)/explore.tsx
          </Text>
          <Text style={styles.text}>
            The layout file in app/(tabs)/_layout.tsx sets up the tab navigator.
          </Text>
          <Text style={styles.link}>Learn more</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Android, iOS, and web support</Text>
          <Text style={styles.text}>
            You can open this project on Android, iOS, and the web. To open the web version, press
            'w' in the terminal running this project.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Images</Text>
          <Text style={styles.text}>
            For static images, you can use the @2x and @3x suffixes to provide files for different
            screen densities
          </Text>
          <Image source={require('@/assets/images/react-logo.png')} style={styles.image} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom fonts</Text>
          <Text style={styles.text}>Open app/_layout.tsx to see how to load custom fonts.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Light and dark mode components</Text>
          <Text style={styles.text}>
            This template has light and dark mode support. The useColorScheme() hook lets you
            inspect what the user's current color scheme is, and so you can adjust UI colors
            accordingly.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Animations</Text>
          <Text style={styles.text}>
            This template includes an example of an animated component. The components/HelloWave.tsx
            component uses the powerful react-native-reanimated library to create a waving hand
            animation.
          </Text>
          {Platform.select({
            ios: (
              <Text style={styles.text}>
                The components/ParallaxScrollView.tsx component provides a parallax effect for the
                header image.
              </Text>
            ),
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  link: {
    color: '#2e78b7',
    fontSize: 16,
    marginTop: 8,
  },
  image: {
    alignSelf: 'center',
    marginVertical: 16,
  },
});
