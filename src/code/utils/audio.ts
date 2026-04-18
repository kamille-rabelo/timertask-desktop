const audioBufferCache = new Map<string, AudioBuffer>();

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export async function playSound(path: string): Promise<void> {
  const context = getAudioContext();

  if (context.state === "suspended") {
    await context.resume();
  }

  let buffer = audioBufferCache.get(path);

  if (!buffer) {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    buffer = await context.decodeAudioData(arrayBuffer);
    audioBufferCache.set(path, buffer);
  }

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}
