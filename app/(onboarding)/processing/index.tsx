import { routes } from '@/navigation/routes';
import { pollMeshJob, startMeshJob } from '@/services/mesh';
import { usePetStore } from '@/store/pet';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

export default function ProcessingScreen() {
  const pet   = usePetStore((s) => s.pet)!;
  const setPet = usePetStore((s) => s.setPet);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await startMeshJob();                   
        const res = await pollMeshJob('mock');   // waits 10 s then 'done'

        if (res.status === 'done') {
          const localPath = FileSystem.documentDirectory + `${pet.name}.glb`;
          await FileSystem.copyAsync({ from: res.meshUrl, to: localPath });

          setPet({ ...pet, modelUri: localPath });
          router.replace(routes.AVATAR);
        } else {                                
          setFailed(true);
        }
      } catch {
        setFailed(true);
      }
    })();
  }, []);

  if (failed) {
    return (
      <View style={styles.center}>
        <Text>Couldn’t build 3-D model.</Text>
        <Button title="Try again" onPress={() => router.replace(routes.PROFILE)} />
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 12 }}>Building your 3-D avatar…</Text>
    </View>
  );
}

const styles = {
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' } as const,
};
