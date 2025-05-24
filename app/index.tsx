import { usePetStore } from '@/store/pet';
import { Redirect } from 'expo-router';

export default function Index() {
  const pet = usePetStore((s) => s.pet);
  return pet?.modelUri
    ? <Redirect href="/(main)/pet" />
    : <Redirect href="/(onboarding)/profile" />;
}
