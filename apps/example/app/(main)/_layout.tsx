import { router, Stack } from 'expo-router';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading && !user) {
      //   router.replace('/');
    }
  }, [user]);

  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
