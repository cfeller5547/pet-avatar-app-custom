import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Species = 'dog' | 'cat';

export interface PetProfile {
  name: string;
  species: Species;
  photoUri: string;   
  modelUri?: string; 
}

interface PetState {
  pet?: PetProfile;
  setPet: (p: PetProfile) => void;
  clearPet: () => void;
}

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      pet: undefined,
      setPet: (pet) => set({ pet }),
      clearPet: () => set({ pet: undefined }),
    }),
    {
      name: 'pet-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);