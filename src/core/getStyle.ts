import { CSSProperties } from 'react'

import { Config, defaultAppConfig } from './Config'

const thumbnailHeight = 144
const thumbnailRenderFactor = 2

function addUnitToPadding(
  source: string,
  options?: { isForThumbnails?: boolean; aspectRatio?: number }
): string {
  const { isForThumbnails, aspectRatio } = options ?? {}

  let parts: number[]
  try {
    parts = source.split(/\s+/).map((value) => parseFloat(value))
  } catch (error) {
    return ''
  }

  if (parts.length === 1) {
    if (isForThumbnails) {
      const paddingY = getAbsoluteSize(parts[0]) * thumbnailRenderFactor
      const paddingX = paddingY * aspectRatio
      return `${paddingY}px ${paddingX}px`
    } else {
      return `${parts[0]}vh ${parts[0]}vw`
    }
  }

  return parts
    .reduce<string[]>((acc, value, index) => {
      if (index > 3) {
        return acc
      }

      if (isForThumbnails) {
        const sideFactor = index % 2 === 0 ? 1 : aspectRatio
        const padding =
          getAbsoluteSize(value) * sideFactor * thumbnailRenderFactor
        acc.push(`${padding}px`)
      } else {
        acc.push(index % 2 === 0 ? `${value}vh` : `${value}vw`)
      }

      return acc
    }, [])
    .join(' ')
}

function getAbsoluteSize(percentage: number): number {
  return (percentage / 100) * thumbnailHeight
}

function sanitizeFontSize(fontSize: number): number {
  return fontSize > 0 ? fontSize : defaultAppConfig['font-size']
}

function getBaseStyle(config: Config): CSSProperties {
  return {
    // NOTE - Undefined properties
    // - fontSize
    // - padding

    fontFamily: config['font-family'] || defaultAppConfig['font-family'],

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
  } as CSSProperties
}

export function getPageListItemStyle(config: Config): CSSProperties {
  return {
    ...getBaseStyle(config),

    fontSize: `${
      (sanitizeFontSize(config['font-size']) / 100) *
      thumbnailHeight *
      thumbnailRenderFactor
    }px`,

    padding: addUnitToPadding(
      config['window-padding'] || defaultAppConfig['window-padding'],
      { isForThumbnails: true, aspectRatio: 16 / 9 }
    ),

    width: '200%',
    height: '200%',
    transform: 'scale(0.5)',
    transformOrigin: 'top left',
  } as CSSProperties
}

export function getOnairContainerStyle(config: Config): CSSProperties {
  return {
    ...getBaseStyle(config),

    fontSize: `${sanitizeFontSize(config['font-size'])}vh`,

    padding: addUnitToPadding(
      config['window-padding'] || defaultAppConfig['window-padding']
    ),
  } as CSSProperties
}
