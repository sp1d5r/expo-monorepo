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
    const newTopMargin = Math.max(scrollY < 400 ? height / 2.5 : 400, height / 2.5 - scrollY);
    const newBottomMargin = Math.max(20, height / 2.5 - scrollY);

    setTopMargin(newTopMargin);
    setBottomMargin(newBottomMargin);
  };

  return (
    <ScrollView
      flex={1}
      bg="white"
      bounces={false}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {/* First Screen - Takes full height */}
      <YStack
        style={{
          marginTop: topMargin,
          marginBottom: bottomMargin,
        }}
        justifyContent="center"
        alignItems="center"
        px="$4"
        space="$6"
      >
        <Text fontFamily="$heading" fontSize={40} color="black" letterSpacing={-1}>
          Nadine
        </Text>

        <XStack w="100%" maxWidth={500} space="$2">
          <Input
            flex={1}
            size="$4"
            fontSize="$2"
            borderWidth={1}
            borderColor="black"
            fontFamily="$body"
            borderRadius="$4"
            bg="transparent"
            placeholder="What's on your mind today?"
            value={searchQuery}
            onChangeText={setSearchQuery}
            paddingLeft="$4"
            focusStyle={{
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
          <Button size="$4" bg="black" onPress={() => {}} color="white" icon={Search} />
        </XStack>

        <Text fontSize={16} opacity={0.5} fontFamily="$mono">
          Scroll for more meditations
        </Text>
      </YStack>

      {/* Meditation Content */}
      <YStack px="$4" pb="$20" space="$6">
        <YStack space="$4">
          <Text fontSize={24} fontFamily="$heading">
            Previous Sessions
          </Text>
          {meditationSessions.map((session, index) => (
            <YStack
              key={index}
              borderRadius="$4"
              borderWidth={1}
              borderColor="black"
              padding="$4"
              space="$2"
            >
              <Text fontFamily="$heading" fontSize={20} color="black">
                {session.title}
              </Text>
              <XStack space="$2">
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
          <YStack
            borderRadius="$4"
            borderWidth={1}
            borderColor="black"
            padding="$4"
            height={200}
            bg="#f5f5f5"
          />
        </YStack>
      </YStack>

      {/* Settings Button */}
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

      {/* Settings Sheet */}
      <Sheet
        modal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        snapPoints={[50]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          <Text fontSize={24} fontFamily="$heading">
            Settings
          </Text>
          <YStack space="$4" marginTop="$4">
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
    </ScrollView>
  );
}
