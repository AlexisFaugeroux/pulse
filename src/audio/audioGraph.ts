import { getAudioContext } from './audioContext';
import { connectAudioNodes } from './connectAudioNodes';
import { createAudioNodes } from './createAudioNodes';
import type { AudioGraph, AudioNodes } from './types';

let graph: AudioGraph | null = null;

export async function initAudioGraph(): Promise<AudioGraph> {
  const ctx = getAudioContext();

  graph = { ctx, nodes: {...createAudioNodes(ctx)} };

  await connectAudioNodes(graph.nodes);

  return graph;
}

export function getAudioGraph(): AudioGraph | undefined {
  if (!graph) {
    console.error(
      'Audio context is not initialized. Refresh the page and authorize audio',
    );
    return;
  }

  return graph;
}

export function getAudioNode<T extends keyof AudioNodes>(
  nodeKey: T,
): AudioNodes[T] | undefined {
  return getAudioGraph()?.nodes[nodeKey];
}
