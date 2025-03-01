import { router, Stack } from 'expo-router';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.email) {
      router.replace('/(main)/home');
    }
  }, [user]);

  return (
    <Stack>
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
