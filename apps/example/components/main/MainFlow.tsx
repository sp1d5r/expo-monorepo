import { X, Search, Settings } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useWindowDimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Button, Input, Text, YStack, XStack, ScrollView, Sheet } from 'tamagui';

// Example meditation sessions data
const meditationSessions = [
  {
    title: 'Morning Calm',
    duration: '10 min',
    date: 'Today',
    type: 'Recommended',
  },
  {
    title: 'Deep Focus',
    duration: '15 min',
    date: 'Yesterday',
    type: 'Previous',
  },
  // Add more sessions as needed
];

export function MainFlow() {
  const { height } = useWindowDimensions();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [topMargin, setTopMargin] = useState(height / 2.5);
  const [bottomMargin, setBottomMargin] = useState(height / 2.5);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newTopMargin = Math.max(scrollY < 300 ? height / 2.5 : 350, height / 2.5 - scrollY);
    const newBottomMargin = Math.max(20, height / 2.5 - scrollY);

    setTopMargin(newTopMargin);
    setBottomMargin(newBottomMargin);
  };

  return (
    <YStack f={1} bg="white">
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <YStack
          style={{
            marginTop: topMargin,
            marginBottom: bottomMargin,
          }}
          jc="center"
          ai="center"
          px="$4"
          space="$6"
        >
          <Text fontFamily="$heading" fontSize={40} color="black" letterSpacing={-1}>
            Nadine
          </Text>

          <XStack width="100%" maxWidth={500} space="$2">
            <Input
              f={1}
              size="$4"
              fontSize="$2"
              borderWidth={1}
              borderColor="black"
              fontFamily="$body"
              br="$4"
              bg="transparent"
              placeholder="What's on your mind today?"
              value={searchQuery}
              onChangeText={setSearchQuery}
              pl="$4"
              focusStyle={{
                borderColor: 'black',
                borderWidth: 1,
              }}
            />
            <Button size="$4" bg="black" onPress={() => {}} color="white" icon={Search} />
          </XStack>

          <Text fontSize={16} opacity={0.5} fontFamily="$body">
            Scroll for more meditations
          </Text>
        </YStack>

        <YStack px="$4" pb="$20" space="$6">
          <YStack space="$4">
            <Text fontSize={24} fontFamily="$heading">
              Previous Sessions
            </Text>
            {meditationSessions.map((session, index) => (
              <YStack key={index} br="$4" borderWidth={1} borderColor="black" p="$4" space="$2">
                <Text fontFamily="$heading" fontSize={20} color="black">
                  {session.title}
                </Text>
                <XStack gap="$2">
                  <Text fontSize={14} opacity={0.7}>
                    {session.duration}
                  </Text>
                  <Text fontSize={14} opacity={0.7}>
                    •
                  </Text>
                  <Text fontSize={14} opacity={0.7}>
                    {session.date}
                  </Text>
                </XStack>
                <Text fontSize={14} color="black" opacity={0.5}>
                  {session.type}
                </Text>
              </YStack>
            ))}
          </YStack>

          <YStack space="$4">
            <Text fontSize={24} fontFamily="$heading">
              Featured Meditation
            </Text>
            <YStack br="$4" borderWidth={1} borderColor="black" p="$4" height={200} bg="#f5f5f5" />
          </YStack>
        </YStack>
      </ScrollView>

      <Button
        size="$3"
        circular
        position="absolute"
        left="$4"
        bottom="$4"
        zIndex={2}
        chromeless
        onPress={() => setSettingsOpen(true)}
        icon={Settings}
      />

      <Sheet
        modal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        snapPoints={[50]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame p="$4">
          <Sheet.Handle />
          <Text fontSize={24} fontFamily="$heading">
            Settings
          </Text>
          <YStack space="$4" mt="$4">
            <Button size="$4" bordered>
              Account Settings
            </Button>
            <Button size="$4" bordered>
              Notification Preferences
            </Button>
            <Button size="$4" bordered>
              App Theme
            </Button>
            <Button size="$4" theme="red" onPress={() => router.push('/')}>
              Sign Out
            </Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
}
