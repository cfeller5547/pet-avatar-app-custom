import { Stack } from 'expo-router';

export default function OnboardingStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',  
      }}
    >
    </Stack>
  );
}