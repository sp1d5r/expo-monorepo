import { X, Search, Settings } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Button, Input, Text, YStack, XStack, ScrollView } from 'tamagui';

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
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSettings = () => {
    router.push('/');
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <YStack flex={1} bg="white">
      {/* Center Content */}
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        px="$4"
        space="$6"
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="100%"
        zIndex={1}
        bg="white"
      >
        {/* Title */}
        <Text fontFamily="$heading" fontSize={40} color="black" letterSpacing={-1}>
          Nadine
        </Text>

        {/* Search Section */}
        <XStack space="$2" width="100%" maxWidth={500}>
          <Input
            flex={1}
            size="$4"
            fontSize="$2"
            borderWidth={1}
            borderColor="black"
            fontFamily="SpaceMono"
            style={{
              borderRadius: '8px',
            }}
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
          <Button size="$4" bg="black" onPress={handleSearch} color="white" icon={Search} />
        </XStack>
      </YStack>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: '100%' }}
        px="$4"
      >
        <YStack space="$4" pb="$8">
          {meditationSessions.map((session, index) => (
            <YStack
              key={index}
              borderRadius={12}
              borderWidth={1}
              borderColor="black"
              p="$4"
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
      </ScrollView>

      {/* Settings Button - Floating */}
      <Button
        size="$3"
        circular
        position="absolute"
        right="$4"
        top="$8"
        zIndex={2}
        chromeless
        onPress={handleSettings}
        icon={Settings}
      />
    </YStack>
  );
}
