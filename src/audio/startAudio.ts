import { initAudioGraph } from "./audioGraph";

export async function startAudio(): Promise<void> {
  const graph = await initAudioGraph();
  if (graph.ctx.state !== 'running') {
    await graph.ctx.resume();
  }
}
