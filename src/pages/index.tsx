import { ask } from '@tauri-apps/api/dialog'
import { emit } from '@tauri-apps/api/event'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import PageList from '../components/PageList'
import Playback from '../components/Playback'
import Page from '../core/Page'
import convertMarkdownToHast from '../core/convertMarkdownToHast'
import openSingleTextFile from '../core/openSingleTextFile'
import splitHastRoot from '../core/splitHastRoot'
import useWebviewWindow from '../hooks/useWebviewWindow'

function App() {
  const [fileName, setFileName] = useState('')
  const [fileContents, setFileContents] = useState('')

  const [pages, setPages] = useState<Page[]>([])
  const [previewPageNumber, setPreviewPageNumber] = useState(14)
  const [programPageNumber, setProgramPageNumber] = useState(11)

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
      />
    </div>
  )
}

export default App
