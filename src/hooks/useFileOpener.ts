import { message } from '@tauri-apps/api/dialog'
import { listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'

import { appName } from '../core/constants'
import {
  loadSingleTextFile,
  selectSingleTextFile,
} from '../core/openSingleTextFile'

const dateTimeFormat = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

function useFileOpener() {
  const [path, setPath] = useState('')
  const [contents, setContents] = useState('')
  const [loadTime, setLoadTime] = useState('')
  const [isFileDropHovering, setFileDropHovering] = useState(false)

  const loadFile = async () => {
    try {
      setContents(await loadSingleTextFile(path))
      setLoadTime(dateTimeFormat.format(new Date()))
    } catch (error) {
      // No operation
    }
  }

  const selectFile = async () => {
    try {
      const nextPath = await selectSingleTextFile()

      if (nextPath === path) {
        loadFile()
      } else {
        setPath(nextPath)
      }
    } catch (error) {
      // No operation
    }
  }

  useEffect(() => {
    loadFile()
  }, [path])

  useEffect(() => {
    const unlistenFileDropHoverEvent = listen<string[]>(
      'tauri://file-drop-hover',
      ({ payload }) => {
        if (payload?.length === 1) {
          setFileDropHovering(true)
        }
      }
    )

    const unlistenFileDropCancelledEvent = listen(
      'tauri://file-drop-cancelled',
      () => setFileDropHovering(false)
    )

    const unlistenFileDropEvent = listen<string[]>(
      'tauri://file-drop',
      ({ payload }) => {
        setFileDropHovering(false)

        if (payload.length > 1) {
          message('파일은 하나씩만 열 수 있습니다.', {
            title: `안내 - ${appName}`,
            type: 'warning',
          })
          return
        }

        const nextPath = payload[0]
        if (nextPath === path) {
          loadFile()
        } else {
          setPath(nextPath)
        }
      }
    )

    return () => {
      unlistenFileDropHoverEvent.then((unlisten) => unlisten())
      unlistenFileDropCancelledEvent.then((unlisten) => unlisten())
      unlistenFileDropEvent.then((unlisten) => unlisten())
    }
  }, [path])

  return {
    path,
    contents,
    loadTime,
    isFileDropHovering,
    selectFile,
    loadFile,
  }
}

export default useFileOpener
