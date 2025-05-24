
import { usePetStore } from '@/store/pet';
import { GLView } from 'expo-gl';
import React from 'react';
import { Text, View } from 'react-native';


export default function LivePetScreen() {
  const pet = usePetStore((s) => s.pet);

  if (!pet?.modelUri) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No 3-D model yet 🤔</Text>
      </View>
    );
  }

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={async (gl) => {
        // TODO: load pet.modelUri into a three.js scene
        console.log('GLView ready, load', pet.modelUri);
      }}
    />
  );
}
