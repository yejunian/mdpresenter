import { listen } from '@tauri-apps/api/event'
import { useEffect } from 'react'
import useConfig from './useConfig'

function useConfigListener() {
  const { config, reloadConfigFile } = useConfig()

  useEffect(() => {
    const unlistenSettingsUpdate = listen<undefined>('settings:update', () =>
      reloadConfigFile()
    )

    return () => {
      unlistenSettingsUpdate.then((unlisten) => unlisten())
    }
  })

  return config
}

export default useConfigListener
