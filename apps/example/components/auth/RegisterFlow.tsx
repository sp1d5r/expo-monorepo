// import { ChevronLeft } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text, YStack, XStack, Input } from 'tamagui';

type Step = {
  id: string;
  title: string;
  type: 'date' | 'text' | 'select' | 'multiselect';
  options?: string[];
  placeholder?: string;
};

const REGISTRATION_STEPS: Step[] = [
  {
    id: 'name',
    title: "What's your first name?",
    type: 'text',
    placeholder: 'Your name',
  },
  {
    id: 'age',
    title: "What's your age?",
    type: 'date',
  },
  {
    id: 'goal',
    title: 'What brings you to meditation?',
    type: 'select',
    options: [
      'Managing emotions',
      'Reaching goals',
      'Reducing stress',
      'Better sleep',
      'Something else',
    ],
  },
  {
    id: 'experience',
    title: "What's your meditation experience?",
    type: 'select',
    options: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    id: 'voice',
    title: 'Choose your preferred meditation voice',
    type: 'select',
    options: ['Male', 'Female', 'No preference'],
  },
];

export function RegisterFlow() {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

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
    setAnswers({
      ...answers,
      [REGISTRATION_STEPS[currentStep].id]: value,
    });
  };

  const step = REGISTRATION_STEPS[currentStep];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <YStack flex={1} bg="$background" pt={insets.top} pb="$4" px="$4">
        {/* Header */}
        <XStack width="100%" py="$4">
          {currentStep > 0 ? (
            <Button variant="outlined" onPress={handleBack}>
              Back
            </Button>
          ) : null}
        </XStack>

        {/* Progress Bar */}
        <XStack width="100%" height={2} style={{ backgroundColor: '#e5e5e5' }}>
          <YStack
            height="100%"
            width={`${((currentStep + 1) / REGISTRATION_STEPS.length) * 100}%`}
            style={{ backgroundColor: '#000' }}
          />
        </XStack>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <YStack flex={1} space="$6" pt="$8">
            <Text
              fontFamily="SpaceMono"
              fontSize={24}
              color="black"
              ta="center"
              letterSpacing={0.5}
            >
              {step.title}
            </Text>

            {/* Dynamic Input based on step type */}
            {step.type === 'text' && (
              <Input
                size="$6"
                borderWidth={0}
                bg="transparent"
                text="center"
                placeholder={step.placeholder}
                onChangeText={handleAnswer}
                value={answers[step.id] || ''}
              />
            )}

            {step.type === 'select' && (
              <YStack space="$2">
                {step.options?.map((option) => (
                  <Button
                    key={option}
                    size="$5"
                    bg={answers[step.id] === option ? 'black' : 'transparent'}
                    color={answers[step.id] === option ? 'white' : 'black'}
                    borderColor="black"
                    borderWidth={1}
                    onPress={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </YStack>
            )}
          </YStack>
        </ScrollView>

        {/* Continue Button */}
        <Button
          size="$5"
          bg="black"
          color="white"
          borderStartEndRadius="$4"
          o={answers[step.id] ? 1 : 0.5}
          disabled={!answers[step.id]}
          onPress={handleContinue}
        >
          {currentStep === REGISTRATION_STEPS.length - 1 ? 'COMPLETE' : 'CONTINUE'}
        </Button>
      </YStack>
    </KeyboardAvoidingView>
  );
}
