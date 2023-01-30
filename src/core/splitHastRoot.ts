import { Root } from 'hast'

import Page from './Page'

function splitHastRoot(root: Root): Page[] {
  return root.children.reduce<Page[]>((acc, content) => {
    if (content.type === 'element') {
      acc.push({
        contents: {
          type: 'root',
          children: content.tagName === 'hr' ? [] : [content],
        },
        pageNumber: (acc[acc.length - 1]?.pageNumber ?? 0) + 1,
        // TODO - add `note` prop
      })
    }

    return acc
  }, [])
}

export default splitHastRoot
