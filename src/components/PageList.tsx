import { MouseEvent } from 'react'

import Page from '../core/Page'

import PageListItem from './PageListItem'

type PageListProps = {
  pages: Page[]
  previewPageNumber?: number
  programPageNumber?: number
  onSelect?: PageListSelectEventHandler
}

export type PageListSelectEventHandler = (
  target: 'preview' | 'program',
  page: Page
) => void

function PageList({
  pages,
  previewPageNumber,
  programPageNumber,
  onSelect,
}: PageListProps) {
  const handlePageSelectWith =
    (target: 'preview' | 'program') => (event: MouseEvent) => {
      const pageNumber = parseInt(
        event.currentTarget.getAttribute('data-page') || '0',
        10
      )
      return onSelect(target, pageNumber ? pages[pageNumber - 1] : null)
    }

  return (
    <section className="grid grid-cols-4 gap-6 mx-auto p-6 w-[1176px]">
      {pages.length === 0
        ? '(no contents)'
        : pages.map((page, index) => (
            <PageListItem
              key={index}
              page={page}
              isPreview={
                typeof previewPageNumber === 'number' &&
                index === previewPageNumber - 1
              }
              isProgram={
                typeof programPageNumber === 'number' &&
                index === programPageNumber - 1
              }
              onClick={handlePageSelectWith('preview')}
              onDoubleClick={handlePageSelectWith('program')}
            />
          ))}
    </section>
  )
}

export default PageList
