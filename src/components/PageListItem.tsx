import clsx from 'clsx'
import { useMemo } from 'react'

import convertHastToReactElements from '../core/convertHastToReactElement'

import Page from '../core/Page'

type PageListItemProps = {
  page: Page | null
  isPreview?: boolean
  isProgram?: boolean
}

function PageListItem({ page, isPreview, isProgram }: PageListItemProps) {
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
