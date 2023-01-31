import Page from '../core/Page'

import PageListItem from './PageListItem'

type PageListProps = {
  pages: Page[]
  previewPageNumber?: number
  programPageNumber?: number
}

function PageList({
  pages,
  previewPageNumber,
  programPageNumber,
}: PageListProps) {
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
            />
          ))}
    </section>
  )
}

export default PageList
