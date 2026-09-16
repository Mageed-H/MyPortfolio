/** Tiny store so the Canvas scroll offset can drive HTML UI (navbar, etc.). */
type Listener = (offset: number) => void

let offset = 0
const listeners = new Set<Listener>()

export const scrollProgress = {
  get: () => offset,
  set: (value: number) => {
    offset = value
    listeners.forEach((listener) => listener(value))
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
