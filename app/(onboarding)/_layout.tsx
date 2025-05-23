import { Stack } from 'expo-router';

export default function OnboardingStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',   // slide-up iOS feel; remove if you prefer push
      }}
    >
      {/* expo-router auto-injects profile/processing routes */}
    </Stack>
  );
}