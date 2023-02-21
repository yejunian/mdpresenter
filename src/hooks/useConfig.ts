import { message } from '@tauri-apps/api/dialog'
import { emit } from '@tauri-apps/api/event'
import {
  BaseDirectory,
  exists,
  FsOptions,
  readTextFile,
  writeTextFile,
} from '@tauri-apps/api/fs'
import { useEffect, useState } from 'react'

import { Config, baseConfig } from '../core/Config'

type AppConfigHookReturn = {
  config: Config
  reloadConfigFile: () => Promise<void>
  updateConfigFile: (updates: Partial<Config>) => Promise<void>
}

const configFilePath = 'mdpresenter.config.json'
const fsOptions: FsOptions = { dir: BaseDirectory.AppLocalData }

let loadable = true

async function writeConfigFile(newConfig: Config): Promise<void> {
  await writeTextFile(configFilePath, JSON.stringify(newConfig), fsOptions)
}

async function readConfigFile(): Promise<Config> {
  const config: Config = { ...baseConfig }

  try {
    if (await exists(configFilePath, fsOptions)) {
      const parsed = JSON.parse(
        await readTextFile(configFilePath, fsOptions)
      ) as Partial<Config>

      for (const key of Object.keys(baseConfig)) {
        // TODO - Type check
        if (key in parsed) {
          config[key] = parsed[key]
        }
      }
    } else {
      await writeConfigFile(baseConfig)
    }
  } catch (error) {
    message('설정 파일을 불러오는 데 실패하여 기본 설정을 사용합니다.', {
      type: 'error',
    })
    loadable = false
  }

  return config
}

function useConfig(): AppConfigHookReturn {
  // TODO - Make config global state and get it from the backend
  const [config, setConfig] = useState<Config>(baseConfig)

  const updateConfigFile = async (updates: Partial<Config>) => {
    try {
      const newConfig: Config = { ...config }
      for (const key of Object.keys(updates)) {
        if (key in baseConfig) {
          newConfig[key] = updates[key]
        }
      }

      // TODO - Validate new configuration
      await writeConfigFile(newConfig)
      await emit('settings:update')
      setConfig(newConfig)
    } catch (error) {
      message('설정을 저장하는 데 실패했습니다.', { type: 'error' })
    }
  }

  const loadConfigFile = async () => {
    setConfig(await readConfigFile())
  }

  useEffect(() => {
    loadConfigFile()
  }, [])

  if (loadable) {
    return { config, updateConfigFile, reloadConfigFile: loadConfigFile }
  } else {
    return {
      config: { ...baseConfig },
      reloadConfigFile: async () => {},
      updateConfigFile: async () => {},
    }
  }
}

export default useConfig
