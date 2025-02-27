import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tour" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
