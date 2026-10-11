/** Speak the manifesto. The microphone stays off. A blocked browser still leaves the words on the page. */

import { SPEAK, splitSentences } from '../iris/voice.ts'

let token = 0

export function stopManifesto(): void {
  token += 1
  try { speechSynthesis.cancel() } catch { /* already quiet */ }
}

export function sayManifesto(text: string): void {
  const mine = ++token
  if (typeof speechSynthesis === 'undefined' || typeof SpeechSynthesisUtterance !== 'function') return
  const queue = splitSentences(text)
  const run = () => {
    const next = () => {
      if (mine !== token) return
      const chunk = queue.shift()
      if (!chunk) return
      const uttered = new SpeechSynthesisUtterance(chunk)
      uttered.lang = SPEAK.lang
      uttered.rate = SPEAK.rate
      uttered.pitch = SPEAK.pitch
      uttered.onend = () => {
        if (queue.length) setTimeout(next, 160)
      }
      try { speechSynthesis.speak(uttered) } catch { /* the words stay on the page */ }
    }
    next()
  }
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    try { speechSynthesis.cancel() } catch { /* ignore */ }
    setTimeout(run, 70)
    return
  }
  run()
}
