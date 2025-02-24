import { View } from 'tamagui';

import { OnboardingScreen } from '@/components/auth/OnboardingScreen';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <View />;
  }

  if (user?.uid) {
    // redirect to tabs
  }

  // Show onboarding for non-authenticated users
  return <OnboardingScreen />;
}
