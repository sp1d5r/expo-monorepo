import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.messageRow}>
          <Text style={styles.text}>Welcome to the app!</Text>
          <Text style={styles.text}>👋</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Step 1: Try it</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            Edit <Text style={styles.boldText}>app/(tabs)/index.tsx</Text> to see changes. Press{' '}
            <Text style={styles.boldText}>
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                web: 'F12',
              })}
            </Text>{' '}
            to open developer tools.
          </Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Step 2: Explore</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            Tap the Explore tab to learn more about what's included in this starter app.
          </Text>
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
  header: {
    height: 200,
    backgroundColor: '#A1CEDC',
    position: 'relative',
  },
  content: {
    padding: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  messageRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
    gap: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: '600',
  },
});
