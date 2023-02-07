import { emit, listen, once } from '@tauri-apps/api/event'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import Page from '../core/Page'
import convertHastToReactElements from '../core/convertHastToReactElement'
import useCommonShortcutEmitter from '../hooks/useCommonShortcutEmitter'

function Onair() {
  const [page, setPage] = useState<Page>(null)

  useEffect(() => {
    const unlistenInit = once<Page>('main:init-onair', (event) => {
      setPage(event.payload)
    })

    const unlistenProgram = listen<Page>('main:program', (event) => {
      setPage(event.payload)
    })

    emit('onair:load')

    return () => {
      unlistenInit.then((unlisten) => unlisten())
      unlistenProgram.then((unlisten) => unlisten())
    }
  }, [])

  useCommonShortcutEmitter()

  return (
    <div
      className={clsx(
        'presentation',
        'absolute inset-0 px-[5vw] py-[5vw] text-[7.5vh]',
        'cursor-none select-none'
      )}
    >
      {convertHastToReactElements(page?.contents)}
    </div>
  )
}

export default Onair
