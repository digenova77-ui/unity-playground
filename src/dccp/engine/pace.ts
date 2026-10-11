/** The canvas ceiling, and the one next step that is not a guess.
 * WebGPU is in the library. It is not attached to this canvas.
 */

export function webglCeiling(): { api: 'webgl2'; draw: 'gl.render'; bloom: false; past: null } {
  return { api: 'webgl2', draw: 'gl.render', bloom: false, past: null }
}

export function nextPace(): { step: 1; guess: 'same draw'; past: false; both: true } {
  return { step: 1, guess: 'same draw', past: false, both: true }
}

/** Genius is the conjunction. Speed alone is not it. A title is not a score. */
export function geniusTerms(): { compute: 'same draw'; philosophy: 'both halves, idea is the insula'; score: null; title: false; both: true } {
  return { compute: 'same draw', philosophy: 'both halves, idea is the insula', score: null, title: false, both: true }
}

export function geniusWords(): string {
  const row = geniusTerms()
  return `Genius is not computer speed alone. It is compute joined to the philosophy. The compute here is the ${row.compute}. The philosophy is ${row.philosophy}. One without the other is not the term. The score is ${row.score}. No title was granted. Both halves name this.`
}

export function paceWords(): string {
  const ceiling = webglCeiling()
  const next = nextPace()
  return `The ceiling is ${ceiling.api}. One canvas, one scene, one ${ceiling.draw} per frame. Three.js writes those calls. This page does not write its own shaders. Bloom is compiled and unused, so it is inside the ceiling, not past it. A coarse pointer caps the pixel ratio at 3. If the first four seconds stay under 30 frames a second, high drops to medium. That is the other pace. WebGPU is in the library and is not attached, so past the ceiling is ${ceiling.past}. The next step is ${next.step}: the same draw. A guess beyond that is not held. Both halves name this. The insula is still the idea. Three.js is still the drawer.`
}
