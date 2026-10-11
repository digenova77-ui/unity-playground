/** Same key, same result. The second call does not run again. */

export function once<T>(key: string, run: () => T, memory: Map<string, T>): T {
  const prior = memory.get(key)
  if (prior !== undefined) return prior
  const value = run()
  memory.set(key, value)
  return value
}
