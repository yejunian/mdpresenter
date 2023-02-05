import clsx from 'clsx'
import { MouseEvent, useMemo } from 'react'

import Page from '../core/Page'
import convertHastToReactElements from '../core/convertHastToReactElement'

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
  const preview = useMemo(
    () => convertHastToReactElements(page?.contents),
    [page?.contents]
  )

  return (
    <article>
      <div
        className={clsx(
          'flex justify-center items-center',
          'box-content border-4 bg-black',
          'overflow-hidden ex-aspect-ratio-variable',
          'font-semibold text-white text-center text-sm leading-snug',
          isProgram
            ? 'border-red-700'
            : isPreview
            ? 'border-green-700'
            : 'border-zinc-600'
        )}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        data-page={page?.pageNumber}
      >
        {preview}
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
              isProgram ? 'text-red-400' : isPreview ? 'text-green-400' : null
            )}
          >
            {isProgram ? 'PGM' : isPreview ? 'PVW' : <>&nbsp;</>}
          </div>
        </div>
        <div
          className="overflow-hidden ex-line-clamp-2"
          title={page?.note || undefined}
        >
          {page?.note || null}
        </div>
      </div>
    </article>
  )
}

export default PageListItem
