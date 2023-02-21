import clsx from 'clsx'
import { MouseEvent, useEffect, useRef } from 'react'

import Page from '../core/Page'
import { columnGap as rowGap, getColumnsByWidth } from '../core/breakpoint'

import PageListItem from './PageListItem'

type PageListProps = {
  className?: string
  pages: Page[]
  previewPageNumber?: number
  programPageNumber?: number
  onSelect?: PageListSelectEventHandler
}

export type PageListSelectEventHandler = (
  target: 'preview' | 'program',
  page: Page
) => void

let listItemTop: number = null
let listItemHeight: number = null

function PageList({
  className,
  pages,
  previewPageNumber,
  programPageNumber,
  onSelect,
}: PageListProps) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    listItemTop = rootRef.current.offsetTop
  }, [])

  useEffect(() => {
    if (pages.length > 0 && !listItemHeight) {
      const columnCount = getColumnsByWidth(window.innerWidth)
      const rowCount = Math.ceil(pages.length / columnCount)

      const totalHeight = rootRef.current.offsetHeight

      listItemHeight = (totalHeight - rowGap) / rowCount - rowGap
    }
  }, [pages])

  useEffect(() => {
    if (!window || pages.length === 0 || programPageNumber === 0) {
      return
    }

    const columnCount = getColumnsByWidth(window.innerWidth)
    const targetRow = Math.floor((programPageNumber - 1) / columnCount)

    const viewportTop = document.documentElement.scrollTop
    const viewportBottom = viewportTop + window.innerHeight
    const targetTop = targetRow * (listItemHeight + rowGap)
    const targetBottom = targetTop + listItemTop + listItemHeight + 2 * rowGap

    let scrollDestination: number = null
    if (targetTop < viewportTop) {
      scrollDestination = targetTop
    } else if (targetBottom + rowGap > viewportBottom) {
      scrollDestination = targetBottom + rowGap - window.innerHeight
    }

    if (typeof scrollDestination === 'number') {
      window.scrollTo({
        top: scrollDestination,
        behavior: 'smooth',
      })
    }
  }, [programPageNumber])

  const handlePageSelectWith =
    (target: 'preview' | 'program') => (event: MouseEvent) => {
      const pageNumber = parseInt(
        event.currentTarget.getAttribute('data-page') || '0',
        10
      )
      return onSelect(target, pageNumber ? pages[pageNumber - 1] : null)
    }

  return (
    <section
      ref={rootRef}
      className={clsx(
        className,
        'grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 p-6',
        pages.length > 0 ? 'auto-rows-min' : null
      )}
    >
      {pages.length === 0 ? (
        <div
          className={clsx(
            'col-span-full self-center justify-self-center mb-12',
            'leading-relaxed text-2xl font-medium text-zinc-500 select-none'
          )}
        >
          불러올{' '}
          <small>
            <code>*.md</code>
          </small>{' '}
          파일을 여기로 끌어오거나
          <br />
          위의 ‘파일 선택’을 누르고 불러올 파일을 선택하세요.
        </div>
      ) : (
        pages.map((page, index) => (
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
        ))
      )}
    </section>
  )
}

export default PageList
