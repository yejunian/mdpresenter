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

  return (
    <section className={clsx(className, 'grid grid-cols-5 gap-6')}>
      <div className="col-span-1 flex flex-col gap-2">
        <button
          className={clsx(
            'border-2 rounded p-1 font-bold text-sm',
            isOnairOpen
              ? 'border-transparent bg-red-700 text-white'
              : 'border-green-700 text-zinc-300'
          )}
          type="button"
          onClick={onOnairClick}
        >
          ON AIR
        </button>
        <hr className="border-none" />
        <button className="border border-zinc-600 rounded p-1 text-xs">
          Cut
        </button>
        <button className="border border-zinc-600 rounded p-1 text-xs">
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
