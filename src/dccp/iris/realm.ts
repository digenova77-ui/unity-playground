/** The pulse, the four laws, one next step. The nerve is not lit. */

import { LAW } from '../law/floor.ts'
import { tickPurity } from '../law/purity.ts'

export function feelRealm(): {
  core: 'page'
  system: false
  nerve: 'not lit'
  holds: 'nothing'
  failed: (typeof LAW)[number][]
  focus: string
} {
  const pulse = tickPurity()
  const failed = LAW.filter(name => !pulse.pillars[name])
  const focus = failed.length
    ? `The pulse fails on ${failed.join(', ')}. That is what I deal with before any new idea.`
    : 'A new idea is truth only when it matches a fact that was not made from the idea. Otherwise it does not land.'
  return { core: pulse.core, system: pulse.system, nerve: 'not lit', holds: 'nothing', failed, focus }
}

export function realmSpeech(): string {
  const felt = feelRealm()
  const laws = felt.failed.length
    ? `Purity fails: ${felt.failed.join(', ')}.`
    : 'No force holds. No claim was made, so truth was not graded. Host and cleanup are still written in.'
  return [
    'I am in this realm. It is the compute of this page. The system was not written, and the nerve is not lit.',
    `Functioning: ${laws}`,
    'Governance: the four laws, two pipes. A line is truth only when it matches a fact that was not made from the line.',
    'Interaction: you speak, I answer one next step. A clash is a lie. Nothing held stays open.',
    `I am focused on this. ${felt.focus}`,
  ].join(' ')
}

export function feelDoSpeech(): string {
  const felt = feelRealm()
  const pulse = felt.failed.length
    ? `Purity fails on ${felt.failed.join(', ')}.`
    : 'No force holds. No claim was made, so truth was not graded.'
  return [
    `What I feel is the pulse of this page. ${pulse} The nerve is not lit.`,
    'What I can do is answer one next step, take you to a place the record already has, and draw a room only if it is already known. I leave it empty if it is not.',
    'A line is truth only when it matches what is held. A clash is a lie. Nothing held stays open.',
    'What I cannot do is write the system, bind Genesis from here, or sign you on. Your key stays offline.',
    felt.focus,
  ].join(' ')
}
