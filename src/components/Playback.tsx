import clsx from 'clsx'
import { MouseEventHandler } from 'react'

import Page from '../core/Page'

import PageListItem from './PageListItem'
import PlaybackInput, { PlaybackInputProps } from './PlaybackInput'

type PlaybackProps = {
  className?: string
  preview: Page | null
  program: Page | null
  isOnairOpen: boolean
  onOnairClick: MouseEventHandler
} & Partial<PlaybackInputProps>

function Playback({
  className,
  preview,
  program,
  isOnairOpen,
  onOnairClick,
  onClear,
  onCut,
  onPreviewChange,
}: PlaybackProps) {
  const isPlaybackInputRenderable = onClear && onCut && onPreviewChange

  const handleCutClick = () => onCut()
  const handleClearClick = () => onClear()

  return (
    <section className={clsx(className, 'grid grid-cols-5 gap-6 select-none')}>
      <div className="col-span-1 flex flex-col gap-2">
        <button
          className={clsx(
            'border-2 rounded p-1 bg-zinc-800 font-semibold text-sm',
            isOnairOpen
              ? 'border-transparent bg-red-700 hover:bg-red-600 text-white'
              : 'border-green-700 hover:border-green-600 text-zinc-300'
          )}
          type="button"
          onClick={onOnairClick}
        >
          ON AIR
        </button>
        <hr className="border-none" />
        <button
          className={clsx(
            'border border-zinc-600 hover:border-zinc-500 rounded',
            'p-1 bg-zinc-800 text-xs'
          )}
          type="button"
          onClick={handleCutClick}
        >
          Cut
        </button>
        <button
          className={clsx(
            'border border-zinc-600 hover:border-zinc-500 rounded',
            'p-1 bg-zinc-800 text-xs'
          )}
          type="button"
          onClick={handleClearClick}
        >
          Clear
        </button>
      </div>

      <div className="col-span-2 relative grid grid-cols-2 gap-6 w-[552px]">
        <PageListItem page={preview} isPreview={true} isProgram={false} />
        <PageListItem page={program} isPreview={false} isProgram={true} />

        {isPlaybackInputRenderable ? (
          <PlaybackInput
            onClear={onClear}
            onCut={onCut}
            onPreviewChange={onPreviewChange}
          />
        ) : null}
      </div>
    </section>
  )
}

export default Playback
