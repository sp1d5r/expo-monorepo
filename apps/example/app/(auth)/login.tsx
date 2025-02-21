import { router } from 'expo-router';
import { Button, Input, YStack } from 'tamagui';

export default function Login() {
  const handleLogin = () => {
    // Handle login logic here
    // After successful login:
    router.replace('/(tabs)');
  };

  return (
    <YStack>
      <Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" />
      <Input placeholder="Password" secureTextEntry />
      <Button onPress={handleLogin}>Sign In</Button>

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
