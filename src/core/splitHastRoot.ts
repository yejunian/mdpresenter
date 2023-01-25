import { Root } from 'hast'

function splitHastRoot(root: Root): Root[] {
  return root.children.reduce<Root[]>((acc, content) => {
    if (content.type === 'element') {
      acc.push({
        type: 'root',
        children: content.tagName === 'hr' ? [] : [content],
      })
    }

    return acc
  }, [])
}

export default splitHastRoot
