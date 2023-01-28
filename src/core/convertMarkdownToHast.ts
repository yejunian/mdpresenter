import { Root } from 'hast'
import rehypeMinifyWhitespace from 'rehype-minify-whitespace'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const sanitizationSchema: typeof defaultSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes['*'] ?? []), ['className']],
  },
}

async function convertMarkdownToHast(markdown: string): Promise<Root> {
  const mdast = unified()
    .use(remarkParse)
    .use(remarkGfm, { singleTilde: false })
    .parse(markdown)

  return await unified()
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeMinifyWhitespace)
    .use(rehypeSanitize, sanitizationSchema)
    .run(mdast)
}

export default convertMarkdownToHast
