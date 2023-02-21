import { CSSProperties } from 'react'

import { Config, baseConfig } from './Config'

type SanitizeNumberOptions = {
  fallback: string
  validate: (parsed: number) => boolean
}

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

function validateType<T>(value: unknown, fallback: T): T {
  if (typeof value === typeof fallback) {
    return value as T
  } else {
    return fallback
  }
}

function sanitizeNumber(
  source: string,
  { fallback, validate }: SanitizeNumberOptions
): number {
  const parsed = parseFloat(source)

  return validate(parsed) ? parsed : parseFloat(fallback)
}

function getBaseStyle(config: Config): CSSProperties {
  return {
    // NOTE - Undefined properties
    // - fontSize
    // - padding

    fontFamily: validateType(config['font-family'], baseConfig['font-family']),

    '--font-weight-regular': validateType(
      config['font-weight-regular'],
      baseConfig['font-weight-regular']
    ),

    '--font-weight-bold': validateType(
      config['font-weight-bold'],
      baseConfig['font-weight-bold']
    ),

    fontFeatureSettings: validateType(
      config['font-feature-settings'],
      baseConfig['font-feature-settings']
    ),

    '--color-primary': validateType(
      config['primary-color'],
      baseConfig['primary-color']
    ),

    lineHeight:
      sanitizeNumber(config['line-height'], {
        fallback: baseConfig['line-height'],
        validate: (value) => value >= 0,
      }) / 100,

    textAlign: validateType(config['text-align'], baseConfig['text-align']),

    justifyContent: validateType(
      config['container-align-x'],
      baseConfig['container-align-x']
    ),

    alignItems: validateType(
      config['container-align-y'],
      baseConfig['container-align-y']
    ),
  } as CSSProperties
}

export function getPageListItemStyle(config: Config): CSSProperties {
  return {
    ...getBaseStyle(config),

    fontSize: `${
      (sanitizeNumber(config['font-size'], {
        fallback: baseConfig['font-size'],
        validate: (value) => value > 0,
      }) /
        100) *
      thumbnailHeight *
      thumbnailRenderFactor
    }px`,

    padding: addUnitToPadding(
      config['window-padding'] || baseConfig['window-padding'],
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

    fontSize: `${sanitizeNumber(config['font-size'], {
      fallback: baseConfig['font-size'],
      validate: (value) => value > 0,
    })}vh`,

    padding: addUnitToPadding(
      config['window-padding'] || baseConfig['window-padding']
    ),
  } as CSSProperties
}
