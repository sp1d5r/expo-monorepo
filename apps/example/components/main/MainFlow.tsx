import { X, Search, Settings } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Button, Input, Text, YStack, XStack, ScrollView } from 'tamagui';

const commonSuggestions = [
  'Anxiety & Stress',
  'Better Sleep',
  'Self-Love',
  'Focus & Productivity',
  'Emotional Balance',
  'Inner Peace',
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
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch();
  };

  return (
    <YStack flex={1} bg="white" px="$4" pt="$8" space="$8">
      {/* Header with Title */}
      <XStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text fontFamily="$heading" fontSize={40} color="black" letterSpacing={-1}>
          Meditate
        </Text>
        <Button size="$3" circular chromeless onPress={handleSettings} icon={Settings} />
      </XStack>

      {/* Search Section */}
      <YStack space="$6" style={{ maxWidth: isDesktop ? 600 : '100%' }}>
        <Text fontFamily="$mono" fontSize={16} color="black" opacity={0.7} letterSpacing={1}>
          WHAT'S ON YOUR MIND TODAY?
        </Text>
        <XStack space="$2">
          <Input
            flex={1}
            size="$4"
            borderWidth={1}
            borderColor="black"
            style={{
              borderRadius: 4,
            }}
            bg="transparent"
            placeholder="Type your concerns..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            pl="$4"
            focusStyle={{
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
          <Button size="$4" bg="black" onPress={handleSearch} color={'white'} icon={Search} />
        </XStack>
      </YStack>

      {/* Common Suggestions */}
      <YStack flex={1} space="$4">
        <Text fontFamily="$mono" fontSize={16} color="black" opacity={0.7} letterSpacing={1}>
          COMMON TOPICS
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack space="$3">
            {commonSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                size="$4"
                bg="transparent"
                borderWidth={1}
                borderColor="black"
                onPress={() => handleSuggestionPress(suggestion)}
                pressStyle={{
                  bg: 'black',
                }}
              >
                <Text fontFamily="$mono" fontSize={16} color="inherit">
                  {suggestion}
                </Text>
              </Button>
            ))}
          </YStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
}
