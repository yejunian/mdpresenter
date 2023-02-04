import clsx from 'clsx'
import { useState } from 'react'

import { CommandArgument } from '../core/keymap'
import useCommonShortcutListener from '../hooks/useCommonShortcutListener'

export type PlaybackInputProps = {
  onClear: (effect?: string) => void
  onCut: (effect?: string) => void
  onPreviewChange: (pageNumber: number, relative?: boolean) => void
}

type PlaybackShortcutHandler = (
  subCommand: 'clear' | 'cut' | 'digit' | 'preview',
  param?: CommandArgument
) => void

function PlaybackInput({
  onCut,
  onClear,
  onPreviewChange,
}: PlaybackInputProps) {
  const [input, setInput] = useState('')

  const pushDigit = (digit: number) => {
    if (input.length >= 4) {
      const shifted = input.slice(input.length - 3).replace(/^0+/, '')
      setInput(`${shifted}${digit}`)
    } else if (input === '0' || input === '') {
      setInput(`${digit}`)
    } else {
      setInput(`${input}${digit}`)
    }
  }

  const handlePlaybackShortcut: PlaybackShortcutHandler = (
    subCommand,
    param?
  ) => {
    switch (subCommand) {
      case 'clear':
        onClear(param?.toString())
        break

      case 'cut':
        if (input) {
          const parsed = parseInt(input, 10)
          if (parsed === 0) {
            onPreviewChange(-1, true)
          } else if (parsed) {
            onPreviewChange(parseInt(input, 10))
          }
          setInput('')
        } else {
          onCut(param?.toString())
        }
        break

      case 'digit':
        if (typeof param === 'number') {
          pushDigit(param)
        } else {
          const parsed = parseInt(param?.toString(), 10)
          if (parsed >= 0 || parsed < 10) {
            pushDigit(parsed)
          }
        }
        break

      case 'preview':
        onPreviewChange(param === 'prev' ? -1 : 1, true)
        break
    }
  }

  useCommonShortcutListener({ playback: handlePlaybackShortcut })

  return (
    <div
      className={clsx(
        'absolute left-10 bottom-0 flex items-center gap-2 px-2 py-1 rounded bg-zinc-700 bg-opacity-90',
        !input ? 'hidden' : null
      )}
    >
      <div className="leading-none font-medium text-2xl text-zinc-400">→</div>
      <div className="leading-none font-bold text-2xl text-zinc-200">
        {input}
      </div>
      <div className="text-xs leading-none">
        대기:
        <br />
        <kbd>Enter</kbd>
      </div>
    </div>
  )
}

export default PlaybackInput
