import { listen } from '@tauri-apps/api/event'
import { Monitor } from '@tauri-apps/api/window'
import { useEffect, useState } from 'react'

function testLooseEquality<T>(obj1: T, obj2: T): boolean {
  for (const prop in obj1) {
    if (typeof obj1[prop] === 'object') {
      if (!testLooseEquality(obj1[prop], obj2[prop])) {
        return false
      }
    } else if (obj1[prop] !== obj2[prop]) {
      return false
    }
  }

  return true
}

function useMonitor() {
  const [monitors, setMonitors] = useState<Monitor[]>([])
  const [primaryIndex, setPrimaryIndex] = useState<number>(null)

  const detectMonitors = async () => {
    const { availableMonitors } = await import('@tauri-apps/api/window')
    setMonitors(await availableMonitors())
  }

  useEffect(() => {
    detectMonitors()

    const unlistenScaleFactorChanged = listen('tauri://scale-change', () =>
      detectMonitors()
    )

    return () => {
      unlistenScaleFactorChanged.then((unlisten) => unlisten())
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const { primaryMonitor } = await import('@tauri-apps/api/window')
      const primary = await primaryMonitor()

      if (!primary) {
        setPrimaryIndex(null)
      }

      for (let i = 0; i < monitors.length; i += 1) {
        if (testLooseEquality(monitors[i], primary)) {
          setPrimaryIndex(i)
          return
        }
      }

      setPrimaryIndex(null)
    })()
  }, [monitors])

  return { monitors, primaryIndex }
}

export default useMonitor
