import { usePetStore } from '@/store/pet';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import 'expo-three/build/ExpoTHREE';
import { StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function LivePetScreen() {
  const pet = usePetStore((s) => s.pet);

  if (!pet?.modelUri) {
    return (
      <View style={styles.center}>
        <Text style={styles.banner}>MAIN · Live Pet</Text>
        <Text>No 3-D model yet 🤔</Text>
      </View>
    );
  }

  const modelUri = pet.modelUri!;

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.banner}>MAIN · Live Pet</Text>

      <GLView
        style={{ flex: 1 }}
        onContextCreate={async (gl) => {
          const renderer = new Renderer({ gl });
          const { drawingBufferWidth: w, drawingBufferHeight: h } = gl;
          renderer.setSize(w, h);

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
          camera.position.set(0, 0.5, 1.5);

          const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
          scene.add(light);

          const loader = new GLTFLoader();
          const gltf = await loader.loadAsync(modelUri);
          scene.add(gltf.scene);

          const render = () => {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            gl.endFrameEXP();
          };
          render();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ff926b',
    marginTop: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});