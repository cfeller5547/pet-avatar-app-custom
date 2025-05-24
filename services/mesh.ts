import { Asset } from 'expo-asset';

export async function startMeshJob() {
  return 'mock-id';
}
export async function pollMeshJob() {
  await new Promise(r => setTimeout(r, 10_000));
  const asset = Asset.fromModule(require('../assets/meshes/aleu.glb'));
  await asset.downloadAsync();           
  return { status: 'done', meshUrl: asset.localUri! };
}
