import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Input, YStack } from 'tamagui';

import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login failed:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Google login failed:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <YStack space="$4" padding="$4">
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <Button onPress={handleLogin} theme="dark" size="$5">
        Sign In
      </Button>

      <Button onPress={handleGoogleLogin} size="$5">
        Sign in with Google
      </Button>

      <Button
        variant="outlined"
        onPress={() =>
          router.push({
            pathname: '/(auth)/register',
          })
        }
      >
        Create Account
      </Button>
    </YStack>
  );
}
