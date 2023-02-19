import { emit, listen, once } from '@tauri-apps/api/event'
import { CSSProperties, useEffect, useMemo, useState } from 'react'

import { getOnairContainerStyle } from '../core/getStyle'
import Page from '../core/Page'
import convertHastToReactElements from '../core/convertHastToReactElement'
import useCommonShortcutEmitter from '../hooks/useCommonShortcutEmitter'
import useConfig from '../hooks/useConfig'

function Onair() {
  const { config } = useConfig()
  const [page, setPage] = useState<Page>(null)

  const containerStyle: CSSProperties = useMemo(
    () => getOnairContainerStyle(config),
    [config]
  )

  useEffect(() => {
    const unlistenInit = once<Page>('main:init-onair', ({ payload }) =>
      setPage(payload)
    )

    const unlistenProgram = listen<Page>('main:program', ({ payload }) =>
      setPage(payload)
    )

    emit('onair:load')

    return () => {
      unlistenInit.then((unlisten) => unlisten())
      unlistenProgram.then((unlisten) => unlisten())
    }
  }, [])

  useCommonShortcutEmitter()

  return (
    <div
      className="presentation absolute inset-0 cursor-none select-none"
      style={containerStyle}
    >
      {convertHastToReactElements(page?.contents)}
    </div>
  )
}

export default Onair
