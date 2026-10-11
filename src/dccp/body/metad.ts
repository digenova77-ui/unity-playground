/** Meta-d' from signal, response, and a high or low confidence.
 * No ratings are held, so the live value is empty.
 * Fewer than 20 trials is refused.
 */

export interface ConfidenceTrial {
  signal: boolean
  saidYes: boolean
  high: boolean
}

const plow = 0.02425

function normsinv(p: number): number {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239]
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572]
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783]
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416]
  const phigh = 1 - plow
  if (p < plow) {
    const q = Math.sqrt(-2 * Math.log(p))
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  }
  if (p > phigh) {
    const q = Math.sqrt(-2 * Math.log(1 - p))
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  }
  const q = p - 0.5
  const r = q * q
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
}

function erf(x: number): number {
  const s = Math.sign(x)
  const t = 1 / (1 + 0.3275911 * Math.abs(x))
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t) * Math.exp(-x * x)
  return s * y
}

function phi(x: number): number {
  return 0.5 * (1 + erf(x / Math.SQRT2))
}

function masses(mean: number, sd: number, cNeg: number, c: number, cPos: number): [number, number, number, number] {
  const left = (z: number) => phi((z - mean) / sd)
  const a = left(cNeg)
  const b = left(c)
  const d = left(cPos)
  return [a, Math.max(0, b - a), Math.max(0, d - b), Math.max(0, 1 - d)]
}

function type1(trials: readonly ConfidenceTrial[]): number | null {
  let signal = 0
  let noise = 0
  let hits = 0
  let alarms = 0
  for (const trial of trials) {
    if (trial.signal) {
      signal += 1
      if (trial.saidYes) hits += 1
    } else {
      noise += 1
      if (trial.saidYes) alarms += 1
    }
  }
  if (signal === 0 || noise === 0) return null
  const hitRate = (hits + 0.5) / (signal + 1)
  const alarmRate = (alarms + 0.5) / (noise + 1)
  return normsinv(hitRate) - normsinv(alarmRate)
}

function fit(trials: readonly ConfidenceTrial[], noiseSd = 1, signalSd = 1): number | null {
  const count = (signal: boolean) => {
    const cells = [0, 0, 0, 0]
    for (const trial of trials) {
      if (trial.signal !== signal) continue
      const index = trial.saidYes ? (trial.high ? 3 : 2) : trial.high ? 0 : 1
      cells[index] += 1
    }
    return cells
  }
  const noise = count(false)
  const signal = count(true)
  let best = -Infinity
  let meta: number | null = null
  for (let m = 0; m <= 3.01; m += 0.1) {
    const meanNoise = -m / 2
    const meanSignal = m / 2
    for (let c = -1.5; c <= 1.51; c += 0.25) {
      for (const gapNeg of [0.25, 0.5, 1, 1.5]) {
        for (const gapPos of [0.25, 0.5, 1, 1.5]) {
          const noiseMass = masses(meanNoise, noiseSd, c - gapNeg, c, c + gapPos)
          const signalMass = masses(meanSignal, signalSd, c - gapNeg, c, c + gapPos)
          let ll = 0
          for (let i = 0; i < 4; i++) ll += noise[i] * Math.log(noiseMass[i] + 1e-12) + signal[i] * Math.log(signalMass[i] + 1e-12)
          if (ll > best) {
            best = ll
            meta = Math.round(m * 10) / 10
          }
        }
      }
    }
  }
  return meta
}

export function metaD(
  trials: readonly ConfidenceTrial[],
  widths?: { noiseSd: number; signalSd: number } | null,
): { d: number; meta: number; ratio: number | null; equalWidth: boolean } | null {
  if (trials.length < 20) return null
  const noiseSd = widths?.noiseSd ?? 1
  const signalSd = widths?.signalSd ?? 1
  if (!(noiseSd > 0) || !(signalSd > 0)) return null
  const d = type1(trials)
  const meta = d === null ? null : fit(trials, noiseSd, signalSd)
  if (d === null || meta === null) return null
  return { d, meta, ratio: d > 0.05 ? meta / d : null, equalWidth: noiseSd === signalSd }
}

export function widthRatio(signalSd: number | null, noiseSd: number | null): number | null {
  if (signalSd === null || noiseSd === null || !(signalSd > 0) || !(noiseSd > 0)) return null
  return signalSd / noiseSd
}

export function clockDelay(decisionAt: number | null, confidenceAt: number | null): number | null {
  if (decisionAt === null || confidenceAt === null || confidenceAt < decisionAt) return null
  return confidenceAt - decisionAt
}

export function liveMeta(): null {
  return null
}

export function modelGaps(): {
  unequalWidth: null
  ratingNoise: null
  secondClock: null
  evidence: null
  body: null
  oneSentence: null
} {
  return { unequalWidth: null, ratingNoise: null, secondClock: null, evidence: null, body: null, oneSentence: null }
}

export function gapWords(): string {
  const gaps = modelGaps()
  return `A supplied pair of widths can enter the fit. No widths were supplied, so the live fit still uses equal width, and that assumption is now named. A confidence time can be subtracted from a decision time only when the confidence comes after. Rating noise was not given a kernel. The evidence and the body stay empty. One sentence stays ${gaps.oneSentence}. Existence, as a single object, is not named. The floor was not given a fifth name.`
}

export function metaWords(): string {
  return 'Meta-d prime is the sensitivity implied by confidence. It needs each trial to carry a signal, a yes or no, and a high or low confidence. Fewer than 20 trials is refused. No such ratings are held, so it was not calculated. Heartbeat counting cannot supply it.'
}
