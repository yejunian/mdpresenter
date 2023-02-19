import { message } from '@tauri-apps/api/dialog'
import {
  BaseDirectory,
  exists,
  FsOptions,
  readTextFile,
  writeTextFile,
} from '@tauri-apps/api/fs'
import { useEffect, useState } from 'react'

import { Config, defaultAppConfig } from '../core/Config'

type AppConfigHookReturn = {
  config: Config
  updateConfigFile: (updates: Partial<Config>) => Promise<void>
}

const configFilePath = 'mdpresenter.config.json'
const fsOptions: FsOptions = { dir: BaseDirectory.AppLocalData }

let loadable = true

async function writeConfigFile(newConfig: Config): Promise<void> {
  await writeTextFile(configFilePath, JSON.stringify(newConfig), fsOptions)
}

async function readConfigFile(): Promise<Config> {
  const config: Config = { ...defaultAppConfig }

  try {
    if (await exists(configFilePath, fsOptions)) {
      const parsed = JSON.parse(
        await readTextFile(configFilePath, fsOptions)
      ) as Partial<Config>

      for (const key of Object.keys(defaultAppConfig)) {
        // TODO - Type check
        if (key in parsed) {
          config[key] = parsed[key]
        }
      }
    } else {
      await writeConfigFile(defaultAppConfig)
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
  const [config, setConfig] = useState<Config>(defaultAppConfig)

  useEffect(() => {
    readConfigFile().then((newConfig) => setConfig(newConfig))
  }, [])

  if (!loadable) {
    return {
      config: { ...defaultAppConfig },
      updateConfigFile: async () => {},
    }
  }

  const updateConfigFile = async (updates: Partial<Config>) => {
    try {
      const newConfig: Config = { ...config }
      for (const key of Object.keys(updates)) {
        if (key in defaultAppConfig) {
          newConfig[key] = updates[key]
        }
      }

      // TODO - Validate new configuration
      await writeConfigFile(newConfig)
      setConfig(newConfig)
    } catch (error) {
      message('설정을 저장하는 데 실패했습니다.', { type: 'error' })
    }
  }

  return { config, updateConfigFile }
}

export default useConfig
