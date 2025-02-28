import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text, YStack, XStack, Input, Stack } from 'tamagui';

type Option = {
  id: string;
  label: string;
  image?: any;
  invertedImage?: any;
};

type Step = {
  id: string;
  title: string;
  type: 'date' | 'text' | 'select' | 'multiselect';
  options?: Option[];
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  columns?: 1 | 2;
};

const REGISTRATION_STEPS: Step[] = [
  {
    id: 'name',
    title: "What's your first name?",
    type: 'text',
    placeholder: 'Your name',
  },
  {
    id: 'birthdate',
    title: "What's your birth date?",
    type: 'date',
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(),
  },
  {
    id: 'goal',
    title: 'What brings you to meditation?',
    type: 'multiselect',
    columns: 2,
    options: [
      {
        id: 'emotions',
        label: 'handle emotions',
        image: require('../../assets/images/onboarding/ManageEmotions.png'),
        invertedImage: require('../../assets/images/onboarding/ManageEmotionsInvert.png'),
      },
      {
        id: 'goals',
        label: 'Reaching goals',
        image: require('../../assets/images/onboarding/AchievingGoals.png'),
        invertedImage: require('../../assets/images/onboarding/AchievingGoalsInvert.png'),
      },
      {
        id: 'stress',
        label: 'Reducing stress',
        image: require('../../assets/images/onboarding/ReducingStress.png'),
        invertedImage: require('../../assets/images/onboarding/ReducingStressInvert.png'),
      },
      {
        id: 'sleep',
        label: 'Better sleep',
        image: require('../../assets/images/onboarding/ImproveSleep.png'),
        invertedImage: require('../../assets/images/onboarding/ImproveSleepInvert.png'),
      },
    ],
  },
  {
    id: 'experience',
    title: "What's your meditation experience?",
    type: 'select',
    columns: 1,
    options: [
      { id: 'beginner', label: 'Beginner' },
      { id: 'intermediate', label: 'Intermediate' },
      { id: 'advanced', label: 'Advanced' },
    ],
  },
  {
    id: 'voice',
    title: 'Choose your preferred meditation voice',
    type: 'select',
    columns: 2,
    options: [
      { id: 'male', label: 'Male' },
      { id: 'female', label: 'Female' },
    ],
  },
];

// Add this helper function to calculate button size based on screen width
const PADDING = 16; // $4 in pixels
const GAP = 16; // $4 in pixels
const getButtonSize = (columns: number = 2) => {
  const screenWidth = Dimensions.get('window').width;
  const availableWidth = screenWidth - PADDING * 2; // Subtract horizontal padding
  const width = (availableWidth - (columns - 1) * GAP) / columns;
  return width;
};

export function RegisterFlow() {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    if (currentStep < REGISTRATION_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle registration completion
      console.log('Registration answers:', answers);
    }
  };

  const handleAnswer = (value: any) => {
    if (step.type === 'multiselect') {
      const currentAnswers = (answers[step.id] || []) as string[];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter((item) => item !== value)
        : [...currentAnswers, value];

      setAnswers({
        ...answers,
        [step.id]: newAnswers,
      });
    } else {
      setAnswers({
        ...answers,
        [step.id]: value,
      });
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      handleAnswer(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const step = REGISTRATION_STEPS[currentStep];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <YStack flex={1} bg="$background" pt={insets.top} pb="$8" px="$4">
        {/* Header with Progress Bar */}
        <XStack
          width="100%"
          py="$4"
          style={{ alignItems: 'center' }}
          space={currentStep > 0 ? '$4' : undefined}
        >
          {currentStep > 0 ? (
            <Button variant="outlined" onPress={handleBack} size="$3">
              <Text>Back</Text>
            </Button>
          ) : (
            <YStack width={0} />
          )}

          <XStack flex={1} height={2} style={{ backgroundColor: '#e5e5e5' }}>
            <YStack
              height="100%"
              width={`${((currentStep + 1) / REGISTRATION_STEPS.length) * 100}%`}
              style={{ backgroundColor: '#000' }}
            />
          </XStack>
        </XStack>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={{
            paddingVertical: 10,
          }}
        >
          <YStack flex={1} space="$6" pt="$8">
            <Text fontSize={24} color="black" letterSpacing={0.5}>
              {step.title}
            </Text>

            {/* Dynamic Input based on step type */}
            {step.type === 'text' && (
              <Input
                size="$8"
                borderWidth={0}
                bg="transparent"
                fontFamily={'$heading'}
                text="center"
                placeholder={step.placeholder}
                onChangeText={handleAnswer}
                value={answers[step.id] || ''}
              />
            )}

            {step.type === 'date' && (
              <YStack space="$4">
                <Button
                  size="$5"
                  fontFamily={'$heading'}
                  bg="transparent"
                  borderColor="black"
                  borderWidth={1}
                  onPress={() => setShowDatePicker(true)}
                >
                  {answers[step.id] ? formatDate(answers[step.id]) : 'Select date'}
                </Button>

                {showDatePicker && (
                  <DateTimePicker
                    value={answers[step.id] || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={step.minDate}
                    maximumDate={step.maxDate}
                  />
                )}
              </YStack>
            )}

            {(step.type === 'select' || step.type === 'multiselect') && (
              <YStack space="$4">
                {chunk(step.options || [], step.columns || 2).map((row, rowIndex) => (
                  <XStack key={rowIndex} gap="$2">
                    {row.map((option) => {
                      const buttonSize = getButtonSize(step.columns);
                      const isSelected =
                        step.type === 'multiselect'
                          ? (answers[step.id] || []).includes(option.id)
                          : answers[step.id] === option.id;

                      return (
                        <Stack
                          key={option.id}
                          flex={1}
                          paddingEnd={step.type === 'multiselect' ? '$1' : '0'}
                        >
                          <Button
                            size="$5"
                            height={step.type === 'multiselect' ? buttonSize : 70}
                            width={step.type === 'multiselect' ? buttonSize : '100%'}
                            bg={isSelected ? 'black' : 'transparent'}
                            color={isSelected ? 'white' : 'black'}
                            borderColor="black"
                            borderWidth={1}
                            onPress={() => handleAnswer(option.id)}
                          >
                            <YStack
                              flex={1}
                              space={step.type === 'multiselect' ? '$3' : '$2'}
                              style={{
                                display: 'flex',
                                alignItems: step.type === 'multiselect' ? 'center' : 'flex-start',
                                justifyContent: 'center',
                                paddingHorizontal: step.type === 'multiselect' ? 0 : 16,
                              }}
                            >
                              {step.type === 'multiselect' &&
                                option.image &&
                                option.invertedImage && (
                                  <Image
                                    source={isSelected ? option.invertedImage : option.image}
                                    style={{
                                      width: buttonSize * 0.5,
                                      height: buttonSize * 0.5,
                                    }}
                                  />
                                )}
                              <Text
                                numberOfLines={step.type === 'multiselect' ? 2 : 1}
                                color={isSelected ? 'white' : 'black'}
                                fontSize="$3"
                                textAlign={step.type === 'multiselect' ? 'center' : 'left'}
                              >
                                {option.label}
                              </Text>
                            </YStack>
                          </Button>
                        </Stack>
                      );
                    })}
                    {row.length === 1 && step.columns === 2 && step.type === 'multiselect' && (
                      <Stack flex={1} />
                    )}
                  </XStack>
                ))}
              </YStack>
            )}
          </YStack>
        </ScrollView>

        {/* Continue Button */}
        <Button
          size="$4"
          fontSize="$2"
          bg="black"
          color="white"
          borderStartEndRadius="$4"
          opacity={
            step.type === 'multiselect'
              ? (answers[step.id]?.length || 0) > 0
                ? 1
                : 0.5
              : answers[step.id]
                ? 1
                : 0.5
          }
          disabled={
            step.type === 'multiselect' ? (answers[step.id]?.length || 0) === 0 : !answers[step.id]
          }
          onPress={handleContinue}
        >
          {currentStep === REGISTRATION_STEPS.length - 1 ? 'COMPLETE' : 'CONTINUE'}
        </Button>
      </YStack>
    </KeyboardAvoidingView>
  );
}

function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}
