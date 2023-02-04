import Page from '../core/Page'

import PageListItem from './PageListItem'
import PlaybackInput, { PlaybackInputProps } from './PlaybackInput'

type PlaybackProps = {
  preview: Page | null
  program: Page | null
} & Partial<PlaybackInputProps>

function Playback({
  preview,
  program,
  onClear,
  onCut,
  onPreviewChange,
}: PlaybackProps) {
  const isPlaybackInputRenderable = onClear && onCut && onPreviewChange

  return (
    <section className="relative grid grid-cols-2 gap-6 w-[552px]">
      <PageListItem page={preview} isPreview={true} isProgram={false} />
      <PageListItem page={program} isPreview={false} isProgram={true} />

      {isPlaybackInputRenderable ? (
        <PlaybackInput
          onClear={onClear}
          onCut={onCut}
          onPreviewChange={onPreviewChange}
        />
      ) : null}
    </section>
  )
}

export default Playback
