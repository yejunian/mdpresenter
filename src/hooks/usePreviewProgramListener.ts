import { emit, listen } from '@tauri-apps/api/event'
import { Dispatch, SetStateAction, useEffect } from 'react'

import Page from '../core/Page'

type PreviewProgramListenerProps = {
  pages: Page[]
  setPreviewPageNumber: Dispatch<SetStateAction<number>>
  setProgramPageNumber: Dispatch<SetStateAction<number>>
}

function usePreviewProgramListener({
  pages,
  setPreviewPageNumber,
  setProgramPageNumber,
}: PreviewProgramListenerProps) {
  useEffect(() => {
    const unlistenPreview = listen<Page | null>('main:preview', (event) => {
      const pageNumber = event.payload?.pageNumber

      if (pageNumber > 0 && pageNumber <= pages.length) {
        setPreviewPageNumber(event.payload.pageNumber)
      }
    })

    const unlistenProgram = listen<Page | null>('main:program', (event) => {
      const pageNumber = event.payload?.pageNumber

      if (typeof pageNumber !== 'number') {
        setProgramPageNumber(0)
      } else if (pageNumber > 0 && pageNumber <= pages.length) {
        setProgramPageNumber(event.payload.pageNumber)

        if (pageNumber + 1 <= pages.length) {
          emit('main:preview', pages[pageNumber])
        }
      }
    })

    return () => {
      unlistenPreview.then((unlisten) => unlisten())
      unlistenProgram.then((unlisten) => unlisten())
    }
  }, [pages])
}

export default usePreviewProgramListener
