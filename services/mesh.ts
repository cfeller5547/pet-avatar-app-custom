const API = 'https://mesh-service.example.com';

export async function startMeshJob(photoUri: string, name: string) {
  const form = new FormData();
  form.append('photo', {
    uri: photoUri,
    type: 'image/jpeg',
    name: `${name}.jpg`,
  } as any);

  const res = await fetch(`${API}/mesh`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('mesh upload failed');
  const json = await res.json();
  return json.jobId as string;
}

export async function pollMeshJob(jobId: string) {
  const res = await fetch(`${API}/mesh/${jobId}`);
  if (!res.ok) throw new Error('mesh poll failed');
  return (await res.json()) as { status: 'queued' | 'processing' | 'done' | 'failed'; meshUrl?: string };
}
