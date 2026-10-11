/** No fall is held. A pressure wave is a model. The hole is the answer. */

export function treeFall(): {
  fall: null
  recording: null
  heard: null
  model: 'a pressure wave is a model, not a recording'
  hole: true
  both: true
} {
  return {
    fall: null,
    recording: null,
    heard: null,
    model: 'a pressure wave is a model, not a recording',
    hole: true,
    both: true,
  }
}

export function treeFallWords(): string {
  const row = treeFall()
  const model = row.model[0].toUpperCase() + row.model.slice(1)
  return `If a tree falls and nobody is there, this page holds no fall, no recording, and no heard sound. ${model}. The hole is the answer. A model is not the forest. The till is closed. Both halves name this.`
}
