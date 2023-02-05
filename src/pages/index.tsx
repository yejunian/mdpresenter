import { ask } from '@tauri-apps/api/dialog'
import { emit } from '@tauri-apps/api/event'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import PageList, { PageListSelectEventHandler } from '../components/PageList'
import Playback from '../components/Playback'
import Toolbox from '../components/Toolbox'
import Page from '../core/Page'
import convertMarkdownToHast from '../core/convertMarkdownToHast'
import openSingleTextFile, {
  loadSingleTextFile,
} from '../core/openSingleTextFile'
import splitHastRoot from '../core/splitHastRoot'
import useCommonShortcutEmitter from '../hooks/useCommonShortcutEmitter'
import useCommonShortcutListener from '../hooks/useCommonShortcutListener'
import usePreviewProgramListener from '../hooks/usePreviewProgramListener'
import useWebviewWindow from '../hooks/useWebviewWindow'

const dateTimeFormat = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

function App() {
  const [fileName, setFileName] = useState('')
  const [fileContents, setFileContents] = useState('')
  const [fileLoadTime, setFileLoadTime] = useState('')

  const [pages, setPages] = useState<Page[]>([])
  const [previewPageNumber, setPreviewPageNumber] = useState(1)
  const [programPageNumber, setProgramPageNumber] = useState(0)

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

  usePreviewProgramListener({
    pages,
    setPreviewPageNumber,
    setProgramPageNumber,
  })

  useEffect(() => {
    convertMarkdownToHast(fileContents).then((hastRoot) => {
      setPages(splitHastRoot(hastRoot))
    })
  }, [fileContents])

  const handlePresentationClear = (effect?: string) => {
    emit('main:program', null)
  }

  const handlePresentationCut = (effect?: string) => {
    emit('main:program', pages[previewPageNumber - 1])
  }

  const handlePresentationPreviewChange = (
    pageNumber: number,
    relative?: boolean
  ) => {
    if (relative) {
      emit('main:preview', pages[previewPageNumber + pageNumber - 1])
    } else {
      emit('main:preview', pages[pageNumber - 1])
    }
  }

  const handleFileOpenClick = async () => {
    try {
      const { path, contents } = await openSingleTextFile()
      setFileName(path)
      setFileContents(contents)
      setFileLoadTime(dateTimeFormat.format(new Date()))
    } catch (error) {
      // No operation
    }
  }

  const handleFileReloadClick = async () => {
    try {
      setFileContents(await loadSingleTextFile(fileName))
      setFileLoadTime(dateTimeFormat.format(new Date()))
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
      handlePresentationClear()
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
    <div className="flex flex-col min-h-screen break-words break-keep">
      <div
        className={clsx(
          'sticky top-0',
          'grid grid-cols-8 gap-6',
          'mx-auto p-6 pb-0 w-[1176px] bg-zinc-800'
        )}
      >
        <Toolbox
          fileName={fileName}
          fileLoadTime={fileLoadTime}
          onFileOpenClick={handleFileOpenClick}
          onFileReloadClick={handleFileReloadClick}
        />

        <Playback
          className="col-span-5"
          preview={pages[previewPageNumber - 1] ?? null}
          program={pages[programPageNumber - 1] ?? null}
          isOnairOpen={onairWindow ? true : false}
          onOnairClick={handleOnairClick}
          onClear={handlePresentationClear}
          onCut={handlePresentationCut}
          onPreviewChange={handlePresentationPreviewChange}
        />

        <hr
          className={clsx(
            'mx-auto border-t-2 border-t-zinc-600 w-[1128px]',
            'shadow-sm shadow-zinc-900'
          )}
        />
      </div>

      <PageList
        className="grow mx-auto w-[1176px]"
        pages={pages}
        previewPageNumber={previewPageNumber}
        programPageNumber={programPageNumber}
        onSelect={handlePageListSelect}
      />
    </div>
  )
}

export default App
