import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'tamagui';

import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [user, loading]);

  if (loading) {
    return <View />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
