import { createElement, Fragment, useMemo } from 'react'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'

import Page from '../core/Page'

type PageListItemProps = {
  page: Page | null
}

function PageListItem({ page }: PageListItemProps) {
  const preview = useMemo(
    () =>
      page
        ? unified()
            .use(rehypeReact, { createElement, Fragment })
            .stringify(page.contents)
        : null,
    [page, page?.contents]
  )

  return (
    <article>
      <div className="box-content border-4 overflow-hidden aspect-ratio-variable">
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
