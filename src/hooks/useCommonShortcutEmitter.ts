import { emit } from '@tauri-apps/api/event'
import { useEffect } from 'react'

import keymap, { getKeyCombination } from '../core/keymap'

function handleWindowKeydown(event: KeyboardEvent): void {
  if (!event.code) {
    return
  }

  const { altKey, ctrlKey, metaKey, shiftKey } = event
  const combination = getKeyCombination(event.code, {
    altKey,
    ctrlKey,
    metaKey,
    shiftKey,
  })

  if (keymap[combination]) {
    emit('shortcut', keymap[combination])
    event.preventDefault()
  }

}

function useCommonShortcutEmitter(): void {
  useEffect(() => {
    if (!window) {
      return
    }
    window.addEventListener('keydown', handleWindowKeydown)

    return () => {
      if (!window) {
        return
      }
      window.removeEventListener('keydown', handleWindowKeydown)
    }
  }, [])
}

export default useCommonShortcutEmitter
