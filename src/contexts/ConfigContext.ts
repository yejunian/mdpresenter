import { createContext } from 'react'

import { defaultAppConfig } from '../core/Config'

const ConfigContext = createContext(defaultAppConfig)

export default ConfigContext
