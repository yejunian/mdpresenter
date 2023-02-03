import { emit, listen, once } from '@tauri-apps/api/event'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import Page from '../core/Page'
import convertHastToReactElements from '../core/convertHastToReactElement'
import useCommonShortcutEmitter from '../hooks/useCommonShortcutEmitter'

function Onair() {
  const [page, setPage] = useState<Page>(null)

  useEffect(() => {
    once<Page>('main:init-onair', (event) => {
      setPage(event.payload)
    })

    listen<Page>('main:program', (event) => {
      setPage(event.payload)
    })

    emit('onair:load')
  }, [])

  useCommonShortcutEmitter()

  return (
    <div
      className={clsx(
        'absolute inset-0 overflow-hidden',
        'flex justify-center items-center',
        'px-[5vw] py-[5vh] w-full h-full bg-black',
        'leading-snug text-center font-semibold text-[8vh] text-white'
      )}
    >
      {convertHastToReactElements(page?.contents)}
    </div>
  )
}

export default Onair
