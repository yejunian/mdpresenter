import Page from '../core/Page'

import PageListItem from './PageListItem'

type PlaybackProps = {
  preview: Page | null
  program: Page | null
}

function Playback({ preview, program }: PlaybackProps) {
  return (
    <section className="grid grid-cols-2 gap-6 w-[552px]">
      <PageListItem page={preview} isPreview={true} isProgram={false} />
      <PageListItem page={program} isPreview={false} isProgram={true} />
    </section>
  )
}

export default Playback
