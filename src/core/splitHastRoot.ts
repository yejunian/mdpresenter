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
        // TODO - add `note` prop
      })
    }

    return acc
  }, [])
}

export default splitHastRoot
