import { ask } from '@tauri-apps/api/dialog'
import { emit, listen } from '@tauri-apps/api/event'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import PageList, { PageListSelectEventHandler } from '../components/PageList'
import Playback from '../components/Playback'
import Page from '../core/Page'
import convertMarkdownToHast from '../core/convertMarkdownToHast'
import openSingleTextFile from '../core/openSingleTextFile'
import splitHastRoot from '../core/splitHastRoot'
import useCommonShortcutEmitter from '../hooks/useCommonShortcutEmitter'
import useCommonShortcutListener from '../hooks/useCommonShortcutListener'
import useWebviewWindow from '../hooks/useWebviewWindow'

function App() {
  const [fileName, setFileName] = useState('')
  const [fileContents, setFileContents] = useState('')

  const [pages, setPages] = useState<Page[]>([])
  const [previewPageNumber, setPreviewPageNumber] = useState(2)
  const [programPageNumber, setProgramPageNumber] = useState(1)

  const { webview: onairWindow, create: createOnairWindow } = useWebviewWindow(
    'onair',
    {
      url: '/onair',
      title: '송출 - MD Presenter',
      visible: false,
      // alwaysOnTop: true,
      // decorations: false,
      // fullscreen: true,
    }
  )

  useEffect(() => {
    const unlistenPreview = listen<Page | null>('main:preview', (event) => {
      const pageNumber = event.payload?.pageNumber

      if (pageNumber > 0 && pageNumber <= pages.length) {
        setPreviewPageNumber(event.payload.pageNumber)
      }
    })

    const unlistenProgram = listen<Page | null>('main:program', (event) => {
      const pageNumber = event.payload?.pageNumber

      if (pageNumber > 0 && pageNumber <= pages.length) {
        setProgramPageNumber(event.payload.pageNumber)

        if (pageNumber + 1 <= pages.length) {
          emit('main:preview', pages[pageNumber])
        }
      }
    })

    return () => {
      Promise.all([
        unlistenPreview.then((unlisten) => unlisten()),
        unlistenProgram.then((unlisten) => unlisten()),
      ])
    }
  }, [pages])

  useEffect(() => {
    convertMarkdownToHast(fileContents).then((hastRoot) => {
      setPages(splitHastRoot(hastRoot))
    })
  }, [fileContents])

  const handleOpenClick = async () => {
    try {
      const { path, contents } = await openSingleTextFile()
      setFileName(path)
      setFileContents(contents)
    } catch (error) {
      // No operation
    }
  }

  const handleOnairLoad = () => {
    emit('main:init-onair', pages[programPageNumber - 1])
  }

  const handleOnairClick = async () => {
    if (!onairWindow) {
      createOnairWindow(handleOnairLoad)
    } else if (await ask('송출 창을 닫을까요?', { type: 'warning' })) {
      onairWindow.close()
    }
  }

  const handlePageListSelect: PageListSelectEventHandler = (target, page) => {
    if (!page && target === 'program') {
      emit('main:program', null)
      return
    }

    if (page.pageNumber > 0 && page.pageNumber <= pages.length) {
      emit(`main:${target}`, page)
    }
  }

  useCommonShortcutEmitter()
  // TODO - Implement shortcut handlers at proper components
  useCommonShortcutListener({})

  return (
    <div className="break-words break-keep">
      <h1 className="mb-4 font-bold">MD Presenter</h1>

      <div className="my-4">
        <button
          className="rounded px-4 py-1 bg-blue-600 text-white font-bold"
          type="button"
          onClick={handleOpenClick}
        >
          Open
        </button>{' '}
        <code className="ml-4 text-sm">{fileName || '(not selected)'}</code>
      </div>

      <div className="my-4">
        <button
          className={clsx(
            'border-2 rounded px-4 py-1 font-bold',
            onairWindow
              ? 'border-transparent bg-red-700 text-white'
              : 'border-green-700 text-zinc-300'
          )}
          type="button"
          onClick={handleOnairClick}
        >
          ON AIR
        </button>
      </div>

      <Playback
        preview={pages[previewPageNumber - 1] ?? null}
        program={pages[programPageNumber - 1] ?? null}
      />

      <PageList
        pages={pages}
        previewPageNumber={previewPageNumber}
        programPageNumber={programPageNumber}
        onSelect={handlePageListSelect}
      />
    </div>
  )
}

export default App
