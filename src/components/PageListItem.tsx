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
          'box-content border-4 bg-black overflow-hidden aspect-ratio-variable',
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
        <div className="flex-shrink-0 w-10 whitespace-nowrap overflow-hidden">
          {page && page.pageNumber > 0 ? (
            <>
              {page.pageNumber}.
              <br />
              &nbsp;
            </>
          ) : (
            <>
              &nbsp;
              <br />
              &nbsp;
            </>
          )}
        </div>
        <div
          className="overflow-hidden line-clamp-2"
          title={page?.note || undefined}
        >
          {page?.note || null}
        </div>
      </div>
    </article>
  )
}

export default PageListItem
