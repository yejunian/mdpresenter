import { emit, listen, once } from '@tauri-apps/api/event'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import ConfigLegacy from '../core/Config'
import Page from '../core/Page'
import convertHastToReactElements from '../core/convertHastToReactElement'
import useCommonShortcutEmitter from '../hooks/useCommonShortcutEmitter'

function Onair() {
  const [page, setPage] = useState<Page>(null)
  const [fontSize, setFontSize] = useState(7.5)

  useEffect(() => {
    const unlistenInit = once<Page>('main:init-onair', ({ payload }) =>
      setPage(payload)
    )

    const unlistenProgram = listen<Page>('main:program', ({ payload }) =>
      setPage(payload)
    )

    const unlistenPresentationConfig = listen<ConfigLegacy>(
      'main:config',
      ({ payload }) => {
        if (payload.fontSize) {
          setFontSize(payload.fontSize)
        }
      }
    )

    emit('onair:load')

    return () => {
      unlistenInit.then((unlisten) => unlisten())
      unlistenProgram.then((unlisten) => unlisten())
      unlistenPresentationConfig.then((unlisten) => unlisten())
    }
  }, [])

  useCommonShortcutEmitter()

  return (
    <div
      className={clsx(
        'presentation',
        'absolute inset-0 px-[5vw] py-[5vw]',
        'cursor-none select-none'
      )}
      style={{ fontSize: `${fontSize}vh` }}
    >
      {convertHastToReactElements(page?.contents)}
    </div>
  )
}

export default Onair
