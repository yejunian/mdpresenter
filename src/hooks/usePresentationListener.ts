import { emit, listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'

import ConfigLegacy from '../core/Config'
import Page from '../core/Page'

function usePresentationListener(pages: Page[]) {
  const [previewPageNumber, setPreviewPageNumber] = useState(1)
  const [programPageNumber, setProgramPageNumber] = useState(0)

  const [fontSize, setFontSize] = useState(7.5)

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

    const unlistenConfig = listen<ConfigLegacy>('main:config', ({ payload }) => {
      if (payload.fontSize) {
        setFontSize(payload.fontSize)
      }
    })

    return () => {
      unlistenPreview.then((unlisten) => unlisten())
      unlistenProgram.then((unlisten) => unlisten())
      unlistenConfig.then((unlisten) => unlisten())
    }
  }, [pages])

  return {
    previewPageNumber,
    programPageNumber,
    fontSize,
  }
}

export default usePresentationListener
