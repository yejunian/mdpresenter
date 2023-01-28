import Page from '../core/Page'

import PageListItem from './PageListItem'

type PageListProps = {
  pages: Page[]
}

function PageList({ pages }: PageListProps) {
  return (
    <section className="grid grid-cols-4 gap-6 mx-auto p-6 w-[1176px]">
      {pages.length === 0
        ? '(no contents)'
        : pages.map((page, index) => (
            <PageListItem key={index} page={page} pageNumber={index + 1} />
          ))}
    </section>
  )
}

export default PageList
