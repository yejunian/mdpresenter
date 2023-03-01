import { Root } from 'hast'
import { createElement, Fragment } from 'react'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'

function convertHastToReactElements(root: Root) {
  return root
    ? unified().use(rehypeReact, { createElement, Fragment }).stringify(root)
    : null
}

export default convertHastToReactElements
