
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
    let pollId: NodeJS.Timeout;
    (async () => {
      try {
        const jobId = await startMeshJob(pet.photoUri, pet.name);
        pollId = setInterval(async () => {
          const res = await pollMeshJob(jobId);
          if (res.status === 'done') {
            clearInterval(pollId);
            const localPath = FileSystem.documentDirectory + `${pet.name}.glb`;
            await FileSystem.downloadAsync(res.meshUrl!, localPath); 
            setPet({ ...pet, modelUri: localPath });
            router.replace(routes.AVATAR);
          } else if (res.status === 'failed') {
            clearInterval(pollId);
            setFailed(true);
          }
        }, 3000);
      } catch {
        setFailed(true);
      }
    })();

    return () => pollId && clearInterval(pollId);
  }, []);

  if (failed) {
    return (
      <View style={styles.center}>
        <Text>Couldn’t build 3-D model.</Text>
        <Button
          title="Try again"
          onPress={() => router.replace(routes.PROFILE)}
        />
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
