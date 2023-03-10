import clsx from 'clsx'
import { MouseEvent, useContext, useMemo } from 'react'

import Page from '../core/Page'
import convertHastToReactElements from '../core/convertHastToReactElement'
import ConfigContext from '../contexts/ConfigContext'
import { getPageListItemStyle } from '../core/getStyle'

type PageListItemProps = {
  page: Page | null
  isPreview?: boolean
  isProgram?: boolean
  onClick?: (event: MouseEvent) => void
  onDoubleClick?: (event: MouseEvent) => void
}

function PageListItem({
  page,
  isPreview,
  isProgram,
  onClick,
  onDoubleClick,
}: PageListItemProps) {
  const config = useContext(ConfigContext)

  const preview = useMemo(
    () => convertHastToReactElements(page?.contents),
    [page?.contents]
  )

  return (
    <article className="select-none">
      <div
        className={clsx(
          'flex items-center justify-center',
          'box-content border-4 w-64 h-36 bg-zinc-600',
          isProgram
            ? 'border-red-700'
            : isPreview
            ? 'border-green-700'
            : 'border-zinc-600',
          onClick || onDoubleClick
            ? clsx(
                'cursor-pointer',
                isProgram
                  ? 'hover:border-red-600'
                  : isPreview
                  ? 'hover:border-green-600'
                  : 'hover:border-zinc-500'
              )
            : null
        )}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        data-page={page?.pageNumber}
      >
        <div className="h-full overflow-hidden ex-aspect-ratio-variable">
          <div className="presentation" style={getPageListItemStyle(config)}>
            {preview}
          </div>
        </div>
      </div>

      <div className="flex gap-0 box-content mt-2 text-sm leading-4">
        <div
          className={clsx(
            'flex-shrink-0 w-10',
            'whitespace-nowrap overflow-hidden'
          )}
        >
          <div
            className={clsx(
              'font-bold text-zinc-200',
              'whitespace-nowrap overflow-hidden',
              'tabular-nums ex-high-legibility'
            )}
          >
            {page && page.pageNumber > 0 ? `${page.pageNumber}.` : '\u2014'}
          </div>
          <div
            className={clsx(
              'font-medium text-xs leading-4',
              isProgram || isPreview ? 'text-opacity-50' : null,
              isProgram ? 'text-red-300' : isPreview ? 'text-green-300' : null
            )}
          >
            {isProgram ? 'PGM' : isPreview ? 'PVW' : <>&nbsp;</>}
          </div>
        </div>
        <div
          className={clsx(
            'grow font-medium text-zinc-400',
            'whitespace-pre-wrap overflow-hidden ex-line-clamp-2'
          )}
          title={page?.note || undefined}
        >
          {page?.note || null}
        </div>
      </div>
    </article>
  )
}

export default PageListItem
