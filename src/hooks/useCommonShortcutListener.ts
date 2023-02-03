import { listen } from '@tauri-apps/api/event'
import { useEffect } from 'react'

import { CommandArgument, ShortcutCommand } from '../core/keymap'

function useCommonShortcutListener(handlers: {
  [name: string]: (...args: CommandArgument[]) => unknown
}): void {
  useEffect(() => {
    const unlistenShortcut = listen<ShortcutCommand>('shortcut', (event) => {
      const command = event.payload

      if (handlers && handlers[command[0]]) {
        handlers[command[0]](...command.slice(1))
      }
    })

    return () => {
      unlistenShortcut.then((unlisten) => unlisten())
    }
  }, [handlers])
}

export default useCommonShortcutListener
