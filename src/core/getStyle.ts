import { CSSProperties } from 'react'

import { Config, defaultAppConfig } from './Config'

function addUnitToPadding(source: string): string {
  const parts = source.split(/\s+/)

  switch (parts.length) {
    case 0:
      return ''

    case 1:
      return `${parts[0]}vh ${parts[0]}vw`

    case 2:
      return `${parts[0]}vh ${parts[1]}vw`

    case 3:
      return `${parts[0]}vh ${parts[1]}vw ${parts[2]}vh`

    default:
      return `${parts[0]}vh ${parts[1]}vw ${parts[2]}vh ${parts[3]}vw`
  }
}

export function getOnairContainerStyle(config: Config): CSSProperties {
  const style = {
    fontFamily: config['font-family'] || defaultAppConfig['font-family'],

    fontSize: `${
      config['font-size'] > 0
        ? config['font-size']
        : defaultAppConfig['font-size']
    }vh`,

    '--font-weight-regular':
      config['font-weight-regular'] || defaultAppConfig['font-weight-regular'],

    '--font-weight-bold':
      config['font-weight-bold'] || defaultAppConfig['font-weight-bold'],

    fontFeatureSettings:
      config['font-feature-settings'] ||
      defaultAppConfig['font-feature-settings'],

    '--color-primary':
      config['primary-color'] || defaultAppConfig['primary-color'],

    lineHeight:
      config['line-height'] >= 0
        ? config['line-height']
        : defaultAppConfig['line-height'],

    textAlign: config['text-align'] || defaultAppConfig['text-align'],

    justifyContent:
      config['container-align-x'] || defaultAppConfig['container-align-x'],

    alignItems:
      config['container-align-y'] || defaultAppConfig['container-align-y'],

    padding: addUnitToPadding(
      config['window-padding'] || defaultAppConfig['window-padding']
    ),
  } as CSSProperties

  return style
}
