export type Keymap = {
  [combination: string]: ShortcutCommand
}

export type ShortcutCommand = [CommandName, ...CommandArgument[]]
export type CommandName = 'main' | 'onair' | 'file' | 'playback'
export type CommandArgument = boolean | number | string

type Modifiers = {
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
}

const keymap: Keymap = {
  // Genearl shortcuts
  Enter_c: ['onair'],
  KeyO_c: ['file', 'open'],
  KeyR_c: ['file', 'reload'],

  // Presentation keys for keyboards without numpad
  Digit0: ['playback', 'digit', 0],
  Digit1: ['playback', 'digit', 1],
  Digit2: ['playback', 'digit', 2],
  Digit3: ['playback', 'digit', 3],
  Digit4: ['playback', 'digit', 4],
  Digit5: ['playback', 'digit', 5],
  Digit6: ['playback', 'digit', 6],
  Digit7: ['playback', 'digit', 7],
  Digit8: ['playback', 'digit', 8],
  Digit9: ['playback', 'digit', 9],
  Enter: ['playback', 'cut'],
  Quote: ['playback', 'clear'],
  Backslash: ['playback', 'cut', 'fade'],
  BracketRight: ['playback', 'clear', 'fade'],
  Comma: ['playback', 'preview', 'prev'],
  Period: ['playback', 'preview', 'next'],
  ArrowLeft: ['playback', 'preview', 'prev'],
  ArrowRight: ['playback', 'preview', 'next'],
  PageUp: ['playback', 'preview', 'prev'],
  PageDown: ['playback', 'preview', 'next'],

  // Presentation keys for keyboards with numpad
  Numpad0: ['playback', 'digit', 0],
  Numpad1: ['playback', 'digit', 1],
  Numpad2: ['playback', 'digit', 2],
  Numpad3: ['playback', 'digit', 3],
  Numpad4: ['playback', 'digit', 4],
  Numpad5: ['playback', 'digit', 5],
  Numpad6: ['playback', 'digit', 6],
  Numpad7: ['playback', 'digit', 7],
  Numpad8: ['playback', 'digit', 8],
  Numpad9: ['playback', 'digit', 9],
  NumpadEnter: ['playback', 'cut'],
  NumpadDecimal: ['playback', 'clear'],
  NumpadAdd: ['playback', 'cut', 'fade'],
  NumpadSubtract: ['playback', 'clear', 'fade'],
  NumpadDivide: ['playback', 'preview', 'prev'],
  NumpadMultiply: ['playback', 'preview', 'next'],
}

export function getKeyCombination(code: string, modifiers?: Modifiers): string {
  if (!modifiers) {
    return code
  }

  const modifierString = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].reduce(
    (acc, modifier) => `${acc}${modifiers[modifier] ? modifier.charAt(0) : ''}`,
    ''
  )

  return modifierString ? `${code}_${modifierString}` : code
}

export default keymap
