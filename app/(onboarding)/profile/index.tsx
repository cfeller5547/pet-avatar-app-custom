
import { routes } from '@/navigation/routes';
import { Species, usePetStore } from '@/store/pet';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreatePetProfileScreen() {
  const setPet = usePetStore((s) => s.setPet);

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const [name, setName]         = useState('');
  const [species, setSpecies]   = useState<Species>('dog');
  const [photoUri, setPhotoUri] = useState<string>();

  async function capture() {
    const { status } = permission || (await requestPermission());
    if (status !== 'granted') {
      Alert.alert('Camera permission is required to take a photo.');
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!res.canceled) setPhotoUri(res.assets[0].uri);
  }

  function continueNext() {
    if (!name || !photoUri) return;
    setPet({ name, species, photoUri });
    router.push(routes.PROCESSING);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Pet Profile</Text>

      <TextInput
        placeholder="Pet's name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <View style={styles.toggleRow}>
        {(['dog', 'cat'] as Species[]).map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setSpecies(s)}
            style={[
              styles.chip,
              species === s && styles.chipActive,
            ]}
          >
            <Text style={{ color: species === s ? '#fff' : '#555' }}>
              {s.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.photoBox} onPress={capture}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <Text>Tap to take photo</Text>
        )}
      </TouchableOpacity>

      <Button title="Continue" disabled={!name || !photoUri} onPress={continueNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: '600' },
  input: { borderBottomWidth: 1, paddingVertical: 6 },
  toggleRow: { flexDirection: 'row', gap: 12 },
  chip: { paddingVertical: 6, paddingHorizontal: 16, borderWidth: 1, borderRadius: 16 },
  chipActive: { backgroundColor: '#ff926b', borderColor: '#ff926b' },
  photoBox: {
    alignSelf: 'center',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: { width: 180, height: 180, borderRadius: 90 },
});
