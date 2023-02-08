import { Root } from 'hast'

import Page from './Page'

function splitHastRoot(root: Root): Page[] {
  let comment: string[] = []

  return root.children.reduce<Page[]>((acc, content) => {
    if (content.type === 'comment') {
      comment.push(content.value.trim())
    } else if (content.type === 'element') {
      acc.push({
        contents: {
          type: 'root',
          children: content.tagName === 'hr' ? [] : [content],
        },
        pageNumber: (acc[acc.length - 1]?.pageNumber ?? 0) + 1,
        note: comment.join('\n'),
      })
      comment = []
    }

    return acc
  }, [])
}

export default splitHastRoot
